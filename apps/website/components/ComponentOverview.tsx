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
            { name: 'Grid', href: '/components/grid', description: '12 列网格' },
            { name: 'SimpleGrid', href: '/components/simple-grid', description: '简单网格' },
            { name: 'AspectRatio', href: '/components/aspect-ratio', description: '固定宽高比' },
            { name: 'List', href: '/components/list', description: '列表' },
            {
                name: 'TypographyStylesProvider',
                href: '/components/typography-styles-provider',
                description: '排版样式容器'
            },
            { name: 'AppShell', href: '/components/app-shell', description: '应用布局框架' },
            { name: 'Splitter', href: '/components/splitter', description: '可拖拽分割面板' },
            { name: 'Space', href: '/components/space', description: '占位间距' }
        ]
    },
    {
        title: '反馈组件',
        items: [
            { name: 'Loader', href: '/components/loader', description: '加载器' },
            { name: 'Overlay', href: '/components/overlay', description: '遮罩层' },
            { name: 'Alert', href: '/components/alert', description: '警告提示' },
            { name: 'Skeleton', href: '/components/skeleton', description: '骨架屏' },
            { name: 'Progress', href: '/components/progress', description: '线性进度条' },
            { name: 'RingProgress', href: '/components/ring-progress', description: '环形进度条' },
            { name: 'Notification', href: '/components/notification', description: '通知提示' },
            { name: 'Notifications', href: '/components/notifications', description: '通知系统' },
            { name: 'LoadingOverlay', href: '/components/loading-overlay', description: '加载遮罩' },
            { name: 'Indicator', href: '/components/indicator', description: '角标/状态点' },
            { name: 'EmptyState', href: '/components/empty-state', description: '空状态占位' },
            { name: 'CopyButton', href: '/components/copy-button', description: '一键复制' }
        ]
    },
    {
        title: '数据展示',
        items: [
            { name: 'Accordion', href: '/components/accordion', description: '手风琴' },
            { name: 'Avatar', href: '/components/avatar', description: '头像' },
            { name: 'Badge', href: '/components/badge', description: '徽标' },
            { name: 'Blockquote', href: '/components/blockquote', description: '引用块' },
            { name: 'Breadcrumbs', href: '/components/breadcrumbs', description: '面包屑' },
            { name: 'Card', href: '/components/card', description: '卡片容器' },
            { name: 'Code', href: '/components/code', description: '行内代码' },
            { name: 'DataList', href: '/components/data-list', description: '键值对列表' },
            { name: 'Divider', href: '/components/divider', description: '分割线' },
            { name: 'Highlight', href: '/components/highlight', description: '文本高亮' },
            { name: 'Image', href: '/components/image', description: '图片' },
            { name: 'Kbd', href: '/components/kbd', description: '键盘按键' },
            { name: 'Mark', href: '/components/mark', description: '高亮标记' },
            { name: 'ScrollArea', href: '/components/scroll-area', description: '自定义滚动区域' },
            { name: 'Spoiler', href: '/components/spoiler', description: '可折叠内容' },
            { name: 'Table', href: '/components/table', description: '表格' },
            { name: 'TableOfContents', href: '/components/table-of-contents', description: '目录导航' },
            { name: 'ThemeIcon', href: '/components/theme-icon', description: '主题图标' },
            { name: 'Timeline', href: '/components/timeline', description: '时间轴' }
        ]
    },
    {
        title: '表单组件',
        items: [
            { name: 'TextInput', href: '/components/text-input', description: '文本输入' },
            { name: 'Textarea', href: '/components/textarea', description: '多行文本' },
            { name: 'PasswordInput', href: '/components/password-input', description: '密码输入' },
            { name: 'NumberInput', href: '/components/number-input', description: '数字输入' },
            { name: 'Checkbox', href: '/components/checkbox', description: '复选框' },
            { name: 'CheckboxGroup', href: '/components/checkbox-group', description: '复选框组' },
            { name: 'Radio', href: '/components/radio', description: '单选框' },
            { name: 'RadioGroup', href: '/components/radio-group', description: '单选框组' },
            { name: 'Switch', href: '/components/switch', description: '开关' },
            { name: 'NativeSelect', href: '/components/native-select', description: '原生选择' },
            { name: 'Select', href: '/components/select', description: '下拉选择' },
            { name: 'MultiSelect', href: '/components/multi-select', description: '多选下拉' },
            { name: 'Autocomplete', href: '/components/autocomplete', description: '自动补全' },
            { name: 'TagsInput', href: '/components/tags-input', description: '标签输入' },
            { name: 'Slider', href: '/components/slider', description: '滑块' },
            { name: 'RangeSlider', href: '/components/range-slider', description: '范围滑块' },
            { name: 'Rating', href: '/components/rating', description: '评分' },
            { name: 'SegmentedControl', href: '/components/segmented-control', description: '分段控制' },
            { name: 'Chip', href: '/components/chip', description: '可选标签' },
            { name: 'PinInput', href: '/components/pin-input', description: '分段验证码输入' },
            { name: 'ColorInput', href: '/components/color-input', description: '颜色输入' },
            { name: 'FileButton', href: '/components/file-button', description: '文件选择按钮' },
            { name: 'FileInput', href: '/components/file-input', description: '文件输入框' },
            { name: 'JsonInput', href: '/components/json-input', description: 'JSON 输入框' },
            { name: 'MaskInput', href: '/components/mask-input', description: '掩码输入框' },
            { name: 'Fieldset', href: '/components/fieldset', description: '字段分组' }
        ]
    },
    {
        title: '浮层组件',
        items: [
            { name: 'HoverCard', href: '/components/hover-card', description: '悬停卡片' },
            { name: 'Popover', href: '/components/popover', description: '弹出层' },
            { name: 'Tooltip', href: '/components/tooltip', description: '文字提示' },
            { name: 'Dialog', href: '/components/dialog', description: '轻量对话框' },
            { name: 'Drawer', href: '/components/drawer', description: '抽屉' },
            { name: 'Modal', href: '/components/modal', description: '模态框' }
        ]
    },
    {
        title: '导航组件',
        items: [
            { name: 'Burger', href: '/components/burger', description: '汉堡菜单按钮' },
            { name: 'Menu', href: '/components/menu', description: '下拉菜单' },
            { name: 'Affix', href: '/components/affix', description: '固钉' },
            { name: 'Tabs', href: '/components/tabs', description: '标签页' },
            { name: 'Pagination', href: '/components/pagination', description: '分页' },
            { name: 'Stepper', href: '/components/stepper', description: '步骤条' },
            { name: 'NavLink', href: '/components/nav-link', description: '导航链接' }
        ]
    },
    {
        title: '工具组件',
        items: [
            { name: 'Collapse', href: '/components/collapse', description: '折叠动画' },
            { name: 'FocusTrap', href: '/components/focus-trap', description: '焦点捕获' },
            { name: 'Portal', href: '/components/portal', description: 'Portal 传送门' },
            { name: 'Transition', href: '/components/transition', description: '过渡动画' },
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
                background: 'var(--nextra-bg, #111)',
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
