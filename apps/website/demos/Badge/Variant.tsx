import React from 'react'
import { Badge, Group } from '@react-ui/ui'

const Variant: React.FC = () => {
    return (
        <Group>
            <Badge variant="light">light</Badge>
            <Badge variant="filled">filled</Badge>
            <Badge variant="outline">outline</Badge>
            <Badge variant="dot">dot</Badge>
        </Group>
    )
}

export default Variant
