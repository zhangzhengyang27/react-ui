import { useCallback, useEffect, useRef, useState } from 'react'

export interface UseDebouncedValueOptions {
    leading?: boolean
}

export interface UseDebouncedValueHandlers {
    cancel: () => void
    flush: () => void
}

export type UseDebouncedValueReturnValue<T> = [T, () => void, UseDebouncedValueHandlers]

type UseDebHandlers = UseDebouncedValueHandlers

export function useDebouncedValue<T = any>(
    value: T,
    wait: number,
    options: UseDebouncedValueOptions = { leading: false }
): UseDebouncedValueReturnValue<T> {
    const [_value, setValue] = useState(value)
    const mountedRef = useRef(false)
    // 尾随值定时器与 leading 冷却定时器拆成两个 ref:冷却定时器负责恢复 leading 资格,
    // 尾随定时器负责落值,二者生命周期不同,混用一个 ref 会互相覆盖
    const timeoutRef = useRef<number | null>(null)
    const cooldownTimerRef = useRef<number | null>(null)
    const cooldownRef = useRef(false)

    const latestValueRef = useRef(value)
    latestValueRef.current = value

    const clearTrailingTimer = () => {
        if (timeoutRef.current !== null) {
            window.clearTimeout(timeoutRef.current)
            timeoutRef.current = null
        }
    }

    const clearCooldownTimer = () => {
        if (cooldownTimerRef.current !== null) {
            window.clearTimeout(cooldownTimerRef.current)
            cooldownTimerRef.current = null
        }
    }

    // cancel 只中止挂起的值更新,不重置冷却标志:冷却资格由冷却定时器自行恢复,
    // 否则冷却窗口内的变更会把冷却提前清零,下一次变更误走 leading 立即生效
    const cancel = useCallback(() => {
        clearTrailingTimer()
    }, [])

    const flush = useCallback(() => {
        if (timeoutRef.current) {
            cancel()
            clearCooldownTimer()
            cooldownRef.current = false
            setValue(latestValueRef.current)
        }
    }, [])

    useEffect(() => {
        if (mountedRef.current) {
            if (!cooldownRef.current && options.leading) {
                // leading 立即生效前先清掉挂起的尾随定时器:否则旧尾随定时器到期后
                // setValue(旧值) 会把刚立即生效的新值回退成历史值
                clearTrailingTimer()
                clearCooldownTimer()
                cooldownRef.current = true
                setValue(value)
                cooldownTimerRef.current = window.setTimeout(() => {
                    cooldownRef.current = false
                }, wait)
            } else {
                cancel()
                timeoutRef.current = window.setTimeout(() => {
                    // 尾随落值同时结束本轮冷却(冷却窗口内到达的变更走尾随)
                    cooldownRef.current = false
                    clearCooldownTimer()
                    setValue(value)
                }, wait)
            }
        }
    }, [value, options.leading, wait])

    useEffect(() => {
        mountedRef.current = true
        return () => {
            clearTrailingTimer()
            clearCooldownTimer()
        }
    }, [])

    return [_value, cancel, { cancel, flush }]
}

export namespace useDebouncedValue {
    export type Handlers = UseDebouncedValueHandlers
    export type Options = UseDebouncedValueOptions
    export type ReturnValue<T> = UseDebouncedValueReturnValue<T>
}
