'use client'

import { Paper } from '@react-ui/ui'

export default function PaperBasicDemo() {
    return (
        <Paper shadow="sm" radius="md" withBorder style={{ padding: 24 }}>
            Paper 内容区域
        </Paper>
    )
}
