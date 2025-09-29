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

    useEffect(() => {
        const listener = (event: any) => {
            const { target } = event ?? {}
            if (Array.isArray(nodes)) {
                /**
                 * 检查目标元素是否应该被忽略
                 * @param {HTMLElement} target - 要检查的DOM元素
                 * @returns {boolean} 如果目标元素不在文档中且不是HTML元素则返回true，否则返回false
                 */
                const shouldIgnore = !document.body.contains(target) && target.tagName != 'HTML'
                /**
                 * 检查事件是否发生在指定节点之外
                 * @param {Node} node - 要检查的DOM节点
                 * @param {Event} event - 触发的事件对象
                 * @returns {boolean} 如果事件发生在节点之外返回true，否则返回false
                 */
                const shouldTrigger = nodes.every(node => !!node && !event.composedPath().includes(node))
                shouldTrigger && !shouldIgnore && callback()
            } else if (ref.current && !ref.current.contains(target)) {
                callback()
            }
        }

        eventsList.forEach(fn => document.addEventListener(fn, listener))

        return () => {
            eventsList.forEach(fn => document.removeEventListener(fn, listener))
        }
    }, [ref, callback, nodes])

    return ref
}
