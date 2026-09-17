import { useCallback, useEffect, useRef, useState } from 'react'
import { assignRef, useId, useMergedRef, useUncontrolled } from '@xiaoye-react/hooks'
import {
    factory,
    useProps,
    useStyles,
    type Factory,
    type StylesApiProps
} from '../../core'
import { InputBase, type InputBaseProps } from '../InputBase'
import { InputWrapper } from '../Input'
import classes from './MaskInput.module.css'

export type MaskInputStylesNames = 'root'

/** A single mask slot — either a RegExp pattern (token) or a string literal */
type MaskSlot = { type: 'token'; pattern: RegExp } | { type: 'literal'; char: string }

const DEFAULT_TOKENS: Record<string, RegExp> = {
    '0': /[0-9]/,
    '9': /[0-9]/,
    a: /[a-z]/,
    A: /[A-Z]/,
    L: /[A-Za-z]/,
    '*': /[a-zA-Z0-9]/,
    '#': /[a-zA-Z0-9]/
}

export interface MaskInputProps
    extends Omit<
            InputBaseProps,
            | 'value'
            | 'defaultValue'
            | 'onChange'
            | 'classNames'
            | 'styles'
            | 'unstyled'
            | 'vars'
            | 'attributes'
            | 'component'
            | 'labelProps'
            | 'descriptionProps'
            | 'errorProps'
        >,
        StylesApiProps<MaskInputFactory> {
    /** Mask pattern string or array of string literals and RegExp objects */
    mask: string | Array<string | RegExp>

    /** Override or extend the default token map */
    tokens?: Record<string, RegExp>

    /** Called before masking on each keystroke, can return overrides for mask options */
    modify?: (
        value: string
    ) => Partial<Pick<MaskInputProps, 'mask' | 'tokens' | 'slotChar' | 'separate'>> | undefined

    /** When true, raw and display values are decoupled */
    separate?: boolean

    /** Character displayed in unfilled slots, `"_"` by default */
    slotChar?: string | null

    /** Show mask pattern even when field is empty and unfocused */
    alwaysShowMask?: boolean

    /** Show mask placeholder on focus, `true` by default */
    showMaskOnFocus?: boolean

    /** Transform each character before validation and insertion */
    transform?: (char: string) => string

    /** Clear value on blur when mask is incomplete, `false` by default */
    autoClear?: boolean

    /** Called on every change with raw and masked values */
    onChangeRaw?: (rawValue: string, maskedValue: string) => void

    /** Called when all required mask slots are filled */
    onComplete?: (maskedValue: string, rawValue: string) => void

    /** Assigns a function that clears the input value to the given ref */
    resetRef?: React.RefObject<(() => void) | null>

    /** 受控值 */
    value?: string

    /** Uncontrolled default value */
    defaultValue?: string

    /** 值变化时调用 */
    onChange?: (value: string) => void

    /** 渲染在输入框上方的标签 */
    label?: React.ReactNode

    /** 渲染在标签下方的描述 */
    description?: React.ReactNode

    /** 渲染在输入框下方的错误 */
    error?: React.ReactNode

    /** Success message rendered below the input */
    success?: React.ReactNode

    /** 如果设置，则会在标签上添加必填星号 */
    required?: boolean

    /** Props passed to the label element */
    labelProps?: React.ComponentProps<'label'>

    /** Props passed to the description element */
    descriptionProps?: React.ComponentProps<'div'>

    /** Props passed to the error element */
    errorProps?: React.ComponentProps<'div'>
}

export type MaskInputFactory = Factory<{
    props: MaskInputProps
    ref: HTMLInputElement
    stylesNames: MaskInputStylesNames
}>

const defaultProps = {
    slotChar: '_',
    showMaskOnFocus: true,
    separate: false,
    alwaysShowMask: false,
    autoClear: false
} satisfies Partial<MaskInputProps>

