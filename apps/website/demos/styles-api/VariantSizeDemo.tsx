'use client'

import React, { useState } from 'react'
import { Button } from '@react-ui/ui'
import { DemoControl } from '@/components/DemoControls'

const VARIANTS = ['default', 'filled', 'light', 'outline', 'subtle', 'transparent', 'white']
const SIZES = ['xs', 'sm', 'md', 'lg', 'xl']
const RADII = ['xs', 'sm', 'md', 'lg', 'xl']

export default function VariantSizeDemo() {
    const [variant, setVariant] = useState<
        'default' | 'filled' | 'light' | 'outline' | 'subtle' | 'transparent' | 'white'
    >('filled')
    const [size, setSize] = useState<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md')
    const [radius, setRadius] = useState<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md')

    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: '12px 20px',
                    marginBottom: 16
                }}
            >
                <DemoControl.Select
                    label="variant"
                    value={variant}
                    options={VARIANTS.map(value => ({ label: value, value }))}
                    onChange={value => setVariant(value as typeof variant)}
                />
                <DemoControl.Select
                    label="size"
                    value={size}
                    options={SIZES.map(value => ({ label: value, value }))}
                    onChange={value => setSize(value as typeof size)}
                />
                <DemoControl.Select
                    label="radius"
                    value={radius}
                    options={RADII.map(value => ({ label: value, value }))}
                    onChange={value => setRadius(value as typeof radius)}
                />
            </div>
            <Button variant={variant} size={size} radius={radius}>
                {variant} · {size} · {radius}
            </Button>
        </div>
    )
}
