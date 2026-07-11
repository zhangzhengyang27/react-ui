import { useCallback, useEffect, useRef } from 'react'

/**
 * React useEffectEvent 的 polyfill，用于在稳定回调中访问最新的 props/state。
 * 注意：此实现会返回一个稳定的回调函数，该回调始终调用最新传入的函数。
 */
export function useEffectEvent<T extends (...args: any[]) => any>(fn: T): T {
    const ref = useRef(fn)

    useEffect(() => {
        ref.current = fn
    }, [fn])

    return useCallback((...args: any[]) => ref.current(...args), []) as T
}
