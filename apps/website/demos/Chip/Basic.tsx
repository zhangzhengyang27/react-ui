'use client'

import { Chip } from '@react-ui/ui'

export default function ChipBasicDemo() {
    return (
        <div style={{ display: 'flex', gap: 8 }}>
            <Chip defaultChecked>React</Chip>
            <Chip>Vue</Chip>
            <Chip variant="outline">Angular</Chip>
        </div>
    )
}