/** Parse mask into slots */
function parseMask(
    mask: string | Array<string | RegExp>,
    tokens: Record<string, RegExp>
): MaskSlot[] {
    const slots: MaskSlot[] = []

    if (Array.isArray(mask)) {
        for (const item of mask) {
            if (item instanceof RegExp) {
                slots.push({ type: 'token', pattern: item })
            } else {
                for (const char of item) {
                    slots.push({ type: 'literal', char })
                }
            }
        }
    } else {
        for (let i = 0; i < mask.length; i++) {
            const char = mask[i]

            if (char === '\\' && i + 1 < mask.length) {
                i++
                slots.push({ type: 'literal', char: mask[i] })
                continue
            }

            if (tokens[char]) {
                slots.push({ type: 'token', pattern: tokens[char] })
            } else {
                slots.push({ type: 'literal', char })
            }
        }
    }

    return slots
}

/** Apply mask to raw input value, returns masked value (without placeholder fill) */
function applyMaskToValue(
    input: string,
    slots: MaskSlot[],
    transform?: (char: string) => string
): string {
    let result = ''
    let inputIndex = 0

    for (const slot of slots) {
        if (inputIndex >= input.length) break

        if (slot.type === 'literal') {
            result += slot.char
            if (inputIndex < input.length && input[inputIndex] === slot.char) {
                inputIndex++
            }
            continue
        }

        while (inputIndex < input.length) {
            const ch = input[inputIndex]
            inputIndex++
            const transformed = transform ? transform(ch) : ch
            if (slot.pattern.test(transformed)) {
                result += transformed
                break
            }
        }
    }

    return result
}

/** Build display value with placeholder fill */
function buildDisplayValue(masked: string, slots: MaskSlot[], slotChar: string): string {
    let display = masked

    for (let i = masked.length; i < slots.length; i++) {
        const slot = slots[i]
        if (slot.type === 'literal') {
            display += slot.char
        } else {
            display += slotChar
        }
    }

    return display
}

/** Extract raw value from masked value */
function extractRaw(masked: string, slots: MaskSlot[]): string {
    let raw = ''
    for (let i = 0; i < masked.length && i < slots.length; i++) {
        const slot = slots[i]
        if (slot.type === 'token') {
            if (slot.pattern.test(masked[i])) {
                raw += masked[i]
            }
        }
    }
    return raw
}

/** Check if all token slots are filled */
function isMaskComplete(masked: string, slots: MaskSlot[]): boolean {
    for (let i = 0; i < slots.length; i++) {
        const slot = slots[i]
        if (slot.type === 'token') {
            if (i >= masked.length || !slot.pattern.test(masked[i])) {
                return false
            }
        }
    }
    return true
}

