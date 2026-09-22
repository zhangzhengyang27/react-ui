import { useEffect, useRef } from 'react'
import { useEffectEvent } from '@xiaoye-react/hooks'
import cx from 'clsx'
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
    className?: string
    style?: React.CSSProperties
}

// store 内部/管理字段不允许透传到 Notification 的 DOM 上
export function NotificationContainer({
    data,
    store,
    autoClose,
    onHoverStart,
    onHoverEnd,
    paused,
    className,
    style
}: NotificationContainerProps) {
    const {
        autoClose: notificationAutoClose,
        message,
        allowClose,
        onOpen,
        // id/position/priority/__sequence 是 store 管理/内部字段,不允许透传到 Notification 的 DOM 上
        id: _id,
        position: _position,
        priority: _priority,
        __sequence: _sequence,
        ...notificationProps
    } = data

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

    // useEffectEvent：身份稳定可进依赖表，回调体又始终读到最新的 paused/autoCloseDuration
    const handleAutoClose = useEffectEvent(() => {
        // 悬停中不启动自动关闭,避免 effect 因 autoCloseDuration/paused 变化在悬停期间重跑时误启动定时器
        if (paused || isHoveredRef.current || typeof autoCloseDuration !== 'number') {
            return
        }
        autoCloseTimeout.current = window.setTimeout(handleHide, autoCloseDuration)
    })

    // onOpen 通常是埋点/上报类副作用：用 ref 守卫保证只触发一次
    //（React 18/19 开发环境 StrictMode 会双调用 effect）
    const onOpenCalledRef = useRef(false)
    // data/onOpen 每渲染都是新对象，经 useEffectEvent 转发后依赖表里只剩稳定的 notifyOpen
    const notifyOpen = useEffectEvent(() => {
        onOpen?.(data)
    })

    useEffect(() => {
        if (onOpenCalledRef.current) {
            return
        }
        onOpenCalledRef.current = true
        notifyOpen()
    }, [notifyOpen])

    useEffect(() => {
        handleAutoClose()
        return cancelAutoClose
    }, [autoCloseDuration, paused, handleAutoClose])

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
            // 接线 Notifications getStyles('notification') 的样式槽,与通知自身的 className/style 合并
            className={cx(notificationProps.className, className)}
            style={{ ...(notificationProps.style as React.CSSProperties), ...style }}
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
