'use client'

import { Card, Text, Button } from '@react-ui/ui'

export default function CardBasicDemo() {
    return (
        <Card shadow="sm" radius="md" withBorder style={{ maxWidth: 320 }}>
            <Text size="lg" style={{ fontWeight: 500 }}>
                卡片标题
            </Text>
            <Text size="sm" style={{ marginTop: 8, color: 'var(--ui-color-gray-6)' }}>
                这是 Card 组件的基础使用示例，包含标题、描述和操作按钮。
            </Text>
            <Button fullWidth style={{ marginTop: 16 }}>
                确认
            </Button>
        </Card>
    )
}
