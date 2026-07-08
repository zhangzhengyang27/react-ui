'use client'

import React from 'react'
import { Button, Group } from '@react-ui/ui'
import { Playground } from '@/components/Playground'
import { DemoControl } from '@/components/DemoControls'

interface GroupState {
    gap: number
}

export default function GroupInteractiveDemo() {
    return (
        <Playground<GroupState>
            title="交互式示例"
            description="使用滑块实时调整 Group 的 gap。"
            initial={{ gap: 16 }}
            controls={(state, setState) => (
                <DemoControl.Slider
                    label="gap"
                    value={state.gap}
                    min={0}
                    max={48}
                    step={4}
                    onChange={value => setState({ gap: value })}
                />
            )}
            renderPreview={state => (
                <Group gap={state.gap}>
                    <Button>第一个</Button>
                    <Button>第二个</Button>
                    <Button>第三个</Button>
                </Group>
            )}
            renderCode={state =>
                `import { Button, Group } from '@react-ui/ui'

export default function Demo() {
    return (
        <Group gap={${state.gap}}>
            <Button>第一个</Button>
            <Button>第二个</Button>
            <Button>第三个</Button>
        </Group>
    )
}`
            }
        />
    )
}
