'use client'

import { Notification } from '@react-ui/ui'

export default function NotificationLoadingDemo() {
    return <Notification loading title="正在处理" message="请稍候，正在同步数据..." withCloseButton={false} />
}
