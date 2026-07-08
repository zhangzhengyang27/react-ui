'use client'

import { Button, Popover, Text } from '@react-ui/ui'

export default function PopoverBasicDemo() {
    return (
        <Popover width={200} position="bottom" withArrow shadow="md">
            <Popover.Target>
                <Button>打开 Popover</Button>
            </Popover.Target>
            <Popover.Dropdown>
                <Text size="sm">Popover 是一种轻量的弹出层组件。</Text>
            </Popover.Dropdown>
        </Popover>
    )
}
