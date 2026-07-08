'use client'

import React from 'react'
import { Loader } from '@react-ui/ui'
import { Playground } from '@/components/Playground'
import { DemoControl } from '@/components/DemoControls'

const TYPES = ['oval', 'bars', 'dots']
const COLORS = ['blue', 'red', 'green', 'violet', 'orange', 'grape', 'cyan', 'teal']
const SIZES = ['xs', 'sm', 'md', 'lg', 'xl']

interface LoaderState {
    type: string
    color: string
    size: string
}

export default function LoaderPlayground() {
    return (
        <Playground<LoaderState>
            title="交互式 Playground"
            description="实时调整 Loader 的 type、color、size。"
            initial={{
                type: 'oval',
                color: 'blue',
                size: 'md'
            }}
            controls={(state, setState) => (
                <>
                    <DemoControl.Select
                        label="type"
                        value={state.type}
                        options={TYPES.map(value => ({ label: value, value }))}
                        onChange={value => setState(prev => ({ ...prev, type: value }))}
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
                </>
            )}
            renderPreview={state => <Loader type={state.type as any} color={state.color} size={state.size as any} />}
            renderCode={state =>
                `import { Loader } from '@react-ui/ui'

export default function Demo() {
    return <Loader type="${state.type}" color="${state.color}" size="${state.size}" />
}`
            }
        />
    )
}
