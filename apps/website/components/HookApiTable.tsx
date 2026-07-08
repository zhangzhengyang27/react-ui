'use client'

import React, { useMemo, useState } from 'react'
import hooksData from '@/.docgen/hooks.json'

export interface HookParamDoc {
    name: string
    type: string
    required: boolean
    defaultValue: string | null
    description: string
}

export interface HookDoc {
    name: string
    description: string
    params: HookParamDoc[]
    returns: {
        type: string
        description: string
    }
}

const DATA: Record<string, HookDoc> = hooksData as Record<string, HookDoc>

export interface HookApiTableProps {
    hook: string
}

export function HookApiTable({ hook }: HookApiTableProps) {
    const doc = DATA[hook]
    const [query, setQuery] = useState('')

    if (!doc) {
        return <div style={{ color: 'var(--nextra-secondary-color, #888)' }}>暂无 {hook} 的文档</div>
    }

    const filtered = useMemo(() => {
        const term = query.trim().toLowerCase()
        if (!term) return doc.params
        return doc.params.filter(
            param =>
                param.name.toLowerCase().includes(term) ||
                param.type.toLowerCase().includes(term) ||
                param.description.toLowerCase().includes(term)
        )
    }, [doc.params, query])

    return (
        <div style={{ marginTop: 16 }}>
            <div style={{ marginBottom: 12 }}>
                <input
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="搜索参数..."
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
            <div style={{ overflow: 'auto' }}>
                <table
                    style={{
                        width: '100%',
                        borderCollapse: 'collapse',
                        fontSize: 14,
                        border: '1px solid var(--nextra-border-color, #333)'
                    }}
                >
                    <thead>
                        <tr style={{ background: 'var(--nextra-bg, #111)' }}>
                            <th
                                style={{
                                    textAlign: 'left',
                                    padding: '10px 12px',
                                    borderBottom: '1px solid var(--nextra-border-color, #333)'
                                }}
                            >
                                参数
                            </th>
                            <th
                                style={{
                                    textAlign: 'left',
                                    padding: '10px 12px',
                                    borderBottom: '1px solid var(--nextra-border-color, #333)'
                                }}
                            >
                                类型
                            </th>
                            <th
                                style={{
                                    textAlign: 'left',
                                    padding: '10px 12px',
                                    borderBottom: '1px solid var(--nextra-border-color, #333)'
                                }}
                            >
                                默认值
                            </th>
                            <th
                                style={{
                                    textAlign: 'left',
                                    padding: '10px 12px',
                                    borderBottom: '1px solid var(--nextra-border-color, #333)'
                                }}
                            >
                                说明
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map(param => (
                            <tr key={param.name}>
                                <td
                                    style={{
                                        padding: '10px 12px',
                                        borderBottom: '1px solid var(--nextra-border-color, #333)',
                                        fontWeight: 500,
                                        whiteSpace: 'nowrap'
                                    }}
                                >
                                    {param.name}
                                    {param.required && <span style={{ color: '#ff6b6b', marginLeft: 4 }}>*</span>}
                                </td>
                                <td
                                    style={{
                                        padding: '10px 12px',
                                        borderBottom: '1px solid var(--nextra-border-color, #333)',
                                        color: 'var(--nextra-secondary-color, #888)',
                                        fontFamily: 'monospace',
                                        fontSize: 12
                                    }}
                                >
                                    {param.type}
                                </td>
                                <td
                                    style={{
                                        padding: '10px 12px',
                                        borderBottom: '1px solid var(--nextra-border-color, #333)',
                                        color: 'var(--nextra-secondary-color, #888)'
                                    }}
                                >
                                    {param.defaultValue ?? '-'}
                                </td>
                                <td
                                    style={{
                                        padding: '10px 12px',
                                        borderBottom: '1px solid var(--nextra-border-color, #333)'
                                    }}
                                >
                                    {param.description || '-'}
                                </td>
                            </tr>
                        ))}
                        {filtered.length === 0 && (
                            <tr>
                                <td colSpan={4} style={{ padding: 16, color: 'var(--nextra-secondary-color, #888)' }}>
                                    未找到匹配的参数
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div style={{ marginTop: 16 }}>
                <div style={{ fontWeight: 600, marginBottom: 8 }}>返回值</div>
                <div
                    style={{
                        padding: 12,
                        borderRadius: 8,
                        border: '1px solid var(--nextra-border-color, #333)',
                        background: 'var(--nextra-bg, #111)',
                        fontFamily: 'monospace',
                        fontSize: 13,
                        color: 'var(--nextra-secondary-color, #888)'
                    }}
                >
                    {doc.returns.type}
                </div>
                {doc.returns.description && <div style={{ marginTop: 8, fontSize: 14 }}>{doc.returns.description}</div>}
            </div>
        </div>
    )
}
