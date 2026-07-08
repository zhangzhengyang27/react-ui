'use client'

import { Button, notifications } from '@react-ui/ui'

export default function NotificationsBasicDemo() {
    return (
        <Button
            onClick={() =>
                notifications.show({
                    title: '成功',
                    message: '这是一条通知消息',
                    color: 'green'
                })
            }
        >
            显示通知
        </Button>
    )
}
