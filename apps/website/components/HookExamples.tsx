'use client'

import React, { useState } from 'react'
import { Button, Group, Paper, Stack, Text } from '@react-ui/ui'
import {
    useClipboard,
    useClickOutside,
    useColorScheme,
    useCounter,
    useDisclosure,
    useMediaQuery
} from '@react-ui/hooks'

interface HookExampleProps {
    hook: string
}

function CounterExample() {
    const [count, handlers] = useCounter(0)
    return (
        <Group>
            <Button onClick={handlers.decrement}>-</Button>
            <Text style={{ minWidth: 40, textAlign: 'center', fontWeight: 600 }}>{count}</Text>
            <Button onClick={handlers.increment}>+</Button>
            <Button onClick={handlers.reset} variant="default">
                重置
            </Button>
        </Group>
    )
}

function DisclosureExample() {
    const [opened, { toggle }] = useDisclosure(false)
    return (
        <Stack>
            <Button onClick={toggle}>{opened ? '关闭' : '展开'}</Button>
            {opened && (
                <Paper withBorder style={{ padding: 16 }}>
                    这是由 useDisclosure 控制显示的内容
                </Paper>
            )}
        </Stack>
    )
}

function ClipboardExample() {
    const { copy, copied } = useClipboard({ timeout: 2000 })
    const [value, setValue] = useState('@react-ui/ui')
    return (
        <Group>
            <input
                value={value}
                onChange={e => setValue(e.target.value)}
                style={{
                    padding: '8px 12px',
                    borderRadius: 8,
                    border: '1px solid var(--nextra-border-color, #333)',
                    background: 'var(--nextra-bg, #111)',
                    color: 'var(--nextra-color, #fff)',
                    fontSize: 14,
                    minWidth: 160
                }}
            />
            <Button onClick={() => copy(value)} variant={copied ? 'default' : 'filled'}>
                {copied ? '已复制' : '复制'}
            </Button>
        </Group>
    )
}

function MediaQueryExample() {
    const matches = useMediaQuery('(max-width: 768px)')
    return (
        <Text>
            当前视口是否匹配 <code>(max-width: 768px)</code>：<strong>{matches ? '是' : '否'}</strong>
        </Text>
    )
}

function ColorSchemeExample() {
    const scheme = useColorScheme()
    return (
        <Text>
            系统颜色方案：<strong>{scheme}</strong>
        </Text>
    )
}

function ClickOutsideExample() {
    const [visible, setVisible] = useState(false)
    const ref = useClickOutside<HTMLDivElement>(() => setVisible(false))
    return (
        <Stack>
            <Button onClick={() => setVisible(v => !v)} variant="default">
                {visible ? '隐藏' : '显示'} 卡片
            </Button>
            {visible && (
                <div ref={ref}>
                    <Paper withBorder style={{ padding: 16 }}>
                        点击卡片外部即可关闭此提示
                    </Paper>
                </div>
            )}
        </Stack>
    )
}

export function HookExample({ hook }: HookExampleProps) {
    switch (hook) {
        case 'useCounter':
            return <CounterExample />
        case 'useDisclosure':
            return <DisclosureExample />
        case 'useClipboard':
            return <ClipboardExample />
        case 'useMediaQuery':
            return <MediaQueryExample />
        case 'useColorScheme':
            return <ColorSchemeExample />
        case 'useClickOutside':
            return <ClickOutsideExample />
        default:
            return (
                <Text style={{ color: 'var(--nextra-secondary-color, #888)' }}>
                    该 Hook 暂无可视化示例，请查看下方 API 表格。
                </Text>
            )
    }
}
