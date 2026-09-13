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

    useEffect(() => {
        if (observer.current) {
            observer.current.disconnect()
            observer.current = null
        }

        const targetElement = typeof target === 'function' ? target() : target

        if (targetElement) {
            observer.current = new MutationObserver((...args) => callbackRef.current(...args))
            observer.current.observe(targetElement, optionsRef.current)
        }

        return () => {
            if (observer.current) {
                observer.current.disconnect()
                observer.current = null
            }
        }
    }, [target])
}
