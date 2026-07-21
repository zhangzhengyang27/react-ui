import { useCallback, useEffect, useRef } from 'react'

export function useEventListener<K extends keyof HTMLElementEventMap, T extends HTMLElement = any>(
    type: K,
    listener: (this: T, ev: HTMLElementEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
): React.RefCallback<T | null> {
    // 用 ref 跟踪最新 listener，避免 listener 进入 callbackRef deps 导致身份 churn
    // 消费者内联传入 listener 时，callbackRef 身份保持稳定，不再每次渲染重挂监听
    const listenerRef = useRef(listener)
    listenerRef.current = listener
    const previousNode = useRef<T | null>(null)

    const callbackRef: React.RefCallback<T | null> = useCallback(
        (node) => {
            if (!node) {
                return undefined
            }

            previousNode.current?.removeEventListener(
                type,
                listenerRef.current as any,
                options
            )
            node.addEventListener(type, listenerRef.current as any, options)
            previousNode.current = node

            // React 19 ref callback cleanup：节点分离时移除监听
            return () => {
                node.removeEventListener(type, listenerRef.current as any, options)
            }
        },
        [type, options]
    )

    useEffect(
        () => () => {
            if (previousNode.current) {
                previousNode.current.removeEventListener(
                    type,
                    listenerRef.current as any,
                    options
                )
            }
        },
        [type, options]
    )

    return callbackRef
}
