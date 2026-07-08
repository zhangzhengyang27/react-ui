'use client'

import { Notification } from '@react-ui/ui'
import { CheckCircle2 } from 'lucide-react'

export default function NotificationBasicDemo() {
    return (
        <Notification
            icon={<CheckCircle2 size={20} />}
            color="green"
            title="提交成功"
            message="您的更改已成功保存到服务器。"
        />
    )
}
