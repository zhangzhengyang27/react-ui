import { useEffect, useRef } from 'react'
import { Notification } from '../Notification'
import { getAutoClose } from './get-auto-close/get-auto-close'
import type { NotificationData, NotificationsStore } from './notifications.store'
import { hideNotification } from './notifications.store'

export interface NotificationContainerProps {
    data: NotificationData
    store: NotificationsStore
    autoClose: number | false
    onHoverStart?: () => void
    onHoverEnd?: () => void
    paused?: boolean
}

export function NotificationContainer({
    data,
    store,
    autoClose,
    onHoverStart,
    onHoverEnd,
    paused
}: NotificationContainerProps) {
    const { autoClose: notificationAutoClose, message, allowClose, onOpen, ...notificationProps } = data

    const autoCloseDuration = getAutoClose(autoClose, notificationAutoClose)
    const autoCloseTimeout = useRef<number | null>(null)
    const isCloseDisabled = allowClose === false
    // 用 ref 跟踪最新的 hover 回调,卸载清理时调用最新版本
    const isHoveredRef = useRef(false)
    const onHoverEndRef = useRef(onHoverEnd)
    onHoverEndRef.current = onHoverEnd

    const handleHide = () => {
        if (data.id) {
            hideNotification(data.id, store)
        }
    }

    const cancelAutoClose = () => {
        if (autoCloseTimeout.current) {
            window.clearTimeout(autoCloseTimeout.current)
            autoCloseTimeout.current = null
        }
    }

    const handleAutoClose = () => {
        // 悬停中不启动自动关闭,避免 effect 因 autoCloseDuration/paused 变化在悬停期间重跑时误启动定时器
        if (paused || isHoveredRef.current || typeof autoCloseDuration !== 'number') {
            return
        }
        autoCloseTimeout.current = window.setTimeout(handleHide, autoCloseDuration)
    }

    useEffect(() => {
        onOpen?.(data)
    }, [])

    useEffect(() => {
        handleAutoClose()
        return cancelAutoClose
    }, [autoCloseDuration, paused])

    // 卸载时若仍处于 hover 状态,补发 onHoverEnd,避免 hoveredCount 泄漏导致 autoClose 永久暂停
    useEffect(() => {
        return () => {
            if (isHoveredRef.current) {
                onHoverEndRef.current?.()
            }
        }
    }, [])

    return (
        <Notification
            {...notificationProps}
            message={message}
            withCloseButton={isCloseDisabled ? false : notificationProps.withCloseButton}
            onClose={handleHide}
            onMouseEnter={() => {
                cancelAutoClose()
                isHoveredRef.current = true
                onHoverStart?.()
            }}
            onMouseLeave={() => {
                // 先清除悬停标记再恢复自动关闭,handleAutoClose 内部会检查 isHoveredRef
                isHoveredRef.current = false
                onHoverEnd?.()
                handleAutoClose()
            }}
        />
    )
}

NotificationContainer.displayName = '@xiaoye-react/ui/NotificationContainer'
