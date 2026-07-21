import { useSyncExternalStore } from 'react'
import type { NotificationProps } from '../Notification'

export type NotificationPosition =
    | 'top-left'
    | 'top-right'
    | 'top-center'
    | 'bottom-left'
    | 'bottom-right'
    | 'bottom-center'

export interface NotificationData extends Omit<NotificationProps, 'onClose'>, Record<string, any> {
    /** Notification id, can be used to close or update notification */
    id?: string

    /** Position of the notification, if not set, the position is determined based on `position` prop on Notifications component */
    position?: NotificationPosition

    /** 通知消息, required for all notifications */
    message: React.ReactNode

    /** Display priority. Higher numbers are shown before lower ones when the number of active notifications exceeds `limit`. */
    priority?: number

    /** Determines whether notification should be closed automatically */
    autoClose?: boolean | number

    /** Determines whether notification can be closed with close button */
    allowClose?: boolean

    /** Called when notification closes */
    onClose?: (props: NotificationData) => void

    /** Called when notification opens */
    onOpen?: (props: NotificationData) => void
}

export interface NotificationsState {
    notifications: NotificationData[]
    queue: NotificationData[]
    defaultPosition: NotificationPosition
    limit: number
}

export interface NotificationsStore {
    getState: () => NotificationsState
    setState: (state: NotificationsState) => void
    subscribe: (listener: () => void) => () => void
}

let notificationSequence = 0

interface SequencedNotificationData extends NotificationData {
    __sequence?: number
}

function randomId() {
    return `react-ui-${Math.random().toString(36).slice(2, 11)}`
}

function getDistributedNotifications(
    data: SequencedNotificationData[],
    defaultPosition: NotificationPosition,
    limit: number
) {
    const queue: NotificationData[] = []
    const notifications: NotificationData[] = []
    const groups = new Map<string, SequencedNotificationData[]>()

    for (const item of data) {
        const position = item.position || defaultPosition
        const group = groups.get(position)
        if (group) {
            group.push(item)
        } else {
            groups.set(position, [item])
        }
    }

    for (const group of groups.values()) {
        group.sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0) || (a.__sequence ?? 0) - (b.__sequence ?? 0))
        group.forEach((item, index) => {
            if (index < limit) {
                notifications.push(item)
            } else {
                queue.push(item)
            }
        })
    }

    return { notifications, queue }
}

export function createNotificationsStore(initialState: Partial<NotificationsState> = {}): NotificationsStore {
    let state: NotificationsState = {
        notifications: [],
        queue: [],
        defaultPosition: 'bottom-right',
        limit: 5,
        ...initialState
    }

    const listeners = new Set<() => void>()

    return {
        getState: () => state,
        setState: nextState => {
            state = nextState
            listeners.forEach(listener => listener())
        },
        subscribe: listener => {
            listeners.add(listener)
            return () => listeners.delete(listener)
        }
    }
}

export const notificationsStore = createNotificationsStore()

export function useNotifications(store: NotificationsStore = notificationsStore) {
    // 使用 useSyncExternalStore 替代手写 subscribe + setState,避免并发渲染下漏更新/状态撕裂
    return useSyncExternalStore(store.subscribe, store.getState, store.getState)
}

export function updateNotificationsState(
    store: NotificationsStore,
    update: (notifications: NotificationData[]) => NotificationData[]
) {
    const current = store.getState()
    const notifications = update([...current.notifications, ...current.queue])

    for (const item of notifications as SequencedNotificationData[]) {
        if (item.__sequence === undefined) {
            item.__sequence = notificationSequence
            notificationSequence += 1
        }
    }

    const updated = getDistributedNotifications(notifications, current.defaultPosition, current.limit)

    store.setState({
        ...current,
        notifications: updated.notifications,
        queue: updated.queue
    })
}

export function showNotification(notification: NotificationData, store: NotificationsStore = notificationsStore) {
    const id = notification.id || randomId()

    updateNotificationsState(store, notifications => {
        if (notification.id && notifications.some(n => n.id === notification.id)) {
            return notifications
        }

        return [...notifications, { ...notification, id }]
    })

    return id
}

export function hideNotification(id: string, store: NotificationsStore = notificationsStore) {
    const current = store.getState()
    const hiddenNotification = [...current.notifications, ...current.queue].find(item => item.id === id)

    updateNotificationsState(store, notifications => notifications.filter(notification => notification.id !== id))

    // 状态提交完成后再调用 onClose,避免用户在回调中 show/hide 时被外层 setState 覆盖丢失
    hiddenNotification?.onClose?.(hiddenNotification)

    return id
}

export function updateNotification(notification: NotificationData, store: NotificationsStore = notificationsStore) {
    updateNotificationsState(store, notifications =>
        notifications.map(item => {
            if (item.id === notification.id) {
                return { ...item, ...notification }
            }
            return item
        })
    )

    return notification.id
}

export function cleanNotifications(store: NotificationsStore = notificationsStore) {
    updateNotificationsState(store, () => [])
}

export function cleanNotificationsQueue(store: NotificationsStore = notificationsStore) {
    const { defaultPosition, limit } = store.getState()
    updateNotificationsState(
        store,
        notifications => getDistributedNotifications(notifications, defaultPosition, limit).notifications
    )
}

export const notifications = {
    show: showNotification,
    hide: hideNotification,
    update: updateNotification,
    clean: cleanNotifications,
    cleanQueue: cleanNotificationsQueue,
    updateState: updateNotificationsState
} as const
