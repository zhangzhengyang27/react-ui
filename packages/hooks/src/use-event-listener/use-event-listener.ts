import { useCallback, useEffect, useRef } from 'react'

export function useEventListener<K extends keyof HTMLElementEventMap, T extends HTMLElement = any>(
    type: K,
    listener: (this: T, ev: HTMLElementEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
): React.RefCallback<T | null> {
    // 用 ref 跟踪最新 listener，避免 listener 进入 callbackRef deps 导致身份 churn
    const listenerRef = useRef(listener)
    listenerRef.current = listener
    // options 经 ref 转发：消费方传内联对象（如 { passive: true }）时不再每渲染解绑重绑。
    // removeEventListener 的 options 只有 capture 位有意义，解绑用绑定时记录的同款选项
    const optionsRef = useRef(options)
    optionsRef.current = options
    const boundOptionsRef = useRef(options)
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
            const bindOptions = optionsRef.current
            boundOptionsRef.current = bindOptions
            previousNode.current?.removeEventListener(type, handler, bindOptions)
            node.addEventListener(type, handler, bindOptions)
            previousNode.current = node

            // React 19 ref callback cleanup：节点分离时移除监听
            return () => {
                node.removeEventListener(type, handler, bindOptions)
            }
        },
        [type]
    )

    useEffect(
        () => () => {
            if (previousNode.current) {
                previousNode.current.removeEventListener(
                    type,
                    stableListener.current as EventListener,
                    boundOptionsRef.current
                )
            }
        },
        [type]
    )

    return callbackRef
}
