import { useCallback, useMemo, useRef, useState } from 'react'

const DEFAULT_TOKENS: Record<string, RegExp> = {
    '0': /[0-9]/,
    '9': /[0-9]/,
    a: /[a-z]/,
    A: /[A-Z]/,
    '*': /[a-zA-Z0-9]/,
    '#': /[a-zA-Z0-9]/
}

// 模块级空对象默认值:内联默认 {} 每渲染新引用会击穿 slots 的 useMemo,
// 导致 updateValue/refCallback 身份每渲染变化 → ref 重挂、input 监听重绑
const EMPTY_TOKENS: Record<string, RegExp> = {}

export interface UseMaskOptions {
    /** 掩码模式字符串，# 表示任意字符，9 表示数字，a/A 表示字母 */
    mask: string

    /** 占位字符，默认 '_' */
    placeholderChar?: string

    /** 自定义 token 映射 */
    tokens?: Record<string, RegExp>
}

export interface UseMaskReturnValue {
    /** 绑定到输入框的 ref callback */
    ref: React.RefCallback<HTMLInputElement | null>

    /** 当前带掩码的显示值（含占位符） */
    value: string

    /** 当前原始值（不含掩码字面量） */
    rawValue: string

    /** 是否所有必填槽位都已填充 */
    isComplete: boolean

    /** 重置输入状态 */
    reset: () => void
}

interface MaskSlot {
    type: 'token' | 'literal'
    char: string
    pattern?: RegExp
}

function parseMask(mask: string, tokens: Record<string, RegExp>): MaskSlot[] {
    const slots: MaskSlot[] = []

    for (let i = 0; i < mask.length; i++) {
        const char = mask[i]

        if (char === '\\' && i + 1 < mask.length) {
            i++
            slots.push({ type: 'literal', char: mask[i] })
            continue
        }

        if (tokens[char]) {
            slots.push({ type: 'token', char, pattern: tokens[char] })
        } else {
            slots.push({ type: 'literal', char })
        }
    }

    return slots
}

function applyMask(input: string, slots: MaskSlot[]): string {
    let result = ''
    let inputIndex = 0

    for (let slotIndex = 0; slotIndex < slots.length && inputIndex <= input.length; slotIndex++) {
        const slot = slots[slotIndex]

        if (slot.type === 'literal') {
            result += slot.char
            if (inputIndex < input.length && input[inputIndex] === slot.char) {
                inputIndex++
            }
            continue
        }

        if (inputIndex >= input.length) {
            break
        }

        while (inputIndex < input.length) {
            const ch = input[inputIndex]
            inputIndex++

            if (slot.pattern!.test(ch)) {
                result += ch
                break
            }
        }

        if (result.length <= slotIndex) {
            break
        }
    }

    return result
}

function buildDisplayValue(value: string, slots: MaskSlot[], placeholderChar: string): string {
    let display = value

    for (let i = value.length; i < slots.length; i++) {
        const slot = slots[i]
        if (slot.type === 'literal') {
            display += slot.char
        } else {
            display += placeholderChar
        }
    }

    return display
}

function extractRaw(masked: string, slots: MaskSlot[]): string {
    let raw = ''
    for (let i = 0; i < masked.length && i < slots.length; i++) {
        if (slots[i].type === 'token' && slots[i].pattern!.test(masked[i])) {
            raw += masked[i]
        }
    }
    return raw
}

function checkComplete(masked: string, slots: MaskSlot[]): boolean {
    for (let i = 0; i < slots.length; i++) {
        const slot = slots[i]
        if (slot.type === 'token') {
            if (i >= masked.length || !slot.pattern!.test(masked[i])) {
                return false
            }
        }
    }
    return true
}

/**
 * 输入掩码 Hook，为 input 元素提供格式化处理。
 * @param options 掩码配置
 * @returns 绑定 ref、掩码值、原始值与操作函数
 */