export const MaskInput = factory<MaskInputFactory>((_props, ref) => {
    const props = useProps('MaskInput', defaultProps, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        mask,
        tokens,
        modify,
        separate,
        slotChar,
        alwaysShowMask,
        showMaskOnFocus,
        transform,
        autoClear,
        onChangeRaw,
        onComplete,
        resetRef,
        onFocus: consumerOnFocus,
        onBlur: consumerOnBlur,
        value: valueProp,
        defaultValue,
        onChange,
        label,
        description,
        error,
        success,
        required,
        labelProps,
        descriptionProps,
        errorProps,
        wrapperProps,
        id,
        ...others
    } = props

    const getStyles = useStyles<MaskInputFactory>({
        name: 'MaskInput',
        classes,
        props,
        className,
        style,
        classNames,
        styles,
        unstyled,
        vars,
        rootSelector: 'root'
    })

    const [value, setValue] = useUncontrolled<string>({
        value: valueProp,
        defaultValue,
        finalValue: '',
        onChange
    })

    // 占位掩码的显示由焦点态驱动：showMaskOnFocus（默认 true）下空值未聚焦不显示
    // `___-___`，alwaysShowMask=true 或聚焦时才填充占位符
    const [focused, setFocused] = useState(false)

    const inputId = useId(id)
    const hasWrapper = label || description || error || success
    const inputRef = useRef<HTMLInputElement | null>(null)
    const mergedRef = useMergedRef(ref, inputRef)
    // IME 组合（中文/日文输入法）期间每次中间 input 都重写 DOM value 会丢弃组合文本、
    // 打断输入法，组合期间跳过格式化，compositionend 后统一应用掩码（对齐 hooks/use-mask 的守卫策略）
    const composingRef = useRef(false)

    // Resolve current mask options (with modify support)
    const resolveOptions = useCallback(
        (currentValue: string) => {
            const modified = modify?.(currentValue) || {}
            const effectiveMask = modified.mask ?? mask
            const effectiveTokens = { ...DEFAULT_TOKENS, ...(modified.tokens ?? tokens) }
            const effectiveSlotChar = modified.slotChar ?? slotChar ?? '_'
            const effectiveSeparate = modified.separate ?? separate ?? false
            return {
                mask: effectiveMask,
                tokens: effectiveTokens,
                slotChar: effectiveSlotChar,
                separate: effectiveSeparate
            }
        },
        [mask, tokens, slotChar, separate, modify]
    )

    // Compute masked and display values
    const options = resolveOptions(value)
    const slots = parseMask(options.mask, options.tokens)
    const maskedValue = applyMaskToValue(value, slots, transform)
    // 有输入时始终显示掩码格式（含未填槽位占位符）；空值时按焦点语义决定
    // 是否显示占位掩码（showMaskOnFocus/alwaysShowMask，此前两个 prop 是死参数）
    const shouldShowMaskPlaceholder = alwaysShowMask || (showMaskOnFocus && focused)
    const displayValue = options.separate
        ? value
        : maskedValue.length > 0 || shouldShowMaskPlaceholder
            ? buildDisplayValue(maskedValue, slots, options.slotChar)
            : ''

    // useUncontrolled 非受控分支的 setter 每次渲染都是新身份，直接作为依赖会导致 effect 每次渲染重跑；
    // 这里用 ref 持有最新 setValue，effect 只需在 resetRef 变化时重新挂载
    const setValueRef = useRef(setValue)
    setValueRef.current = setValue

    // Assign reset function to resetRef
    useEffect(() => {
        if (resetRef) {
            assignRef(resetRef, () => {
                setValueRef.current('')
                if (inputRef.current) {
                    inputRef.current.value = ''
                }
            })
        }
        return () => {
            if (resetRef) {
                assignRef(resetRef, null)
            }
        }
    }, [resetRef])

    // 掩码应用的核心逻辑：handleChange 与 compositionend 共用
    // （经 ref 持有最新闭包，供挂载期绑定的原生 compositionend 监听调用）
    const applyInputValueRef = useRef<(inputValue: string) => void>(() => {})
    applyInputValueRef.current = (inputValue: string) => {
        const currentOptions = resolveOptions(value)
        const currentSlots = parseMask(currentOptions.mask, currentOptions.tokens)
        const newMasked = applyMaskToValue(inputValue, currentSlots, transform)
        const newDisplay = currentOptions.separate
            ? inputValue
            : buildDisplayValue(newMasked, currentSlots, currentOptions.slotChar)
        const newRaw = extractRaw(newMasked, currentSlots)

        // Update the input element's displayed value
        if (inputRef.current) {
            // 直接改写 value 会让光标跳到末尾：记录编辑后的光标在输入串中的位置，
            // 按"该位置前被掩码保留的有效字符数"把光标映射回新显示串，
            // 并跟随其后自动插入的字面量（如 000-000 的 '-'）
            const selectionStart = inputRef.current.selectionStart ?? inputValue.length
            inputRef.current.value = newDisplay

            if (!currentOptions.separate) {
                const produced: number[] = []
                let inputIndex = 0
                for (const slot of currentSlots) {
                    if (inputIndex >= inputValue.length) break
                    if (slot.type === 'literal') {
                        produced.push(inputIndex)
                        if (inputValue[inputIndex] === slot.char) {
                            inputIndex++
                        }
                        continue
                    }
                    while (inputIndex < inputValue.length) {
                        const ch = inputValue[inputIndex++]
                        const transformed = transform ? transform(ch) : ch
                        if (slot.pattern.test(transformed)) {
                            produced.push(inputIndex)
                            break
                        }
                    }
                }

                let filled = 0
                for (let p = 0; p < produced.length && produced[p] <= selectionStart; p++) {
                    filled = p + 1
                }
                let nextCursor = Math.min(filled, newDisplay.length)
                while (
                    nextCursor < newDisplay.length &&
                    currentSlots[nextCursor]?.type === 'literal'
                ) {
                    nextCursor++
                }
                inputRef.current.setSelectionRange(nextCursor, nextCursor)
            }
        }

        setValue(currentOptions.separate ? inputValue : newRaw)
        onChangeRaw?.(newRaw, newDisplay)

        if (isMaskComplete(newMasked, currentSlots)) {
            onComplete?.(newDisplay, newRaw)
        }
    }

    // 原生 composition 事件监听：React 的 onChange 基于 input 事件，IME 组合期间同样触发，
    // 仅靠合成事件无法可靠覆盖（且 compositionend 在部分浏览器早于最后一次 input）
    useEffect(() => {
        const inputEl = inputRef.current
        if (!inputEl) {
            return undefined
        }

        const handleCompositionStart = () => {
            composingRef.current = true
        }

        const handleCompositionEnd = () => {
            composingRef.current = false
            applyInputValueRef.current(inputEl.value)
        }

        inputEl.addEventListener('compositionstart', handleCompositionStart)
        inputEl.addEventListener('compositionend', handleCompositionEnd)
        return () => {
            inputEl.removeEventListener('compositionstart', handleCompositionStart)
            inputEl.removeEventListener('compositionend', handleCompositionEnd)
        }
    }, [])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // IME 组合期间跳过格式化与 DOM 改写（组合文本会被掩码吞掉、组合框被打断），
        // compositionend 后由原生监听统一应用掩码；isComposing 兜底 Safari 等事件顺序差异
        // （React 的 ChangeEvent.nativeEvent 泛型为 Event，input 事件的 isComposing 需显式收窄）
        const nativeEvent = event.nativeEvent as InputEvent
        if (composingRef.current || nativeEvent.isComposing) {
            return
        }
        applyInputValueRef.current(event.currentTarget.value)
    }

    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        setFocused(true)
        consumerOnFocus?.(event)
    }

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        setFocused(false)
        consumerOnBlur?.(event)
        if (autoClear && !isMaskComplete(maskedValue, slots)) {
            setValue('')
            if (inputRef.current) {
                inputRef.current.value = ''
            }
        }
    }

    const input = (
        <InputBase
            {...others}
            id={inputId}
            ref={mergedRef}
            value={displayValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            wrapperProps={hasWrapper ? wrapperProps : { ...getStyles('root'), ...wrapperProps }}
        />
    )

    if (!hasWrapper) {
        return input
    }

    return (
        <InputWrapper
            {...getStyles('root')}
            label={label}
            description={description}
            error={error}
            success={success}
            required={required}
            inputId={inputId}
            labelProps={labelProps}
            descriptionProps={descriptionProps}
            errorProps={errorProps}
        >
            {input}
        </InputWrapper>
    )
})

MaskInput.classes = classes
MaskInput.displayName = '@xiaoye-react/ui/MaskInput'

export namespace MaskInput {
    export type Props = MaskInputProps
    export type StylesNames = MaskInputStylesNames
    export type Factory = MaskInputFactory
}
