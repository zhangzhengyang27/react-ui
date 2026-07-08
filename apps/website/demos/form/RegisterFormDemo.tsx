'use client'

import React from 'react'
import { Button, Group, Stack, Text } from '@react-ui/ui'

export default function RegisterFormDemo() {
    return (
        <form style={{ maxWidth: 400 }}>
            <Stack>
                <div>
                    <Text size="sm" style={{ marginBottom: 4 }}>
                        用户名
                    </Text>
                    <input
                        name="username"
                        placeholder="请输入用户名"
                        style={{
                            width: '100%',
                            padding: '8px 12px',
                            borderRadius: 8,
                            border: '1px solid var(--nextra-border-color, #333)',
                            background: 'var(--nextra-bg, #111)',
                            color: 'var(--nextra-color, #fff)'
                        }}
                    />
                </div>
                <div>
                    <Text size="sm" style={{ marginBottom: 4 }}>
                        邮箱
                    </Text>
                    <input
                        name="email"
                        type="email"
                        placeholder="name@example.com"
                        style={{
                            width: '100%',
                            padding: '8px 12px',
                            borderRadius: 8,
                            border: '1px solid var(--nextra-border-color, #333)',
                            background: 'var(--nextra-bg, #111)',
                            color: 'var(--nextra-color, #fff)'
                        }}
                    />
                </div>
                <Group>
                    <Button type="submit">提交</Button>
                    <Button type="reset" variant="default">
                        重置
                    </Button>
                </Group>
            </Stack>
        </form>
    )
}
