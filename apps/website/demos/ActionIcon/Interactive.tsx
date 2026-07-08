'use client'

import React from 'react'
import { ActionIcon } from '@react-ui/ui'
import { Settings } from 'lucide-react'
import { Playground } from '@/components/Playground'
import { DemoControl } from '@/components/DemoControls'
import { quote } from '@/lib/quote'

const VARIANTS = ['filled', 'light', 'outline', 'transparent', 'white', 'subtle', 'default', 'gradient'] as const
const COLORS = ['blue', 'red', 'green', 'violet', 'orange', 'grape', 'cyan', 'teal'] as const
const SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const
const RADII = ['xs', 'sm', 'md', 'lg', 'xl'] as const

type ActionIconVariant = (typeof VARIANTS)[number]
type ActionIconColor = (typeof COLORS)[number]
type ActionIconSize = (typeof SIZES)[number]
type ActionIconRadius = (typeof RADII)[number]

interface ActionIconState {
    variant: ActionIconVariant
    color: ActionIconColor
    size: ActionIconSize
    radius: ActionIconRadius
}

export default function ActionIconInteractiveDemo() {
    return (
        <Playground<ActionIconState>
            title="交互式示例"
            description="实时调整 ActionIcon 的 variant、color、size 和 radius。"
            initial={{
                variant: 'filled',
                color: 'blue',
                size: 'lg',
                radius: 'md'
            }}
            controls={(state, setState) => (
                <>
                    <DemoControl.Segmented
                        label="variant"
                        value={state.variant}
                        options={VARIANTS.map(value => ({ label: value, value }))}
                        onChange={value => setState(prev => ({ ...prev, variant: value as ActionIconVariant }))}
                    />
                    <DemoControl.Select
                        label="color"
                        value={state.color}
                        options={COLORS.map(value => ({ label: value, value }))}
                        onChange={value => setState(prev => ({ ...prev, color: value as ActionIconColor }))}
                    />
                    <DemoControl.Select
                        label="size"
                        value={state.size}
                        options={SIZES.map(value => ({ label: value, value }))}
                        onChange={value => setState(prev => ({ ...prev, size: value as ActionIconSize }))}
                    />
                    <DemoControl.Select
                        label="radius"
                        value={state.radius}
                        options={RADII.map(value => ({ label: value, value }))}
                        onChange={value => setState(prev => ({ ...prev, radius: value as ActionIconRadius }))}
                    />
                </>
            )}
            renderPreview={state => (
                <ActionIcon variant={state.variant} color={state.color} size={state.size} radius={state.radius}>
                    <Settings size={20} />
                </ActionIcon>
            )}
            renderCode={state =>
                `import { ActionIcon } from '@react-ui/ui'
import { Settings } from 'lucide-react'

export default function Demo() {
    return (
        <ActionIcon
            variant=${quote(state.variant)}
            color=${quote(state.color)}
            size=${quote(state.size)}
            radius=${quote(state.radius)}
        >
            <Settings size={20} />
        </ActionIcon>
    )
}`
            }
        />
    )
}
