import { SetStateAction, useCallback, useEffect, useRef, useState } from 'react'

export interface UseDebouncedStateOptions {
    leading?: boolean
}

export type UseDebouncedStateReturnValue<T> = [T, (newValue: SetStateAction<T>) => void]

export function useDebouncedState<T = any>(
    defaultValue: T,
    wait: number,
    options: UseDebouncedStateOptions = { leading: false }
): UseDebouncedStateReturnValue<T> {
    const [value, setValue] = useState(defaultValue)
    const timeoutRef = useRef<number | null>(null)
    const leadingRef = useRef(true)

    // 显式判空避免非空断言：clearTimeout(null) 虽合法但类型不安全
    const clearTimeoutRef = () => {
        if (timeoutRef.current !== null) {
            window.clearTimeout(timeoutRef.current)
            timeoutRef.current = null
        }
    }
    useEffect(() => clearTimeoutRef, [])

    // options.leading 切换时重置 leadingRef，避免从 false 切到 true 后首次调用不立即触发
    useEffect(() => {
        leadingRef.current = true
    }, [options.leading])

    const debouncedSetValue = useCallback(
        (newValue: SetStateAction<T>) => {
            clearTimeoutRef()
            if (leadingRef.current && options.leading) {
                setValue(newValue)
            } else {
                timeoutRef.current = window.setTimeout(() => {
                    leadingRef.current = true
                    setValue(newValue)
                }, wait)
            }
            leadingRef.current = false
        },
        [options.leading, wait]
    )

    return [value, debouncedSetValue] as const
}

export namespace useDebouncedState {
    export type Options = UseDebouncedStateOptions
    export type ReturnValue<T> = UseDebouncedStateReturnValue<T>
}
