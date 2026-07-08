'use client'

import React from 'react'
import { Button } from '@react-ui/ui'
import { Playground } from '@/components/Playground'
import { DemoControl } from '@/components/DemoControls'

const VARIANTS = ['default', 'filled', 'light', 'outline', 'subtle', 'transparent', 'white', 'gradient']
const COLORS = ['blue', 'red', 'green', 'violet', 'orange', 'grape', 'cyan', 'teal']
const SIZES = ['xs', 'sm', 'md', 'lg', 'xl']
const RADII = ['xs', 'sm', 'md', 'lg', 'xl']

interface ButtonState {
    variant: string
    color: string
    size: string
    radius: string
    disabled: boolean
    loading: boolean
}

export default function ButtonPlayground() {
    return (
        <Playground<ButtonState>
            title="交互式 Playground"
            description="实时调整 Button 的 props 并查看对应代码。"
            initial={{
                variant: 'filled',
                color: 'blue',
                size: 'md',
                radius: 'md',
                disabled: false,
                loading: false
            }}
            controls={(state, setState) => (
                <>
                    <DemoControl.Select
                        label="variant"
                        value={state.variant}
                        options={VARIANTS.map(value => ({ label: value, value }))}
                        onChange={value => setState(prev => ({ ...prev, variant: value }))}
                    />
                    <DemoControl.Select
                        label="color"
                        value={state.color}
                        options={COLORS.map(value => ({ label: value, value }))}
                        onChange={value => setState(prev => ({ ...prev, color: value }))}
                    />
                    <DemoControl.Select
                        label="size"
                        value={state.size}
                        options={SIZES.map(value => ({ label: value, value }))}
                        onChange={value => setState(prev => ({ ...prev, size: value }))}
                    />
                    <DemoControl.Select
                        label="radius"
                        value={state.radius}
                        options={RADII.map(value => ({ label: value, value }))}
                        onChange={value => setState(prev => ({ ...prev, radius: value }))}
                    />
                    <DemoControl.Boolean
                        label="disabled"
                        checked={state.disabled}
                        onChange={checked => setState(prev => ({ ...prev, disabled: checked }))}
                    />
                    <DemoControl.Boolean
                        label="loading"
                        checked={state.loading}
                        onChange={checked => setState(prev => ({ ...prev, loading: checked }))}
                    />
                </>
            )}
            renderPreview={state => (
                <Button
                    variant={state.variant as any}
                    color={state.color}
                    size={state.size as any}
                    radius={state.radius as any}
                    disabled={state.disabled}
                    loading={state.loading}
                >
                    Button
                </Button>
            )}
            renderCode={state =>
                `import { Button } from '@react-ui/ui'

export default function Demo() {
    return (
        <Button
            variant="${state.variant}"
            color="${state.color}"
            size="${state.size}"
            radius="${state.radius}"${state.disabled ? '\n            disabled' : ''}${state.loading ? '\n            loading' : ''}
        >
            Button
        </Button>
    )
}`
            }
        />
    )
}
