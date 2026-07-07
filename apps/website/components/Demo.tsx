'use client'

import React from 'react'

export interface DemoProps {
    title?: string
    description?: string
    children: React.ReactNode
    code?: string
}

export function Demo({ title, description, children, code }: DemoProps) {
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
                        <div style={{ fontSize: 14, color: 'var(--nextra-secondary-color, #888)', marginTop: 4 }}>
                            {description}
                        </div>
                    )}
                </div>
            )}
            <div style={{ padding: 24 }}>{children}</div>
            {code && (
                <pre
                    style={{
                        margin: 0,
                        padding: 16,
                        background: 'var(--nextra-bg-color, #111)',
                        fontSize: 13,
                        overflow: 'auto'
                    }}
                >
                    <code>{code.trim()}</code>
                </pre>
            )}
        </div>
    )
}
