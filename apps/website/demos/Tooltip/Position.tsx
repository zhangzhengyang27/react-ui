'use client'

import { Button, Group, Tooltip } from '@react-ui/ui'

export default function TooltipPositionDemo() {
    return (
        <Group>
            <Tooltip label="上方" position="top">
                <Button>top</Button>
            </Tooltip>
            <Tooltip label="右侧" position="right">
                <Button>right</Button>
            </Tooltip>
            <Tooltip label="下方" position="bottom">
                <Button>bottom</Button>
            </Tooltip>
            <Tooltip label="左侧" position="left">
                <Button>left</Button>
            </Tooltip>
        </Group>
    )
}
