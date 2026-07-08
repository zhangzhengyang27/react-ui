'use client'

import { Anchor, HoverCard, Text } from '@react-ui/ui'

export default function HoverCardBasicDemo() {
    return (
        <HoverCard width={280} shadow="md">
            <HoverCard.Target>
                <Anchor href="#">悬停目标</Anchor>
            </HoverCard.Target>
            <HoverCard.Dropdown>
                <Text size="sm">HoverCard 是一种悬停时显示额外信息的组件。</Text>
            </HoverCard.Dropdown>
        </HoverCard>
    )
}
