'use client'

import { useState } from 'react'
import { Button, Modal } from '@react-ui/ui'

export default function ModalBasicDemo() {
    const [opened, setOpened] = useState(false)

    return (
        <>
            <Button onClick={() => setOpened(true)}>打开模态框</Button>
            <Modal opened={opened} onClose={() => setOpened(false)} title="模态框标题">
                模态框内容
            </Modal>
        </>
    )
}
