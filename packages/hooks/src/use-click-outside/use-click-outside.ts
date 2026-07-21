import { useEffect, useRef } from 'react'

const DEFAULT_EVENTS = ['mousedown', 'touchstart']

/**
 * 检测点击事件是否发生在指定元素外部
 * @template T 目标元素的类型，默认为 HTMLElement
 * @param {() => void} callback 当点击外部时触发的回调函数
 * @param {string[] | null} [events] 要监听的事件类型数组，默认为['mousedown', 'touchstart']
 * @param {(HTMLElement | null)[]} [nodes] 需要排除检测的额外节点数组
 * @returns {React.RefObject<T>} 需要检测的元素的ref对象
 */
export function useClickOutside<T extends HTMLElement = any>(
    callback: () => void,
    events?: string[] | null,
    nodes?: (HTMLElement | null)[]
) {
    const ref = useRef<T>(null)
    const eventsList = events || DEFAULT_EVENTS
    // 用 ref 跟踪最新 callback/nodes，避免内联数组/函数进入 deps 导致每次渲染重挂监听
    const callbackRef = useRef(callback)
    callbackRef.current = callback
    const nodesRef = useRef(nodes)
    nodesRef.current = nodes
    // eventsList 用 join 作为稳定 dep（数组身份每次不同但内容相同时字符串相同）
    const eventsKey = eventsList.join(',')

    useEffect(() => {
        const listener = (event: any) => {
            const { target } = event ?? {}
            const currentNodes = nodesRef.current
            if (Array.isArray(currentNodes)) {
                const shouldIgnore = !document.body.contains(target) && target.tagName !== 'HTML'
                const shouldTrigger = currentNodes.every(node => !!node && !event.composedPath().includes(node))
                shouldTrigger && !shouldIgnore && callbackRef.current()
            } else if (ref.current && !ref.current.contains(target)) {
                callbackRef.current()
            }
        }

        const eventsArr = eventsKey.split(',')
        eventsArr.forEach(fn => document.addEventListener(fn, listener))

        return () => {
            eventsArr.forEach(fn => document.removeEventListener(fn, listener))
        }
    }, [ref, eventsKey])

    return ref
}
