'use client'

import React from 'react'
import { Alert } from '@react-ui/ui'
import { Playground } from '@/components/Playground'
import { DemoControl } from '@/components/DemoControls'
import { quote } from '@/lib/quote'

const VARIANTS = ['default', 'filled', 'light', 'outline', 'transparent', 'white'] as const
const COLORS = ['blue', 'red', 'green', 'violet', 'orange', 'grape', 'cyan', 'teal'] as const

type AlertVariant = (typeof VARIANTS)[number]
type AlertColor = (typeof COLORS)[number]

interface AlertState {
    variant: AlertVariant
    color: AlertColor
    withCloseButton: boolean
}

export default function AlertInteractiveDemo() {
    return (
        <Playground<AlertState>
            title="交互式示例"
            description="实时切换 Alert 的 variant、color 和关闭按钮。"
            initial={{
                variant: 'default',
                color: 'blue',
                withCloseButton: true
            }}
            controls={(state, setState) => (
                <>
                    <DemoControl.Segmented
                        label="variant"
                        value={state.variant}
                        options={VARIANTS.map(value => ({ label: value, value }))}
                        onChange={value => setState(prev => ({ ...prev, variant: value as AlertVariant }))}
                    />
                    <DemoControl.Select
                        label="color"
                        value={state.color}
                        options={COLORS.map(value => ({ label: value, value }))}
                        onChange={value => setState(prev => ({ ...prev, color: value as AlertColor }))}
                    />
                    <DemoControl.Boolean
                        label="withCloseButton"
                        checked={state.withCloseButton}
                        onChange={checked => setState(prev => ({ ...prev, withCloseButton: checked }))}
                    />
                </>
            )}
            renderPreview={state => (
                <Alert title="提示" variant={state.variant} color={state.color} withCloseButton={state.withCloseButton}>
                    这是一条可交互的警告提示信息。
                </Alert>
            )}
            renderCode={state =>
                `import { Alert } from '@react-ui/ui'

export default function Demo() {
    return (
        <Alert
            title="提示"
            variant=${quote(state.variant)}
            color=${quote(state.color)}${state.withCloseButton ? '\n            withCloseButton' : ''}
        >
            这是一条可交互的警告提示信息。
        </Alert>
    )
}`
            }
        />
    )
}
