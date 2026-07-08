'use client'

import { useState } from 'react'
import { Button, Drawer } from '@react-ui/ui'

export default function DrawerBasicDemo() {
    const [opened, setOpened] = useState(false)

    return (
        <>
            <Button onClick={() => setOpened(true)}>打开抽屉</Button>
            <Drawer opened={opened} onClose={() => setOpened(false)} title="抽屉标题">
                抽屉内容
            </Drawer>
        </>
    )
}
