'use client'

import { useState } from 'react'
import { Button, LoadingOverlay, Paper, Text } from '@react-ui/ui'

export default function LoadingOverlayBasicDemo() {
    const [visible, setVisible] = useState(false)

    return (
        <>
            <Button onClick={() => setVisible(v => !v)} mb="md">
                {visible ? '隐藏遮罩' : '显示遮罩'}
            </Button>

            <LoadingOverlay visible={visible} style={{ minHeight: 120 }}>
                <Paper withBorder p="md" shadow="sm">
                    <Text>包裹的内容会在遮罩显示时被覆盖。</Text>
                </Paper>
            </LoadingOverlay>
        </>
    )
}
