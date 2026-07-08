'use client'

import React, { useState } from 'react'
import { Button, Provider } from '@react-ui/ui'
import { DemoControl } from '@/components/DemoControls'

const VARIANTS = ['filled', 'outline', 'light', 'subtle', 'default']
const SIZES = ['xs', 'sm', 'md', 'lg', 'xl']
const RADII = ['xs', 'sm', 'md', 'lg', 'xl']

export default function DefaultPropsDemo() {
    const [variant, setVariant] = useState('filled')
    const [size, setSize] = useState('md')
    const [radius, setRadius] = useState('md')

    const theme = {
        components: {
            Button: {
                defaultProps: {
                    variant,
                    size,
                    radius
                }
            }
        }
    }

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
                    onChange={setVariant}
                />
                <DemoControl.Select
                    label="size"
                    value={size}
                    options={SIZES.map(value => ({ label: value, value }))}
                    onChange={setSize}
                />
                <DemoControl.Select
                    label="radius"
                    value={radius}
                    options={RADII.map(value => ({ label: value, value }))}
                    onChange={setRadius}
                />
            </div>
            <Provider theme={theme}>
                <Button>全局默认属性生效</Button>
            </Provider>
        </div>
    )
}
