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
        if (paused || typeof autoCloseDuration !== 'number') {
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

    return (
        <Notification
            {...notificationProps}
            message={message}
            withCloseButton={isCloseDisabled ? false : notificationProps.withCloseButton}
            onClose={handleHide}
            onMouseEnter={() => {
                cancelAutoClose()
                onHoverStart?.()
            }}
            onMouseLeave={() => {
                handleAutoClose()
                onHoverEnd?.()
            }}
        />
    )
}

NotificationContainer.displayName = '@react-ui/ui/NotificationContainer'
