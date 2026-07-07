import React from 'react'
import { Button } from '@react-ui/ui'

const variants = ['default', 'filled', 'gradient', 'light', 'outline', 'subtle', 'transparent', 'white'] as const

const ButtonDemo: React.FC = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {variants.map(v => (
                    <Button key={v} variant={v}>
                        {v}
                    </Button>
                ))}
            </div>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                <Button color="red">red</Button>
                <Button color="blue" variant="filled">
                    blue filled
                </Button>
                <Button color="green" variant="light">
                    green light
                </Button>
                <Button size="xs">xs</Button>
                <Button size="lg">lg</Button>
                <Button loading>loading</Button>
                <Button disabled>disabled</Button>
            </div>

            <Button fullWidth>full width</Button>
        </div>
    )
}

export default ButtonDemo
