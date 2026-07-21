import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * 控制开关状态的React Hook
 * @param {boolean} [initialState=false] - 初始开关状态，默认为关闭(false)
 * @param {Object} [callbacks] - 状态变更时的回调函数
 * @param {Function} [callbacks.onOpen] - 当状态变为打开时触发的回调
 * @param {Function} [callbacks.onClose] - 当状态变为关闭时触发的回调
 * @returns {[boolean, {open: Function, close: Function, toggle: Function}]}
 * 返回一个元组，包含当前状态和操作对象(open/close/toggle方法)
 *
 * 注意：onOpen/onClose 通过 useEffect 在状态变化后触发（非同步）。
 * 之前的实现把副作用放在 setState updater 内，违反 React Hooks 规范——
 * StrictMode 下 updater 双调用会导致 onOpen/onClose 被调用两次。
 */
export function useDisclosure(
    initialState = false,
    callbacks?: { onOpen?: () => void; onClose?: () => void }
) {
    const { onOpen, onClose } = callbacks || {}
    const [opened, setOpened] = useState(initialState)
    // 跟踪上一次的 opened 值，用于检测状态变化方向
    const prevOpenedRef = useRef(initialState)

    useEffect(() => {
        if (prevOpenedRef.current !== opened) {
            if (opened) {
                onOpen?.()
            } else {
                onClose?.()
            }
            prevOpenedRef.current = opened
        }
    }, [opened, onOpen, onClose])

    const open = useCallback(() => setOpened(true), [])
    const close = useCallback(() => setOpened(false), [])
    const toggle = useCallback(() => setOpened(prev => !prev), [])

    return [opened, { open, close, toggle }] as const
}
