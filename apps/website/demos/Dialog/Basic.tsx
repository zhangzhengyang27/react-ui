'use client'

import { useState } from 'react'
import { Dialog, Button, Text } from '@react-ui/ui'

export default function DialogBasicDemo() {
    const [opened, setOpened] = useState(false)

    return (
        <>
            <Button onClick={() => setOpened(true)}>打开对话框</Button>
            <Dialog opened={opened} onClose={() => setOpened(false)} title="确认删除">
                <Text>确定要删除这条记录吗？删除后无法恢复。</Text>
            </Dialog>
        </>
    )
}
