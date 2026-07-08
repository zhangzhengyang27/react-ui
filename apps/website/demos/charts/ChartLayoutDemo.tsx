'use client'

import React from 'react'
import { Paper, Stack, Text } from '@react-ui/ui'

const DATA = [
    { label: '周一', value: 40 },
    { label: '周二', value: 70 },
    { label: '周三', value: 55 },
    { label: '周四', value: 90 },
    { label: '周五', value: 65 }
]

export default function ChartLayoutDemo() {
    return (
        <Paper withBorder style={{ padding: 24, width: '100%', maxWidth: 480 }}>
            <Stack>
                <Text size="lg" style={{ fontWeight: 600 }}>
                    本周访问趋势
                </Text>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 160 }}>
                    {DATA.map(item => (
                        <div key={item.label} style={{ flex: 1, textAlign: 'center' }}>
                            <div
                                style={{
                                    height: `${item.value * 1.5}px`,
                                    background: 'var(--nextra-primary-color, #0070f3)',
                                    borderRadius: 4
                                }}
                            />
                            <Text size="xs" style={{ marginTop: 8 }}>
                                {item.label}
                            </Text>
                        </div>
                    ))}
                </div>
            </Stack>
        </Paper>
    )
}
