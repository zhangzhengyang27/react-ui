'use client'

import { ColorSwatch, Group } from '@react-ui/ui'

export default function ColorSwatchBasicDemo() {
    return (
        <Group gap="sm">
            <ColorSwatch color="#ff0000" />
            <ColorSwatch color="#00ff00" />
            <ColorSwatch color="#0000ff" />
            <ColorSwatch color="rgba(255, 165, 0, 0.5)" />
        </Group>
    )
}
