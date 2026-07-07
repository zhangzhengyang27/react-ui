'use client'

import { Button, Group } from '@react-ui/ui'

const VARIANTS: Array<'default' | 'filled' | 'gradient' | 'light' | 'outline' | 'subtle' | 'transparent' | 'white'> = [
    'default',
    'filled',
    'gradient',
    'light',
    'outline',
    'subtle',
    'transparent',
    'white'
]

export default function ButtonVariantDemo() {
    return (
        <Group>
            {VARIANTS.map(variant => (
                <Button key={variant} variant={variant}>
                    {variant}
                </Button>
            ))}
        </Group>
    )
}
