import { useCallback, useEffect, useRef } from 'react'

export function useMutationObserver<T extends HTMLElement = any>(
    callback: MutationCallback,
    options: MutationObserverInit
): React.RefCallback<T | null> {
    const observer = useRef<MutationObserver | null>(null)
    // callback/options 经 ref 转发最新值：消费方传内联对象时不再每渲染 disconnect/重建 observer
    const callbackRef = useRef(callback)
    callbackRef.current = callback
    const optionsRef = useRef(options)
    optionsRef.current = options

    const refCallback: React.RefCallback<T | null> = useCallback(
        (node) => {
            if (observer.current) {
                observer.current.disconnect()
                observer.current = null
            }

            if (node) {
                observer.current = new MutationObserver((...args) => callbackRef.current(...args))
                observer.current.observe(node, optionsRef.current)
            }

            return () => {
                if (observer.current) {
                    observer.current.disconnect()
                    observer.current = null
                }
            }
        },
        []
    )

    return refCallback
}

export function useMutationObserverTarget(
    callback: MutationCallback,
    options: MutationObserverInit,
    target?: HTMLElement | (() => HTMLElement) | null
): void {
    const observer = useRef<MutationObserver | null>(null)
    const callbackRef = useRef(callback)
    callbackRef.current = callback
    const optionsRef = useRef(options)
    optionsRef.current = options
    // 记录当前观察的目标元素:target 为内联 getter(() => ref.current)时每渲染新函数
    // 引用,若直接据此 disconnect/重建,observer 会在每次渲染间反复重启
    const observedElementRef = useRef<HTMLElement | null>(null)

    useEffect(() => {
        const currentTarget = typeof target === 'function' ? target() : (target ?? null)

        // 每次重跑都重新求值 target(元素可能从 null 变为挂载节点),
        // 但仅当解析出的元素真正变化时才 disconnect 并重建 observer
        if (observedElementRef.current === currentTarget) {
            return
        }
        observedElementRef.current = currentTarget

        if (observer.current) {
            observer.current.disconnect()
            observer.current = null
        }

        if (currentTarget) {
            observer.current = new MutationObserver((...args) => callbackRef.current(...args))
            observer.current.observe(currentTarget, optionsRef.current)
        }
    }, [target])

    useEffect(
        () => () => {
            if (observer.current) {
                observer.current.disconnect()
                observer.current = null
            }
        },
        []
    )
}
