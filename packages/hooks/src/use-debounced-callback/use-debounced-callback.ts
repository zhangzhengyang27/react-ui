import { useEffect, useMemo, useRef } from 'react'
import { useCallbackRef } from '../use-callback-ref/use-callback-ref'

export interface UseDebouncedCallbackOptions {
    delay: number
    flushOnUnmount?: boolean
    leading?: boolean
    maxWait?: number
}

export type UseDebouncedCallbackReturnValue<T extends (...args: any[]) => any> = ((...args: Parameters<T>) => void) & {
    flush: () => void
    cancel: () => void
    isPending: () => boolean
}

export function useDebouncedCallback<T extends (...args: any[]) => any>(
    callback: T,
    options: number | UseDebouncedCallbackOptions
) {
    const { delay, flushOnUnmount, leading, maxWait } =
        typeof options === 'number'
            ? {
                  delay: options,
                  flushOnUnmount: false,
                  leading: false,
                  maxWait: undefined as number | undefined
              }
            : options

    const handleCallback = useCallbackRef(callback)
    const debounceTimerRef = useRef(0)
    const maxWaitTimerRef = useRef(0)
    const latestArgsRef = useRef<Parameters<T> | null>(null)

    // 用 ref 跟踪 pending 状态，isPending 始终读取最新值，
    // 避免闭包自引用（currentCallback）导致的陈旧返回。
    const isPendingRef = useRef(false)
    const isFirstCallRef = useRef(true)

    const clearTimers = () => {
        window.clearTimeout(debounceTimerRef.current)
        window.clearTimeout(maxWaitTimerRef.current)
        debounceTimerRef.current = 0
        maxWaitTimerRef.current = 0
    }

    const lastCallback = useMemo(() => {
        const debounced = Object.assign(
            (...args: Parameters<T>) => {
                window.clearTimeout(debounceTimerRef.current)
                latestArgsRef.current = args

                const isFirstCall = isFirstCallRef.current
                isFirstCallRef.current = false
                isPendingRef.current = true

                const startMaxWaitTimer = () => {
                    if (maxWait !== undefined && maxWaitTimerRef.current === 0) {
                        maxWaitTimerRef.current = window.setTimeout(() => {
                            maxWaitTimerRef.current = 0
                            if (debounceTimerRef.current !== 0) {
                                const latestArgs = latestArgsRef.current!
                                clearTimers()
                                isPendingRef.current = false
                                handleCallback(...latestArgs)
                            }
                        }, maxWait)
                    }
                }

                const resetLeadingState = () => {
                    clearTimers()
                    isFirstCallRef.current = true
                    isPendingRef.current = false
                }

                if (leading && isFirstCall) {
                    handleCallback(...args)
                    debounceTimerRef.current = window.setTimeout(resetLeadingState, delay)
                    startMaxWaitTimer()
                    return
                }

                const flush = () => {
                    if (debounceTimerRef.current !== 0) {
                        const latestArgs = latestArgsRef.current!
                        clearTimers()
                        isPendingRef.current = false
                        handleCallback(...latestArgs)
                    }
                }

                debounced.flush = flush
                debounced.cancel = resetLeadingState
                debounceTimerRef.current = window.setTimeout(flush, delay)
                startMaxWaitTimer()
            },
            {
                flush: () => {
                    if (debounceTimerRef.current !== 0) {
                        const latestArgs = latestArgsRef.current
                        clearTimers()
                        isPendingRef.current = false
                        if (latestArgs) {
                            handleCallback(...latestArgs)
                        }
                    }
                },
                cancel: () => {
                    clearTimers()
                    isFirstCallRef.current = true
                    isPendingRef.current = false
                },
                isPending: () => isPendingRef.current
            }
        )
        return debounced
    }, [handleCallback, delay, leading, maxWait])

    useEffect(
        () => () => {
            if (flushOnUnmount) {
                lastCallback.flush()
            } else {
                lastCallback.cancel()
            }
        },
        [lastCallback, flushOnUnmount]
    )

    return lastCallback
}

export namespace useDebouncedCallback {
    export type Options = UseDebouncedCallbackOptions
    export type ReturnValue<T extends (...args: any[]) => any> = UseDebouncedCallbackReturnValue<T>
}
