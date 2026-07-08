'use client'

import React from 'react'
import { Badge } from '@react-ui/ui'
import { Playground } from '@/components/Playground'
import { DemoControl } from '@/components/DemoControls'

const VARIANTS = ['filled', 'light', 'outline', 'dot', 'transparent', 'white', 'default', 'gradient']
const COLORS = ['blue', 'red', 'green', 'violet', 'orange', 'grape', 'cyan', 'teal']
const SIZES = ['xs', 'sm', 'md', 'lg', 'xl']
const RADII = ['xs', 'sm', 'md', 'lg', 'xl']

interface BadgeState {
    variant: string
    color: string
    size: string
    radius: string
}

export default function BadgePlayground() {
    return (
        <Playground<BadgeState>
            title="交互式 Playground"
            description="实时调整 Badge 的 variant、color、size、radius。"
            initial={{
                variant: 'filled',
                color: 'blue',
                size: 'md',
                radius: 'xl'
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
                </>
            )}
            renderPreview={state => (
                <Badge
                    variant={state.variant as any}
                    color={state.color}
                    size={state.size as any}
                    radius={state.radius as any}
                >
                    Badge
                </Badge>
            )}
            renderCode={state =>
                `import { Badge } from '@react-ui/ui'

export default function Demo() {
    return (
        <Badge
            variant="${state.variant}"
            color="${state.color}"
            size="${state.size}"
            radius="${state.radius}"
        >
            Badge
        </Badge>
    )
}`
            }
        />
    )
}
