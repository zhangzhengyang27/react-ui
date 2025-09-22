import { useCallback, useState } from 'react'

/**
 * 控制开关状态的React Hook
 * @param {boolean} [initialState=false] - 初始开关状态，默认为关闭(false)
 * @param {Object} [callbacks] - 状态变更时的回调函数
 * @param {Function} [callbacks.onOpen] - 当状态变为打开时触发的回调
 * @param {Function} [callbacks.onClose] - 当状态变为关闭时触发的回调
 * @returns {[boolean, {open: Function, close: Function, toggle: Function}]}
 * 返回一个元组，包含当前状态和操作对象(open/close/toggle方法)
 */
export function useDisclosure(
    initialState = false,
    callbacks?: { onOpen?: () => void; onClose?: () => void }
) {
    const { onOpen, onClose } = callbacks || {}
    const [opened, setOpened] = useState(initialState)

    const open = useCallback(() => {
        setOpened(isOpened => {
            if (!isOpened) {
                onOpen?.()
                return true
            }
            return isOpened
        })
    }, [onOpen])

    const close = useCallback(() => {
        setOpened(isOpened => {
            if (isOpened) {
                onClose?.()
                return false
            }
            return isOpened
        })
    }, [onClose])

    const toggle = useCallback(() => {
        opened ? close() : open()
    }, [close, open, opened])

    return [opened, { open, close, toggle }] as const
}
