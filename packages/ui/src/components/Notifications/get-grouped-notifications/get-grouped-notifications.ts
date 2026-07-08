import type { NotificationData, NotificationPosition } from '../notifications.store'

export const positions: NotificationPosition[] = [
    'top-left',
    'top-right',
    'top-center',
    'bottom-left',
    'bottom-right',
    'bottom-center'
]

export function getGroupedNotifications(notifications: NotificationData[], defaultPosition: NotificationPosition) {
    const grouped: Record<NotificationPosition, NotificationData[]> = {
        'top-left': [],
        'top-right': [],
        'top-center': [],
        'bottom-left': [],
        'bottom-right': [],
        'bottom-center': []
    }

    notifications.forEach(notification => {
        const position = notification.position || defaultPosition
        grouped[position].push(notification)
    })

    return grouped
}
