'use client'

import React from 'react'
import { Text } from '@react-ui/ui'
import { Playground } from '@/components/Playground'
import { DemoControl } from '@/components/DemoControls'

const VARIANTS = ['text', 'gradient']
const SIZES = ['xs', 'sm', 'md', 'lg', 'xl']

interface TextState {
    variant: string
    size: string
    lineClamp: number
    truncate: boolean
}

export default function TextPlayground() {
    return (
        <Playground<TextState>
            title="交互式 Playground"
            description="实时调整 Text 的 variant、size、lineClamp、truncate。"
            initial={{
                variant: 'text',
                size: 'md',
                lineClamp: 0,
                truncate: false
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
                        label="size"
                        value={state.size}
                        options={SIZES.map(value => ({ label: value, value }))}
                        onChange={value => setState(prev => ({ ...prev, size: value }))}
                    />
                    <DemoControl.Slider
                        label="lineClamp"
                        value={state.lineClamp}
                        min={0}
                        max={5}
                        step={1}
                        onChange={value => setState(prev => ({ ...prev, lineClamp: value }))}
                    />
                    <DemoControl.Boolean
                        label="truncate"
                        checked={state.truncate}
                        onChange={checked => setState(prev => ({ ...prev, truncate: checked }))}
                    />
                </>
            )}
            renderPreview={state => (
                <Text
                    variant={state.variant as any}
                    size={state.size as any}
                    lineClamp={state.lineClamp > 0 ? state.lineClamp : undefined}
                    truncate={state.truncate}
                    style={{ maxWidth: 400 }}
                >
                    @react-ui/ui 是一个基于 React 19 + TypeScript 的组件库，借鉴 Mantine 架构，提供主题、Styles API
                    与丰富的可组合组件。
                </Text>
            )}
            renderCode={state =>
                `import { Text } from '@react-ui/ui'

export default function Demo() {
    return (
        <Text
            variant="${state.variant}"
            size="${state.size}"${state.lineClamp > 0 ? `\n            lineClamp={${state.lineClamp}}` : ''}${state.truncate ? '\n            truncate' : ''}
            style={{ maxWidth: 400 }}
        >
            @react-ui/ui 是一个基于 React 19 + TypeScript 的组件库...
        </Text>
    )
}`
            }
        />
    )
}
