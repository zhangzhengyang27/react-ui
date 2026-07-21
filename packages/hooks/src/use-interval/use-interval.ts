import { useCallback, useEffect, useRef, useState } from 'react'

export interface UseIntervalOptions {
    /** If set, the interval will start automatically when the component is mounted, `false` by default */
    autoInvoke?: boolean
}

export interface UseIntervalReturnValue {
    /** Starts the interval */
    start: () => void

    /** Stops the interval */
    stop: () => void

    /** Toggles the interval */
    toggle: () => void

    /** Indicates if the interval is active */
    active: boolean
}

export function useInterval(
    fn: () => void,
    interval: number,
    { autoInvoke = false }: UseIntervalOptions = {}
): UseIntervalReturnValue {
    const [active, setActive] = useState(false)
    const intervalRef = useRef<number | null>(null)
    // 修复类型：fnRef 初值为 null，类型应为 (() => void) | null
    const fnRef = useRef<(() => void) | null>(null)
    fnRef.current = fn
    const intervalValueRef = useRef(interval)
    intervalValueRef.current = interval

    const start = useCallback(() => {
        setActive((old) => {
            if (!old && !intervalRef.current) {
                intervalRef.current = window.setInterval(fnRef.current!, intervalValueRef.current)
            }
            return true
        })
    }, [])

    const stop = useCallback(() => {
        setActive(false)
        if (intervalRef.current) {
            window.clearInterval(intervalRef.current)
        }
        intervalRef.current = null
    }, [])

    const toggle = useCallback(() => {
        setActive((current) => {
            if (current) {
                if (intervalRef.current) {
                    window.clearInterval(intervalRef.current)
                }
                intervalRef.current = null
                return false
            }
            if (!intervalRef.current) {
                intervalRef.current = window.setInterval(fnRef.current!, intervalValueRef.current)
            }
            return true
        })
    }, [])

    useEffect(() => {
        // fn 不进入 deps：fnRef.current 在渲染期已同步为最新 fn，
        // 内联 fn 不会导致 interval 重启（避免每次渲染 clear+reset interval 的功能失效）
        if (active) {
            start()
        }
        return stop
    }, [active, interval, start, stop])

    useEffect(() => {
        if (autoInvoke) {
            start()
        }
    }, [autoInvoke, start])

    return { start, stop, toggle, active }
}

export namespace useInterval {
    export type Options = UseIntervalOptions
    export type ReturnValue = UseIntervalReturnValue
}
