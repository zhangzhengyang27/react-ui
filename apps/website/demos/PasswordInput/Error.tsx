'use client'

import { PasswordInput, Stack } from '@react-ui/ui'

export default function PasswordInputErrorDemo() {
    return (
        <Stack>
            <PasswordInput label="密码" description="密码长度至少为 8 位" placeholder="请输入密码" withAsterisk />
            <PasswordInput label="密码" placeholder="请输入密码" error="密码不能为空" invalid />
        </Stack>
    )
}
