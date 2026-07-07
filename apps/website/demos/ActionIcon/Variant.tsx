'use client'

import { ActionIcon, Group } from '@react-ui/ui'
import { Settings } from 'lucide-react'

const VARIANTS: Array<'filled' | 'light' | 'outline' | 'transparent' | 'white' | 'subtle' | 'default' | 'gradient'> = [
    'filled',
    'light',
    'outline',
    'transparent',
    'white',
    'subtle',
    'default',
    'gradient'
]

export default function ActionIconVariantDemo() {
    return (
        <Group>
            {VARIANTS.map(variant => (
                <ActionIcon key={variant} variant={variant} color="blue">
                    <Settings size={18} />
                </ActionIcon>
            ))}
        </Group>
    )
}
