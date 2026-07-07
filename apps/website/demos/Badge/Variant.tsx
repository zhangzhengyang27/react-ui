'use client'

import { Badge, Group } from '@react-ui/ui'

export default function BadgeVariantDemo() {
    return (
        <Group>
            <Badge variant="light">light</Badge>
            <Badge variant="filled">filled</Badge>
            <Badge variant="outline">outline</Badge>
            <Badge variant="dot">dot</Badge>
        </Group>
    )
}
