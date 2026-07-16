import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function kebabCase(name: string): string {
    return name
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/[\s_]+/g, '-')
        .toLowerCase()
}

interface ComponentPageConfig {
    name: string
    description: string
    hasVariant?: boolean
    variantTitle?: string
    variantDescription?: string
}

const COMPONENTS: ComponentPageConfig[] = [
    {
        name: 'Accordion',
        description: '手风琴组件，用于在有限空间内展示可展开/折叠的内容列表。'
    },
    {
        name: 'ActionIcon',
        description: '操作图标按钮，用于触发单个操作或显示图标状态。',
        hasVariant: true,
        variantTitle: '图标按钮变体',
        variantDescription: '通过 variant 属性切换 ActionIcon 的视觉风格。'
    },
    {
        name: 'Anchor',
        description: '锚点链接组件，基于 Text 组件扩展，用于页面内或外部链接。'
    },
    {
        name: 'CloseButton',
        description: '关闭按钮，预置 X 图标与可访问标签，常用于弹窗或通知。'
    },
    {
        name: 'Collapse',
        description: '折叠容器，支持垂直/水平方向的展开与收起动画。'
    },
    {
        name: 'Container',
        description: '居中容器，用于限制内容最大宽度并保持页面居中。'
    },
    {
        name: 'FocusTrap',
        description: '焦点陷阱组件，用于将键盘焦点限制在指定元素内。'
    },
    {
        name: 'Group',
        description: '水平弹性布局容器，用于统一控制子元素间距与对齐。'
    },
    {
        name: 'Loader',
        description: '加载指示器，支持 oval、bars、dots 等内置类型。',
        hasVariant: true,
        variantTitle: '加载器类型',
        variantDescription: '通过 type 属性切换不同的加载动画。'
    },
    {
        name: 'Overlay',
        description: '覆盖层组件，用于在内容上方显示半透或模糊遮罩。'
    },
    {
        name: 'Paper',
        description: '纸张容器，提供阴影、圆角与边框，常用于卡片式布局。'
    },
    {
        name: 'Portal',
        description: '传送门组件，将子节点渲染到 document.body 或指定目标元素。'
    },
    {
        name: 'Stack',
        description: '垂直弹性布局容器，用于统一控制子元素垂直间距与对齐。'
    },
    {
        name: 'Text',
        description: '文本组件，控制字体大小、行高、渐变与截断等排版属性。',
        hasVariant: true,
        variantTitle: '文本变体',
        variantDescription: '通过 variant 属性使用普通文本或渐变文本。'
    },
    {
        name: 'Title',
        description: '标题组件，根据 order 属性渲染 h1-h6 标题元素。'
    },
    {
        name: 'Transition',
        description: '过渡组件，基于 mounted 状态驱动进入/退出动画。'
    },
    {
        name: 'UnstyledButton',
        description: '无默认样式的按钮基础组件，便于自定义外观。'
    },
    {
        name: 'VisuallyHidden',
        description: '视觉隐藏组件，保留屏幕阅读器可访问的文本内容。'
    }
]

