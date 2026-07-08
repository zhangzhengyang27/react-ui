'use client'

import React from 'react'
import themeTokens from '@/.docgen/theme-tokens.json'

const T = themeTokens as Record<string, any>

const th: React.CSSProperties = {
    textAlign: 'left',
    padding: '12px 8px',
    borderBottom: '1px solid var(--nextra-border-color, #333)',
    whiteSpace: 'nowrap'
}
const td: React.CSSProperties = {
    padding: '12px 8px',
    borderBottom: '1px solid var(--nextra-border-color, #222)',
    fontFamily: 'monospace',
    fontSize: 14
}
const table: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: 14
}
const sectionTitle: React.CSSProperties = {
    marginTop: 32,
    marginBottom: 12,
    fontWeight: 600,
    fontSize: 18
}

function TokenTable({ rows }: { rows: [string, string][] }) {
    return (
        <div style={{ overflowX: 'auto' }}>
            <table style={table}>
                <thead>
                    <tr>
                        <th style={th}>Key</th>
                        <th style={th}>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map(([k, v]) => (
                        <tr key={k}>
                            <td style={td}>{k}</td>
                            <td style={td}>{v}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

function SizeTable({ rows }: { rows: [string, string][] }) {
    return (
        <div style={{ overflowX: 'auto' }}>
            <table style={table}>
                <thead>
                    <tr>
                        <th style={th}>Key</th>
                        <th style={th}>Value</th>
                        <th style={th}>预览</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map(([k, v]) => (
                        <tr key={k}>
                            <td style={td}>{k}</td>
                            <td style={td}>{v}</td>
                            <td style={{ ...td, fontFamily: 'inherit' }}>
                                <span
                                    style={{
                                        display: 'inline-block',
                                        background: 'var(--nextra-primary-color, #0070f3)',
                                        width: v,
                                        height: v,
                                        minWidth: 8,
                                        minHeight: 8,
                                        borderRadius: 2,
                                        verticalAlign: 'middle'
                                    }}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

function objectEntries(obj: any): [string, string][] {
    if (!obj || typeof obj !== 'object') return []
    return Object.entries(obj).map(([k, v]) => [k, String(v)])
}

export function ThemeTokens() {
    const colorNames = T.colors ? Object.keys(T.colors) : []

    return (
        <div>
            <h2 style={sectionTitle}>颜色 (colors)</h2>
            <p style={{ color: 'var(--nextra-secondary-color, #888)', fontSize: 14, marginBottom: 16 }}>
                共 {colorNames.length} 组色板，每组 10 个色阶（索引 0–9）。
            </p>
            <div style={{ overflowX: 'auto' }}>
                <table style={table}>
                    <thead>
                        <tr>
                            <th style={th}>名称</th>
                            {Array.from({ length: 10 }, (_, i) => (
                                <th key={i} style={{ ...th, textAlign: 'center' }}>
                                    {i}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {colorNames.map(name => {
                            const shades: string[] = T.colors[name] ?? []
                            return (
                                <tr key={name}>
                                    <td style={td}>{name}</td>
                                    {shades.map((c, i) => (
                                        <td
                                            key={i}
                                            style={{
                                                padding: 0,
                                                borderBottom: '1px solid var(--nextra-border-color, #222)',
                                                textAlign: 'center'
                                            }}
                                            title={`${name}[${i}] = ${c}`}
                                        >
                                            <span
                                                style={{
                                                    display: 'inline-block',
                                                    width: 40,
                                                    height: 40,
                                                    background: c,
                                                    borderRadius: 4
                                                }}
                                            />
                                        </td>
                                    ))}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            <h2 style={sectionTitle}>字号 (fontSizes)</h2>
            <SizeTable rows={objectEntries(T.fontSizes)} />

            <h2 style={sectionTitle}>间距 (spacing)</h2>
            <SizeTable rows={objectEntries(T.spacing)} />

            <h2 style={sectionTitle}>圆角 (radius)</h2>
            <SizeTable rows={objectEntries(T.radius)} />

            <h2 style={sectionTitle}>行高 (lineHeights)</h2>
            <TokenTable rows={objectEntries(T.lineHeights)} />

            <h2 style={sectionTitle}>断点 (breakpoints)</h2>
            <TokenTable rows={objectEntries(T.breakpoints)} />

            <h2 style={sectionTitle}>阴影 (shadows)</h2>
            <TokenTable rows={objectEntries(T.shadows)} />

            <h2 style={sectionTitle}>标题 (headings)</h2>
            <TokenTable rows={objectEntries(T.headings)} />
            {T.headings?.sizes && (
                <>
                    <h3 style={{ marginTop: 16, marginBottom: 8, fontWeight: 600 }}>标题尺寸 (headings.sizes)</h3>
                    <TokenTable rows={objectEntries(T.headings.sizes)} />
                </>
            )}

            <h2 style={sectionTitle}>标量令牌</h2>
            <TokenTable
                rows={[
                    ['primaryColor', String(T.primaryColor)],
                    ['defaultRadius', String(T.defaultRadius)],
                    ['primaryShade (light)', String(T.primaryShade?.light)],
                    ['primaryShade (dark)', String(T.primaryShade?.dark)],
                    ['autoContrast', String(T.autoContrast)],
                    ['luminanceThreshold', String(T.luminanceThreshold)],
                    ['focusRing', String(T.focusRing)],
                    ['cursorType', String(T.cursorType)],
                    ['scale', String(T.scale)],
                    ['defaultGradient', JSON.stringify(T.defaultGradient)],
                    ['fontFamily', String(T.fontFamily)],
                    ['fontFamilyMonospace', String(T.fontFamilyMonospace)]
                ]}
            />
        </div>
    )
}