export function useMask(options: UseMaskOptions): UseMaskReturnValue {
    const { mask, placeholderChar = '_', tokens = EMPTY_TOKENS } = options
    // 掩码槽位按 mask/tokens 缓存：否则每次渲染重建 slots → updateValue/refCallback
    // 身份变化 → React 每渲染卸载重挂 ref、重绑 input 监听
    const slots = useMemo(() => parseMask(mask, { ...DEFAULT_TOKENS, ...tokens }), [mask, tokens])

    const inputRef = useRef<HTMLInputElement | null>(null)
    // IME 组合（中文/日文输入法）期间每次中间 input 都重写 value 会丢弃组合文本，
    // 组合期间跳过，compositionend 后统一应用掩码
    const composingRef = useRef(false)
    const [maskedValue, setMaskedValue] = useState('')
    const [rawValue, setRawValue] = useState('')

    const updateValue = useCallback(
        (input: string, cursor?: number) => {
            const processed = applyMask(input, slots)
            const raw = extractRaw(processed, slots)
            const display = buildDisplayValue(processed, slots, placeholderChar)

            setMaskedValue(display)
            setRawValue(raw)

            const inputEl = inputRef.current
            if (inputEl) {
                inputEl.value = display

                if (cursor !== undefined) {
                    // 整体重写 value 会让光标跳到末尾：记录每个输出字符来自输入串的哪个
                    // 位置，把编辑后的光标按"其前被保留的有效字符数"映射回新显示串，
                    // 并跟随其后自动插入的字面量
                    const produced: number[] = []
                    let inputIndex = 0
                    for (const slot of slots) {
                        if (inputIndex >= input.length) break
                        if (slot.type === 'literal') {
                            produced.push(inputIndex)
                            if (input[inputIndex] === slot.char) {
                                inputIndex++
                            }
                            continue
                        }
                        while (inputIndex < input.length) {
                            const ch = input[inputIndex++]
                            if (slot.pattern!.test(ch)) {
                                produced.push(inputIndex)
                                break
                            }
                        }
                    }

                    let filled = 0
                    for (let p = 0; p < produced.length && produced[p] <= cursor; p++) {
                        filled = p + 1
                    }
                    let nextCursor = Math.min(filled, display.length)
                    while (
                        nextCursor < display.length &&
                        slots[nextCursor]?.type === 'literal'
                    ) {
                        nextCursor++
                    }
                    inputEl.setSelectionRange(nextCursor, nextCursor)
                }
            }
        },
        [slots, placeholderChar]
    )

    const refCallback: React.RefCallback<HTMLInputElement | null> = useCallback(
        node => {
            const handleInput = () => {
                if (composingRef.current) {
                    return
                }
                const input = inputRef.current
                if (input) {
                    updateValue(input.value, input.selectionStart ?? input.value.length)
                }
            }

            const handleCompositionStart = () => {
                composingRef.current = true
            }

            const handleCompositionEnd = () => {
                composingRef.current = false
                const input = inputRef.current
                if (input) {
                    updateValue(input.value, input.selectionStart ?? input.value.length)
                }
            }

            inputRef.current = node

            if (node) {
                node.addEventListener('input', handleInput)
                node.addEventListener('compositionstart', handleCompositionStart)
                node.addEventListener('compositionend', handleCompositionEnd)
            }

            return () => {
                node?.removeEventListener('input', handleInput)
                node?.removeEventListener('compositionstart', handleCompositionStart)
                node?.removeEventListener('compositionend', handleCompositionEnd)
            }
        },
        [updateValue]
    )

    const isComplete = checkComplete(maskedValue, slots)

    const reset = useCallback(() => {
        setMaskedValue('')
        setRawValue('')
        if (inputRef.current) {
            inputRef.current.value = ''
        }
    }, [])

    return {
        ref: refCallback,
        value: maskedValue,
        rawValue,
        isComplete,
        reset
    }
}

export namespace useMask {
    export type Options = UseMaskOptions
    export type ReturnValue = UseMaskReturnValue
}
