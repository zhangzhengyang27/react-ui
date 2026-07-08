'use client'

import React, { useMemo, useState } from 'react'
import docgenData from '@/.docgen/docgen.json'

export interface DocgenProp {
    name: string
    type: string
    required: boolean
    defaultValue: string | null
    description: string
}

export interface Docgen {
    displayName: string
    description: string
    props: DocgenProp[]
    stylesNames: string[]
    cssVariables: Record<string, string[]>
    variants: string[]
    modifiers: string[]
}

const DATA: Record<string, Docgen> = docgenData as any

export interface ApiTableProps {
    component: string
}

export function ApiTable({ component }: ApiTableProps) {
    const doc = DATA[component]
    const [query, setQuery] = useState('')

    if (!doc) {
        return <div style={{ color: 'var(--nextra-secondary-color, #888)' }}>暂无 {component} 的 API 文档</div>
    }

    const filtered = useMemo(() => {
        const term = query.trim().toLowerCase()
        if (!term) return doc.props
        return doc.props.filter(
            prop =>
                prop.name.toLowerCase().includes(term) ||
                prop.type.toLowerCase().includes(term) ||
                prop.description.toLowerCase().includes(term)
        )
    }, [doc.props, query])

    return (
        <div>
            <div style={{ marginBottom: 12 }}>
                <input
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="搜索属性..."
                    style={{
                        width: '100%',
                        maxWidth: 320,
                        padding: '8px 12px',
                        borderRadius: 8,
                        border: '1px solid var(--nextra-border-color, #333)',
                        background: 'var(--nextra-bg, #111)',
                        color: 'var(--nextra-color, #fff)',
                        fontSize: 14,
                        outline: 'none'
                    }}
                />
            </div>

            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--nextra-border-color, #333)' }}>
                            <th style={{ textAlign: 'left', padding: '12px 8px', whiteSpace: 'nowrap' }}>属性</th>
                            <th style={{ textAlign: 'left', padding: '12px 8px' }}>类型</th>
                            <th style={{ textAlign: 'left', padding: '12px 8px', whiteSpace: 'nowrap' }}>默认值</th>
                            <th style={{ textAlign: 'left', padding: '12px 8px' }}>说明</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map(prop => (
                            <tr key={prop.name} style={{ borderBottom: '1px solid var(--nextra-border-color, #222)' }}>
                                <td style={{ padding: '12px 8px', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>
                                    {prop.name}
                                    {prop.required && <span style={{ color: '#ff6b6b', marginLeft: 4 }}>*</span>}
                                </td>
                                <td style={{ padding: '12px 8px', fontFamily: 'monospace' }}>{prop.type}</td>
                                <td style={{ padding: '12px 8px', fontFamily: 'monospace' }}>
                                    {prop.defaultValue || '-'}
                                </td>
                                <td style={{ padding: '12px 8px' }}>{prop.description || '-'}</td>
                            </tr>
                        ))}
                        {filtered.length === 0 && (
                            <tr>
                                <td colSpan={4} style={{ padding: 16, color: 'var(--nextra-secondary-color, #888)' }}>
                                    未找到匹配的属性
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
