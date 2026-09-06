import { useCallback, useEffect, useRef } from 'react'

export function useEventListener<K extends keyof HTMLElementEventMap, T extends HTMLElement = any>(
    type: K,
    listener: (this: T, ev: HTMLElementEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
): React.RefCallback<T | null> {
    // 用 ref 跟踪最新 listener，避免 listener 进入 callbackRef deps 导致身份 churn
    const listenerRef = useRef(listener)
    listenerRef.current = listener
    const previousNode = useRef<T | null>(null)

    // 稳定 wrapper：始终调用最新 listenerRef.current，解决「listener 变化时旧监听不解除」的问题。
    // addEventListener 绑定的是稳定 wrapper，真正被调用的回调永远是最新的 listener。
    // 用 function 声明保留 this 类型，并将实际的绑定节点作为 this 转发给 listener。
    const stableListener = useRef(function (this: T, ev: HTMLElementEventMap[K]) {
        listenerRef.current?.call(this, ev)
    })

    const callbackRef: React.RefCallback<T | null> = useCallback(
        node => {
            if (!node) {
                return undefined
            }

            const handler = stableListener.current as EventListener
            previousNode.current?.removeEventListener(type, handler, options)
            node.addEventListener(type, handler, options)
            previousNode.current = node

            // React 19 ref callback cleanup：节点分离时移除监听
            return () => {
                node.removeEventListener(type, handler, options)
            }
        },
        [type, options]
    )

    useEffect(
        () => () => {
            if (previousNode.current) {
                previousNode.current.removeEventListener(type, stableListener.current as EventListener, options)
            }
        },
        [type, options]
    )

    return callbackRef
}
