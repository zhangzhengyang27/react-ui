import { useCallback, useEffect, useRef, useState } from 'react'
import { useCallbackRef } from '../use-callback-ref/use-callback-ref'

export function useThrottledValue<T>(value: T, wait: number): T {
    const [throttledValue, setThrottledValue] = useState(value)
    const valueRef = useRef(value)
    const activeRef = useRef(true)
    const timeoutRef = useRef<number | null>(null)
    const latestArgsRef = useRef<T>(value)
    const lastCalledArgsRef = useRef<T>(value)
    const waitRef = useRef(wait)

    const handleCallback = useCallbackRef(setThrottledValue)

    const callThrottledCallback = useCallback(
        (val: T) => {
            handleCallback(val)
            lastCalledArgsRef.current = val
            activeRef.current = false
        },
        [handleCallback]
    )

    const timerCallback = useCallback(() => {
        if (latestArgsRef.current !== lastCalledArgsRef.current) {
            callThrottledCallback(latestArgsRef.current)
            timeoutRef.current = window.setTimeout(timerCallback, waitRef.current)
        } else {
            activeRef.current = true
        }
    }, [callThrottledCallback])

    useEffect(() => {
        waitRef.current = wait
    }, [wait])

    useEffect(() => {
        if (value !== valueRef.current) {
            valueRef.current = value
            latestArgsRef.current = value

            if (activeRef.current) {
                callThrottledCallback(value)
                timeoutRef.current = window.setTimeout(timerCallback, waitRef.current)
            }
        }
    }, [value, callThrottledCallback, timerCallback])

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                window.clearTimeout(timeoutRef.current)
            }
        }
    }, [])

    return throttledValue
}

export namespace useThrottledValue {
    export type ReturnValue<T> = T
}
