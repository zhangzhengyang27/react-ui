'use client'

import { Alert } from '@react-ui/ui'

export default function AlertBasicDemo() {
    return (
        <Alert title="提示" withCloseButton>
            这是一条警告提示信息。
        </Alert>
    )
}
