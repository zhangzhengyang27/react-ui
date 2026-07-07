'use client'

import React from 'react'

interface ComponentItem {
    name: string
    href: string
    description?: string
}

interface Category {
    title: string
    items: ComponentItem[]
}

const CATEGORIES: Category[] = [
    {
        title: '基础组件',
        items: [
            { name: 'Button', href: '/components/button', description: '按钮用于开始一个即时操作' },
            { name: 'ActionIcon', href: '/components/action-icon', description: '图标按钮' },
            { name: 'CloseButton', href: '/components/close-button', description: '关闭按钮' },
            { name: 'Anchor', href: '/components/anchor', description: '链接组件' },
            { name: 'Text', href: '/components/text', description: '文本排版' },
            { name: 'Title', href: '/components/title', description: '标题组件' }
        ]
    },
    {
        title: '布局组件',
        items: [
            { name: 'Container', href: '/components/container', description: '内容容器' },
            { name: 'Group', href: '/components/group', description: '水平排列' },
            { name: 'Stack', href: '/components/stack', description: '垂直排列' },
            { name: 'Paper', href: '/components/paper', description: '纸张/卡片容器' },
            { name: 'Center', href: '/components/center', description: '居中布局' },
            { name: 'Flex', href: '/components/flex', description: '弹性布局' },
            { name: 'SimpleGrid', href: '/components/simple-grid', description: '简单网格' },
            { name: 'Space', href: '/components/space', description: '占位间距' }
        ]
    },
    {
        title: '反馈组件',
        items: [
            { name: 'Loader', href: '/components/loader', description: '加载器' },
            { name: 'Overlay', href: '/components/overlay', description: '遮罩层' },
            { name: 'Collapse', href: '/components/collapse', description: '折叠动画' },
            { name: 'Transition', href: '/components/transition', description: '过渡动画' }
        ]
    },
    {
        title: '数据展示',
        items: [
            { name: 'Accordion', href: '/components/accordion', description: '手风琴' },
            { name: 'ScrollArea', href: '/components/scroll-area', description: '自定义滚动区域' },
            { name: 'Badge', href: '/components/badge', description: '徽标' },
            { name: 'Breadcrumbs', href: '/components/breadcrumbs', description: '面包屑' },
            { name: 'Blockquote', href: '/components/blockquote', description: '引用块' },
            { name: 'Divider', href: '/components/divider', description: '分割线' }
        ]
    },
    {
        title: '导航组件',
        items: [{ name: 'Burger', href: '/components/burger', description: '汉堡菜单按钮' }]
    },
    {
        title: '工具组件',
        items: [
            { name: 'FocusTrap', href: '/components/focus-trap', description: '焦点捕获' },
            { name: 'Portal', href: '/components/portal', description: 'Portal 传送门' },
            { name: 'UnstyledButton', href: '/components/unstyled-button', description: '无样式按钮' },
            { name: 'VisuallyHidden', href: '/components/visually-hidden', description: '视觉隐藏' }
        ]
    }
]

function Card({ item }: { item: ComponentItem }) {
    return (
        <a
            href={item.href}
            style={{
                display: 'block',
                padding: '16px 20px',
                borderRadius: 12,
                border: '1px solid var(--nextra-border-color, #333)',
                background: 'var(--nextra-bg-color, #111)',
                color: 'inherit',
                textDecoration: 'none',
                transition: 'box-shadow 0.2s ease, transform 0.2s ease'
            }}
            onMouseEnter={e => {
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)'
                e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={e => {
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.transform = 'translateY(0)'
            }}
        >
            <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 4 }}>{item.name}</div>
            {item.description && (
                <div style={{ fontSize: 13, color: 'var(--nextra-secondary-color, #888)', lineHeight: 1.5 }}>
                    {item.description}
                </div>
            )}
        </a>
    )
}

function CategorySection({ category }: { category: Category }) {
    return (
        <div style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 16 }}>{category.title}</h2>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                    gap: 16
                }}
            >
                {category.items.map(item => (
                    <Card key={item.name} item={item} />
                ))}
            </div>
        </div>
    )
}

export function ComponentOverview() {
    return (
        <div style={{ marginTop: 32 }}>
            {CATEGORIES.map(category => (
                <CategorySection key={category.title} category={category} />
            ))}
        </div>
    )
}
