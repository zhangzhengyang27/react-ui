'use client'

import React from 'react'
import { Paper } from '@react-ui/ui'
import { Playground } from '@/components/Playground'
import { DemoControl } from '@/components/DemoControls'
import { quote } from '@/lib/quote'

const SHADOWS = ['xs', 'sm', 'md', 'lg', 'xl'] as const
const RADII = ['xs', 'sm', 'md', 'lg', 'xl'] as const

type PaperShadow = (typeof SHADOWS)[number]
type PaperRadius = (typeof RADII)[number]

interface PaperState {
    shadow: PaperShadow
    radius: PaperRadius
    withBorder: boolean
}

export default function PaperInteractiveDemo() {
    return (
        <Playground<PaperState>
            title="交互式示例"
            description="实时调整 Paper 的 shadow、radius 和边框。"
            initial={{
                shadow: 'md',
                radius: 'md',
                withBorder: true
            }}
            controls={(state, setState) => (
                <>
                    <DemoControl.Segmented
                        label="shadow"
                        value={state.shadow}
                        options={SHADOWS.map(value => ({ label: value, value }))}
                        onChange={value => setState(prev => ({ ...prev, shadow: value as PaperShadow }))}
                    />
                    <DemoControl.Segmented
                        label="radius"
                        value={state.radius}
                        options={RADII.map(value => ({ label: value, value }))}
                        onChange={value => setState(prev => ({ ...prev, radius: value as PaperRadius }))}
                    />
                    <DemoControl.Boolean
                        label="withBorder"
                        checked={state.withBorder}
                        onChange={checked => setState(prev => ({ ...prev, withBorder: checked }))}
                    />
                </>
            )}
            renderPreview={state => (
                <Paper
                    shadow={state.shadow}
                    radius={state.radius}
                    withBorder={state.withBorder}
                    style={{ padding: 24, maxWidth: 400 }}
                >
                    Paper 内容区域
                </Paper>
            )}
            renderCode={state =>
                `import { Paper } from '@react-ui/ui'

export default function Demo() {
    return (
        <Paper
            shadow=${quote(state.shadow)}
            radius=${quote(state.radius)}${state.withBorder ? '\n            withBorder' : ''}
            style={{ padding: 24 }}
        >
            Paper 内容区域
        </Paper>
    )
}`
            }
        />
    )
}
