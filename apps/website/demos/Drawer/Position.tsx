'use client'

import { useState } from 'react'
import { Button, Drawer, Group } from '@react-ui/ui'

export default function DrawerPositionDemo() {
    const [opened, setOpened] = useState(false)
    const [position, setPosition] = useState<'left' | 'right' | 'top' | 'bottom'>('left')

    return (
        <>
            <Group>
                {(['left', 'right', 'top', 'bottom'] as const).map(pos => (
                    <Button
                        key={pos}
                        onClick={() => {
                            setPosition(pos)
                            setOpened(true)
                        }}
                    >
                        {pos}
                    </Button>
                ))}
            </Group>
            <Drawer opened={opened} onClose={() => setOpened(false)} position={position} title="位置示例">
                {position} 抽屉
            </Drawer>
        </>
    )
}
