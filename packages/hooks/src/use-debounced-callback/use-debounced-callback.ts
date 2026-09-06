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
    // 是否存在真实的尾随（trailing）待执行调用。
    // leading 模式下防抖 timer 只是「前导锁定」的复位计时器，
    // 没有它就无法区分「锁定中」和「有待执行回调」，flush/maxWait 会把已立即触发过的调用再执行一遍
    const hasTrailingRef = useRef(false)

    const clearTimers = () => {
        window.clearTimeout(debounceTimerRef.current)
        window.clearTimeout(maxWaitTimerRef.current)
        debounceTimerRef.current = 0
        maxWaitTimerRef.current = 0
        hasTrailingRef.current = false
    }

    const lastCallback = useMemo(() => {
        const debounced = Object.assign(
            (...args: Parameters<T>) => {
                window.clearTimeout(debounceTimerRef.current)
                latestArgsRef.current = args

                const isFirstCall = isFirstCallRef.current
                isFirstCallRef.current = false
                isPendingRef.current = true
                hasTrailingRef.current = true

                const startMaxWaitTimer = () => {
                    if (maxWait !== undefined && maxWaitTimerRef.current === 0) {
                        maxWaitTimerRef.current = window.setTimeout(() => {
                            maxWaitTimerRef.current = 0
                            if (debounceTimerRef.current !== 0 && hasTrailingRef.current) {
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
                    // 前导立即执行；此时只有复位计时器在跑，没有待执行的尾随调用
                    hasTrailingRef.current = false
                    handleCallback(...args)
                    debounceTimerRef.current = window.setTimeout(resetLeadingState, delay)
                    startMaxWaitTimer()
                    return
                }

                const flush = () => {
                    if (debounceTimerRef.current !== 0 && hasTrailingRef.current) {
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
                    if (debounceTimerRef.current !== 0 && hasTrailingRef.current) {
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
