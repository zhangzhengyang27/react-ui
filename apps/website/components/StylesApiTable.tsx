'use client'

import React, { useState } from 'react'
import docgenData from '@/.docgen/docgen.json'
import type { Docgen } from './ApiTable'

const DATA: Record<string, Docgen> = docgenData as any

export interface StylesApiTableProps {
    component: string
}

type TabKey = 'selectors' | 'variables' | 'variants' | 'modifiers'

export function StylesApiTable({ component }: StylesApiTableProps) {
    const doc = DATA[component]
    const [active, setActive] = useState<TabKey>('selectors')

    if (!doc) {
        return <div style={{ color: 'var(--nextra-secondary-color, #888)' }}>暂无 {component} 的 Styles API 文档</div>
    }

    const hasVariables = Object.keys(doc.cssVariables).length > 0
    const hasVariants = doc.variants.length > 0
    const hasModifiers = (doc.modifiers?.length ?? 0) > 0

    const tabs: { key: TabKey; label: string }[] = [{ key: 'selectors', label: 'Selectors' }]
    if (hasVariables) tabs.push({ key: 'variables', label: 'CSS variables' })
    if (hasVariants) tabs.push({ key: 'variants', label: 'Variants' })
    if (hasModifiers) tabs.push({ key: 'modifiers', label: 'Modifiers' })

    return (
        <div style={{ marginTop: 16 }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
                {tabs.map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => setActive(tab.key)}
                        style={{
                            padding: '6px 14px',
                            borderRadius: 999,
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: 14,
                            background: active === tab.key ? 'var(--nextra-primary-color, #0070f3)' : 'transparent',
                            color: active === tab.key ? '#fff' : 'var(--nextra-color, #fff)',
                            boxShadow: active === tab.key ? 'none' : 'inset 0 0 0 1px var(--nextra-border-color, #333)'
                        }}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {active === 'selectors' && (
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--nextra-border-color, #333)' }}>
                                <th style={{ textAlign: 'left', padding: '12px 8px' }}>Selector</th>
                                <th style={{ textAlign: 'left', padding: '12px 8px' }}>说明</th>
                            </tr>
                        </thead>
                        <tbody>
                            {doc.stylesNames.map(name => (
                                <tr key={name} style={{ borderBottom: '1px solid var(--nextra-border-color, #222)' }}>
                                    <td style={{ padding: '12px 8px', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>
                                        {name}
                                    </td>
                                    <td style={{ padding: '12px 8px', color: 'var(--nextra-secondary-color, #888)' }}>
                                        对应 {component} 组件的 <code>{name}</code> 元素
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {active === 'variables' && hasVariables && (
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--nextra-border-color, #333)' }}>
                                <th style={{ textAlign: 'left', padding: '12px 8px' }}>元素</th>
                                <th style={{ textAlign: 'left', padding: '12px 8px' }}>CSS 变量</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(doc.cssVariables).map(([element, vars]) =>
                                vars.map((variable, index) => (
                                    <tr
                                        key={`${element}-${variable}`}
                                        style={{ borderBottom: '1px solid var(--nextra-border-color, #222)' }}
                                    >
                                        {index === 0 && (
                                            <td
                                                rowSpan={vars.length}
                                                style={{
                                                    padding: '12px 8px',
                                                    fontFamily: 'monospace',
                                                    whiteSpace: 'nowrap',
                                                    verticalAlign: 'top'
                                                }}
                                            >
                                                {element}
                                            </td>
                                        )}
                                        <td style={{ padding: '12px 8px', fontFamily: 'monospace' }}>{variable}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {active === 'variants' && hasVariants && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {doc.variants.map(variant => (
                        <code
                            key={variant}
                            style={{
                                padding: '6px 12px',
                                borderRadius: 6,
                                background: 'var(--nextra-bg, #111)',
                                border: '1px solid var(--nextra-border-color, #333)',
                                fontSize: 13
                            }}
                        >
                            {variant}
                        </code>
                    ))}
                </div>
            )}

            {active === 'modifiers' && hasModifiers && (
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--nextra-border-color, #333)' }}>
                                <th style={{ textAlign: 'left', padding: '12px 8px' }}>Attribute</th>
                                <th style={{ textAlign: 'left', padding: '12px 8px' }}>CSS 选择器示例</th>
                            </tr>
                        </thead>
                        <tbody>
                            {doc.modifiers.map(modifier => (
                                <tr
                                    key={modifier}
                                    style={{ borderBottom: '1px solid var(--nextra-border-color, #222)' }}
                                >
                                    <td style={{ padding: '12px 8px', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>
                                        {modifier}
                                    </td>
                                    <td style={{ padding: '12px 8px', fontFamily: 'monospace', fontSize: 13 }}>
                                        <code>{`.${component}-root[${modifier}]`}</code>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}
