'use client'

import { Button, Tooltip } from '@react-ui/ui'

export default function TooltipBasicDemo() {
    return (
        <Tooltip label="这是一个提示">
            <Button>悬停查看提示</Button>
        </Tooltip>
    )
}
