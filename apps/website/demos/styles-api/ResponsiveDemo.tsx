'use client'

import React from 'react'
import { Paper, Text } from '@react-ui/ui'
import { useMediaQuery } from '@react-ui/hooks'

export default function ResponsiveDemo() {
    const isMd = useMediaQuery('(min-width: 62em)')
    const isSm = useMediaQuery('(min-width: 48em)')

    return (
        <div>
            <Paper
                withBorder
                style={{
                    padding: isMd ? 40 : isSm ? 24 : 12,
                    background: isMd
                        ? 'var(--ui-color-blue-0, #e7f5ff)'
                        : isSm
                          ? 'var(--ui-color-teal-0, #e6fcf5)'
                          : 'var(--ui-color-gray-0, #f8f9fa)',
                    transition: 'padding 0.2s ease, background 0.2s ease'
                }}
            >
                <Text>
                    当前视口状态：<strong>{isMd ? 'md 及以上' : isSm ? 'sm - md' : 'sm 以下'}</strong>
                </Text>
                <Text size="sm" style={{ color: 'var(--nextra-secondary-color, #888)', marginTop: 8 }}>
                    拖动浏览器窗口改变宽度，观察 padding 与背景色变化。
                </Text>
            </Paper>
        </div>
    )
}
