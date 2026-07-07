'use client'

import { useState } from 'react'
import { Button, Collapse } from '@react-ui/ui'

export default function CollapseBasicDemo() {
    const [opened, setOpened] = useState(false)
    return (
        <>
            <Button onClick={() => setOpened(o => !o)}>切换展开</Button>
            <Collapse expanded={opened} style={{ marginTop: 12 }}>
                <div style={{ padding: 20, background: 'var(--nextra-bg-color, #222)', borderRadius: 8 }}>
                    这是折叠容器内的内容。
                </div>
            </Collapse>
        </>
    )
}