function renderBasicCode(component: string): string {
    const codes: Record<string, string> = {
        Accordion: `import { Accordion } from '@react-ui/ui'

export default function AccordionBasicDemo() {
    return (
        <Accordion defaultValue="item-1">
            <Accordion.Item value="item-1">
                <Accordion.Control>什么是 @react-ui/ui？</Accordion.Control>
                <Accordion.Panel>一个受 UI 启发的 React UI 组件库。</Accordion.Panel>
            </Accordion.Item>
        </Accordion>
    )
}`,
        ActionIcon: `import { ActionIcon } from '@react-ui/ui'
import { Settings } from 'lucide-react'

export default function ActionIconBasicDemo() {
    return (
        <ActionIcon variant="filled" color="blue" size="lg">
            <Settings size={20} />
        </ActionIcon>
    )
}`,
        Anchor: `import { Anchor } from '@react-ui/ui'

export default function AnchorBasicDemo() {
    return <Anchor href="#api">跳转到 API 文档</Anchor>
}`,
        CloseButton: `import { CloseButton } from '@react-ui/ui'

export default function CloseButtonBasicDemo() {
    return <CloseButton />
}`,
        Collapse: `import { useState } from 'react'
import { Button, Collapse } from '@react-ui/ui'

export default function CollapseBasicDemo() {
    const [opened, setOpened] = useState(false)
    return (
        <>
            <Button onClick={() => setOpened(o => !o)}>切换展开</Button>
            <Collapse expanded={opened} style={{ marginTop: 12 }}>
                <div style={{ padding: 20, background: '#222', borderRadius: 8 }}>
                    折叠内容
                </div>
            </Collapse>
        </>
    )
}`,
        Container: `import { Container, Paper } from '@react-ui/ui'

export default function ContainerBasicDemo() {
    return (
        <Container size="xs">
            <Paper withBorder style={{ padding: 24 }}>
                居中容器内容
            </Paper>
        </Container>
    )
}`,
        FocusTrap: `import { useState } from 'react'
import { Button, FocusTrap } from '@react-ui/ui'

export default function FocusTrapBasicDemo() {
    const [active, setActive] = useState(true)
    return (
        <div>
            <Button onClick={() => setActive(a => !a)}>
                {active ? '停用' : '启用'} FocusTrap
            </Button>
            <FocusTrap active={active}>
                <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                    <input placeholder="输入框 1" />
                    <input placeholder="输入框 2" />
                </div>
            </FocusTrap>
        </div>
    )
}`,
        Group: `import { Button, Group } from '@react-ui/ui'

export default function GroupBasicDemo() {
    return (
        <Group>
            <Button>第一个</Button>
            <Button>第二个</Button>
            <Button>第三个</Button>
        </Group>
    )
}`,
        Loader: `import { Loader } from '@react-ui/ui'

export default function LoaderBasicDemo() {
    return <Loader />
}`,
        Overlay: `import { Overlay, Paper } from '@react-ui/ui'

export default function OverlayBasicDemo() {
    return (
        <div style={{ position: 'relative', height: 160 }}>
            <Paper style={{ height: '100%', padding: 16 }}>底层内容</Paper>
            <Overlay center>覆盖层内容</Overlay>
        </div>
    )
}`,
        Paper: `import { Paper } from '@react-ui/ui'

export default function PaperBasicDemo() {
    return (
        <Paper shadow="sm" radius="md" withBorder style={{ padding: 24 }}>
            Paper 内容区域
        </Paper>
    )
}`,
        Portal: `import { Portal } from '@react-ui/ui'

export default function PortalBasicDemo() {
    return (
        <Portal>
            <div style={{ position: 'fixed', bottom: 16, right: 16, padding: 12, background: '#222', borderRadius: 8 }}>
                渲染到 document.body
            </div>
        </Portal>
    )
}`,
        Stack: `import { Button, Stack } from '@react-ui/ui'

export default function StackBasicDemo() {
    return (
        <Stack>
            <Button>第一个</Button>
            <Button>第二个</Button>
            <Button>第三个</Button>
        </Stack>
    )
}`,
        Text: `import { Text } from '@react-ui/ui'

export default function TextBasicDemo() {
    return <Text>默认文本内容</Text>
}`,
        Title: `import { Title } from '@react-ui/ui'

export default function TitleBasicDemo() {
    return <Title order={2}>二级标题</Title>
}`,
        Transition: `import { useState } from 'react'
import { Button, Paper, Transition } from '@react-ui/ui'

export default function TransitionBasicDemo() {
    const [mounted, setMounted] = useState(false)
    return (
        <>
            <Button onClick={() => setMounted(m => !m)}>切换显隐</Button>
            <Transition mounted={mounted} transition="fade">
                {styles => <Paper style={{ ...styles, marginTop: 12, padding: 24 }}>淡入淡出内容</Paper>}
            </Transition>
        </>
    )
}`,
        UnstyledButton: `import { UnstyledButton } from '@react-ui/ui'

export default function UnstyledButtonBasicDemo() {
    return <UnstyledButton>无样式按钮</UnstyledButton>
}`,
        VisuallyHidden: `import { VisuallyHidden } from '@react-ui/ui'

export default function VisuallyHiddenBasicDemo() {
    return (
        <button style={{ fontSize: 24 }}>
            <VisuallyHidden>仅屏幕阅读器可读</VisuallyHidden>
            <span aria-hidden>🚀</span>
        </button>
    )
}`
    }
    return (
        codes[component] ??
        `import { ${component} } from '@react-ui/ui'\n\nexport default function ${component}BasicDemo() {\n    return <${component} />\n}`
    )
}

