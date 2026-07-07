'use client'

import React, { useState } from 'react'

export interface DemoProps {
    title?: string
    description?: string
    children: React.ReactNode
    code?: string
}

export function Demo({ title, description, children, code }: DemoProps) {
    const [expanded, setExpanded] = useState(false)
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        if (!code) return
        try {
            await navigator.clipboard.writeText(code.trim())
            setCopied(true)
            setTimeout(() => setCopied(false), 1500)
        } catch {
            // ignore
        }
    }

    return (
        <div
            style={{
                margin: '24px 0',
                border: '1px solid var(--nextra-border-color, #333)',
                borderRadius: 12,
                overflow: 'hidden'
            }}
        >
            {(title || description) && (
                <div style={{ padding: '16px 16px 0' }}>
                    {title && <div style={{ fontWeight: 600 }}>{title}</div>}
                    {description && (
                        <div
                            style={{
                                fontSize: 14,
                                color: 'var(--nextra-secondary-color, #888)',
                                marginTop: 4
                            }}
                        >
                            {description}
                        </div>
                    )}
                </div>
            )}
            <div style={{ padding: 24 }}>{children}</div>
            {code && (
                <div style={{ borderTop: '1px solid var(--nextra-border-color, #333)' }}>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '8px 12px',
                            background: 'var(--nextra-bg-color, #111)',
                            gap: 8
                        }}
                    >
                        <button
                            onClick={() => setExpanded(e => !e)}
                            style={{
                                fontSize: 12,
                                color: 'var(--nextra-secondary-color, #888)',
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            {expanded ? '收起代码' : '展开代码'}
                        </button>
                        <button
                            onClick={handleCopy}
                            style={{
                                fontSize: 12,
                                color: copied ? '#51cf66' : 'var(--nextra-secondary-color, #888)',
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            {copied ? '已复制' : '复制'}
                        </button>
                    </div>
                    {expanded && (
                        <pre
                            style={{
                                margin: 0,
                                padding: 16,
                                background: 'var(--nextra-bg-color, #111)',
                                fontSize: 13,
                                overflow: 'auto',
                                borderTop: '1px solid var(--nextra-border-color, #333)'
                            }}
                        >
                            <code>{code.trim()}</code>
                        </pre>
                    )}
                </div>
            )}
        </div>
    )
}
