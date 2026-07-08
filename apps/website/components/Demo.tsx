'use client'

import React, { useEffect, useState } from 'react'
import { Moon, Sun, AlignRight, AlignLeft, Copy, Check } from 'lucide-react'
import { useTheme } from 'next-themes'
import { CodeBlock } from './CodeBlock'
import { demoRegistry } from '@/.docgen/demo-registry'

// demo 组件按 demoId 缓存，避免重复动态加载
const demoCache = new Map<string, React.ComponentType<any>>()

function DemoSkeleton() {
    return (
        <div
            style={{
                padding: 48,
                textAlign: 'center',
                color: 'var(--nextra-secondary-color, #888)',
                fontSize: 13
            }}
        >
            加载示例中…
        </div>
    )
}

export interface DemoProps {
    title?: string
    description?: string
    children?: React.ReactNode
    /** 指定 demo 的注册 id（如 "paper/basic"），自动取用其真实源码作为展示代码，避免手写 code 漂移 */
    demoId?: string
    code?: string
    /** 渲染在 preview 上方的控件区 */
    controls?: React.ReactNode
    /** 是否允许在 Demo 内切换 light/dark */
    themeToggle?: boolean
    /** 是否允许在 Demo 内切换 RTL */
    rtl?: boolean
    /** 代码块是否默认展开 */
    defaultExpanded?: boolean
}

export function Demo({
    title,
    description,
    children,
    demoId,
    code,
    controls,
    themeToggle = false,
    rtl = false,
    defaultExpanded = false
}: DemoProps) {
    const { resolvedTheme } = useTheme()
    const [expanded, setExpanded] = useState(defaultExpanded)
    const [copied, setCopied] = useState(false)
    const [copyError, setCopyError] = useState(false)
    const [demoTheme, setDemoTheme] = useState<'light' | 'dark'>('light')
    const [manualTheme, setManualTheme] = useState(false)
    const [isRtl, setIsRtl] = useState(false)

    // demoId 指向注册表中的 demo：源码用于展示（同源不漂移），组件运行时懒加载
    const entry = demoId ? demoRegistry[demoId] : undefined
    const resolvedCode = code ?? entry?.code

    const [DemoComp, setDemoComp] = useState<React.ComponentType<any> | null>(
        entry && demoId && demoCache.has(demoId) ? demoCache.get(demoId)! : null
    )

    useEffect(() => {
        if (!entry || !demoId) return
        if (demoCache.has(demoId)) {
            setDemoComp(demoCache.get(demoId)!)
            return
        }
        let active = true
        entry
            .load()
            .then(mod => {
                if (!active) return
                const C = mod.default
                demoCache.set(demoId, C)
                setDemoComp(C)
            })
            .catch(() => {})
        return () => {
            active = false
        }
    }, [entry, demoId])

    useEffect(() => {
        if (!manualTheme && (resolvedTheme === 'dark' || resolvedTheme === 'light')) {
            setDemoTheme(resolvedTheme)
        }
    }, [resolvedTheme, manualTheme])

    const handleCopy = async () => {
        if (!resolvedCode) return
        try {
            await navigator.clipboard.writeText(resolvedCode.trim())
            setCopied(true)
            setCopyError(false)
            setTimeout(() => setCopied(false), 1500)
        } catch {
            setCopyError(true)
            setTimeout(() => setCopyError(false), 2000)
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
            {controls && (
                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        gap: '12px 20px',
                        padding: '12px 16px',
                        borderBottom: '1px solid var(--nextra-border-color, #333)',
                        background: 'var(--nextra-bg, #111)'
                    }}
                >
                    {controls}
                </div>
            )}
            <div
                style={{
                    padding: 24,
                    direction: isRtl ? 'rtl' : 'ltr',
                    background: demoTheme === 'dark' ? '#1a1a1a' : '#ffffff',
                    transition: 'background 0.2s ease'
                }}
                data-ui-color-scheme={demoTheme}
            >
                {children ?? (DemoComp ? <DemoComp /> : <DemoSkeleton />)}
            </div>
            {resolvedCode && (
                <div style={{ borderTop: '1px solid var(--nextra-border-color, #333)' }}>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '8px 12px',
                            background: 'var(--nextra-bg, #111)',
                            gap: 8,
                            flexWrap: 'wrap'
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
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
                            {(themeToggle || rtl) && (
                                <span
                                    style={{
                                        width: 1,
                                        height: 14,
                                        background: 'var(--nextra-border-color, #333)'
                                    }}
                                />
                            )}
                            {themeToggle && (
                                <button
                                    onClick={() => {
                                        setDemoTheme(t => (t === 'light' ? 'dark' : 'light'))
                                        setManualTheme(true)
                                    }}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 4,
                                        fontSize: 12,
                                        color: 'var(--nextra-secondary-color, #888)',
                                        background: 'transparent',
                                        border: 'none',
                                        cursor: 'pointer'
                                    }}
                                    title="切换 Demo 主题"
                                >
                                    {demoTheme === 'light' ? <Moon size={12} /> : <Sun size={12} />}
                                    {demoTheme === 'light' ? '暗色' : '亮色'}
                                </button>
                            )}
                            {rtl && (
                                <button
                                    onClick={() => setIsRtl(v => !v)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 4,
                                        fontSize: 12,
                                        color: 'var(--nextra-secondary-color, #888)',
                                        background: 'transparent',
                                        border: 'none',
                                        cursor: 'pointer'
                                    }}
                                    title="切换 RTL"
                                >
                                    {isRtl ? <AlignLeft size={12} /> : <AlignRight size={12} />}
                                    {isRtl ? 'LTR' : 'RTL'}
                                </button>
                            )}
                        </div>
                        <button
                            onClick={handleCopy}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 4,
                                fontSize: 12,
                                color: copyError
                                    ? '#ff6b6b'
                                    : copied
                                      ? '#51cf66'
                                      : 'var(--nextra-secondary-color, #888)',
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            {copied ? <Check size={12} /> : <Copy size={12} />}
                            {copyError ? '复制失败' : copied ? '已复制' : '复制'}
                        </button>
                    </div>
                    {expanded && <CodeBlock code={resolvedCode} language="tsx" />}
                </div>
            )}
        </div>
    )
}