function renderVariantCode(component: string): string {
    const codes: Record<string, string> = {
        ActionIcon: `import { ActionIcon, Group } from '@react-ui/ui'
import { Settings } from 'lucide-react'

const VARIANTS = ['filled', 'light', 'outline', 'transparent', 'white', 'subtle', 'default', 'gradient']

export default function ActionIconVariantDemo() {
    return (
        <Group>
            {VARIANTS.map(variant => (
                <ActionIcon key={variant} variant={variant} color="blue">
                    <Settings size={18} />
                </ActionIcon>
            ))}
        </Group>
    )
}`,
        Loader: `import { Group, Loader } from '@react-ui/ui'

export default function LoaderVariantDemo() {
    return (
        <Group>
            <Loader type="oval" />
            <Loader type="bars" />
            <Loader type="dots" />
        </Group>
    )
}`,
        Text: `import { Stack, Text } from '@react-ui/ui'

export default function TextVariantDemo() {
    return (
        <Stack>
            <Text variant="text">text 变体</Text>
            <Text variant="gradient" gradient={{ from: 'grape', to: 'blue', deg: 45 }}>
                gradient 渐变文本
            </Text>
        </Stack>
    )
}`
    }
    return codes[component] ?? ''
}

function generatePage(config: ComponentPageConfig): string {
    const { name, description, hasVariant, variantTitle, variantDescription } = config
    const basicCode = renderBasicCode(name)
    const variantCode = renderVariantCode(name)

    let imports = `import { Demo } from '@/components/Demo'
import { ApiTable } from '@/components/ApiTable'
import { StylesApiTable } from '@/components/StylesApiTable'
import BasicDemo from '@/demos/${name}/Basic'`

    if (hasVariant) {
        imports += `\nimport VariantDemo from '@/demos/${name}/Variant'`
    }

    let body = `# ${name}

${description}

## 基础使用

<Demo
    title="基础用法"
    description="${name} 基础用法示例"
    code={\`${basicCode}\`}
>
    <BasicDemo />
</Demo>`

    if (hasVariant) {
        body += `\n\n## ${variantTitle}\n\n<Demo\n    title="${variantTitle}"\n    description="${variantDescription}"\n    code={\`${variantCode}\`}\n>\n    <VariantDemo />\n</Demo>`
    }

    body += `\n\n## API\n\n<ApiTable component="${name}" />\n\n## Styles API\n\n<StylesApiTable component="${name}" />\n`

    return `${imports}\n\n${body}`
}

function main() {
    const pagesDir = path.join(__dirname, '../app/components')

    for (const config of COMPONENTS) {
        const dir = path.join(pagesDir, kebabCase(config.name))
        const file = path.join(dir, 'page.mdx')
        if (fs.existsSync(file)) {
            console.log(`[generate-pages] skip existing ${file}`)
            continue
        }
        fs.mkdirSync(dir, { recursive: true })
        fs.writeFileSync(file, generatePage(config), 'utf-8')
        console.log(`[generate-pages] created ${file}`)
    }
}

main()
