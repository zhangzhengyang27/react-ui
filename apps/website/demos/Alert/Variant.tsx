'use client'

import { Alert, Stack } from '@react-ui/ui'

export default function AlertVariantDemo() {
    return (
        <Stack>
            <Alert title="默认">默认变体</Alert>
            <Alert title="填充" variant="filled" color="blue">
                填充变体
            </Alert>
            <Alert title="浅色" variant="light" color="green">
                浅色变体
            </Alert>
            <Alert title="轮廓" variant="outline" color="red">
                轮廓变体
            </Alert>
        </Stack>
    )
}
