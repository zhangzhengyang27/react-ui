'use client'

import { Stack, TextInput } from '@react-ui/ui'

export default function TextInputLabelDemo() {
    return (
        <Stack>
            <TextInput label="用户名" description="请输入您的用户名" placeholder="用户名" />
            <TextInput
                label="邮箱"
                description="用于接收通知"
                error="邮箱格式不正确"
                placeholder="example@mail.com"
                withAsterisk
            />
        </Stack>
    )
}
