'use client'

import { Card, Text, Button } from '@react-ui/ui'

export default function CardSectionDemo() {
    return (
        <Card shadow="sm" radius="md" withBorder style={{ maxWidth: 320 }}>
            <Card.Section withBorder inheritPadding>
                <Text size="lg" style={{ fontWeight: 500 }}>
                    Card.Section 标题
                </Text>
            </Card.Section>

            <Text size="sm" style={{ marginTop: 16, marginBottom: 16, color: 'var(--ui-color-gray-6)' }}>
                使用 Card.Section 可以将内容分区，配合 withBorder 可在分区之间显示分隔线。
            </Text>

            <Card.Section withBorder inheritPadding>
                <Button fullWidth variant="light">
                    操作按钮
                </Button>
            </Card.Section>
        </Card>
    )
}
