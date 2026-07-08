'use client'

import React from 'react'
import { Button, Group } from '@react-ui/ui'
import { Palette, Layers, Type, Moon, Accessibility, Rocket, Github } from 'lucide-react'
import { CodeBlock } from './CodeBlock'
import { ComponentOverview } from './ComponentOverview'
import docgenData from '@/.docgen/docgen.json'
import hooksData from '@/.docgen/hooks.json'

const FEATURES = [
    {
        icon: Palette,
        title: '主题系统',
        description: '统一的颜色、间距、圆角、阴影等设计令牌，支持浅色/深色模式切换。'
    },
    {
        icon: Layers,
        title: 'Styles API',
        description: '通过 classNames、styles、vars 和 theme.components 精细化定制组件外观。'
    },
    {
        icon: Type,
        title: 'TypeScript 优先',
        description: '全量类型定义，从 props 到 theme 对象都能获得完整的类型推导。'
    },
    {
        icon: Moon,
        title: '暗色模式',
        description: '内置颜色方案支持，组件在 light / dark 模式下均有一致的视觉表现。'
    },
    {
        icon: Accessibility,
        title: '可访问性',
        description: '组件遵循 WAI-ARIA 实践，保留屏幕阅读器与键盘操作友好性。'
    },
    {
        icon: Rocket,
        title: '持续更新',
        description: '组件、Hooks、文档持续迭代，逐步对齐企业级组件库研发标准。'
    }
]

const installCode = `npm install @react-ui/ui
# 或
pnpm add @react-ui/ui`

const usageCode = `import { Provider, Button } from '@react-ui/ui'

export default function App() {
    return (
        <Provider>
            <Button>Hello react-ui</Button>
        </Provider>
    )
}`

function FeatureCard({ feature }: { feature: (typeof FEATURES)[number] }) {
    const Icon = feature.icon
    return (
        <div
            style={{
                padding: '24px',
                borderRadius: 12,
                border: '1px solid var(--nextra-border-color, #333)',
                background: 'var(--nextra-bg, #111)'
            }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: 'var(--nextra-primary-color, #0070f3)',
                    color: '#fff',
                    marginBottom: 16
                }}
            >
                <Icon size={20} />
            </div>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{feature.title}</h3>
            <p style={{ fontSize: 14, color: 'var(--nextra-secondary-color, #888)', lineHeight: 1.6, margin: 0 }}>
                {feature.description}
            </p>
        </div>
    )
}

function StatCard({ value, label }: { value: string; label: string }) {
    return (
        <div
            style={{
                padding: '20px 24px',
                borderRadius: 12,
                border: '1px solid var(--nextra-border-color, #333)',
                background: 'var(--nextra-bg, #111)',
                textAlign: 'center'
            }}
        >
            <div style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>{value}</div>
            <div style={{ fontSize: 14, color: 'var(--nextra-secondary-color, #888)' }}>{label}</div>
        </div>
    )
}

export function HomePage() {
    const componentCount = Object.keys(docgenData).length
    const hookCount = Object.keys(hooksData).length

    return (
        <div style={{ marginTop: 24 }}>
            {/* Hero */}
            <section style={{ padding: '48px 0 64px' }}>
                <div style={{ maxWidth: 720 }}>
                    <h1
                        style={{
                            fontSize: 'clamp(36px, 6vw, 56px)',
                            fontWeight: 800,
                            lineHeight: 1.1,
                            marginBottom: 20
                        }}
                    >
                        @react-ui/ui
                    </h1>
                    <p
                        style={{
                            fontSize: 'clamp(16px, 2.5vw, 20px)',
                            color: 'var(--nextra-secondary-color, #888)',
                            lineHeight: 1.6,
                            marginBottom: 32
                        }}
                    >
                        小叶科技官方 React UI 组件库，基于 React 19 + TypeScript，借鉴 Mantine 架构，
                        提供主题系统、Styles API 与丰富的可组合组件，用于学员参考学习与生产项目。
                    </p>
                    <Group>
                        <Button component="a" href="/components/button" size="lg">
                            开始浏览组件
                        </Button>
                        <Button component="a" href="/theming" variant="default" size="lg">
                            主题配置
                        </Button>
                        <Button
                            component="a"
                            href="https://github.com/xiaoye-tech/react-ui"
                            target="_blank"
                            rel="noreferrer"
                            variant="default"
                            size="lg"
                            leftSection={<Github size={18} />}
                        >
                            GitHub
                        </Button>
                    </Group>
                </div>
            </section>

            {/* Stats */}
            <section
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                    gap: 16,
                    marginBottom: 64
                }}
            >
                <StatCard value={String(componentCount)} label="组件" />
                <StatCard value={String(hookCount)} label="Hooks" />
                <StatCard value="2" label="主题模式" />
                <StatCard value="∞" label="可组合性" />
            </section>

            {/* Features */}
            <section style={{ marginBottom: 64 }}>
                <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>核心特性</h2>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                        gap: 16
                    }}
                >
                    {FEATURES.map(feature => (
                        <FeatureCard key={feature.title} feature={feature} />
                    ))}
                </div>
            </section>

            {/* Quick start */}
            <section style={{ marginBottom: 64 }}>
                <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>快速开始</h2>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: 16
                    }}
                >
                    <div
                        style={{
                            borderRadius: 12,
                            border: '1px solid var(--nextra-border-color, #333)',
                            overflow: 'hidden'
                        }}
                    >
                        <div
                            style={{
                                padding: '10px 16px',
                                fontSize: 13,
                                fontWeight: 600,
                                borderBottom: '1px solid var(--nextra-border-color, #333)',
                                background: 'var(--nextra-bg, #111)'
                            }}
                        >
                            安装
                        </div>
                        <CodeBlock code={installCode} language="bash" />
                    </div>
                    <div
                        style={{
                            borderRadius: 12,
                            border: '1px solid var(--nextra-border-color, #333)',
                            overflow: 'hidden'
                        }}
                    >
                        <div
                            style={{
                                padding: '10px 16px',
                                fontSize: 13,
                                fontWeight: 600,
                                borderBottom: '1px solid var(--nextra-border-color, #333)',
                                background: 'var(--nextra-bg, #111)'
                            }}
                        >
                            使用
                        </div>
                        <CodeBlock code={usageCode} language="tsx" />
                    </div>
                </div>
            </section>

            {/* Component overview */}
            <section>
                <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>组件概览</h2>
                <ComponentOverview />
            </section>
        </div>
    )
}
