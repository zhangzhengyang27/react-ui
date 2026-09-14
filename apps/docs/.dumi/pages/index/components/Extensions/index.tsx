import { useRef } from 'react'
import { FiCheck, FiSearch } from '../../../../theme/icons'
import { useLocation, useNavigate } from 'dumi'
import { Spotlight, spotlight } from '@xiaoye-react/ui'
import { Button, Group, SimpleGrid, Stack, Text, Title } from '@xiaoye-react/ui'
import { notifications } from '@xiaoye-react/notifications'
import Link from '../../../../theme/common/Link'
import * as utils from '../../../../theme/utils'
import { HomePageContainer } from '../shared/Container'
import { HomePageDescription } from '../shared/Description'
import { HomePageLearnMore } from '../shared/LearnMore'
import { HomePageTitle } from '../shared/Title'
import classes from './Extensions.module.css'

const getSpotlightActions = (navigate: (path: string) => void, localized: (path: string) => string) => [
    {
        id: 'notifications',
        label: '通知系统',
        description: '查看通知系统文档',
        onClick: () => navigate(localized('/docs/x/notifications'))
    },
    {
        id: 'spotlight',
        label: 'Spotlight',
        description: '查看 Spotlight 文档',
        onClick: () => navigate(localized('/docs/x/spotlight'))
    },
    {
        id: 'carousel',
        label: 'Carousel',
        description: '查看 Carousel 文档',
        onClick: () => navigate(localized('/docs/x/carousel'))
    },
    {
        id: 'tiptap',
        label: '富文本编辑器',
        description: '查看 Tiptap 文档',
        onClick: () => navigate(localized('/docs/x/tiptap'))
    }
]

const officialExtensions = [
    {
        name: '@xiaoye-react/dates',
        label: '日期选择器',
        description: '日历、日期/时间选择器及日期相关组件',
        href: '/docs/dates/getting-started'
    },
    {
        name: '@xiaoye-react/carousel',
        label: 'Carousel',
        description: '基于 embla-carousel 的轮播组件',
        href: '/docs/x/carousel'
    },
    {
        name: '@xiaoye-react/tiptap',
        label: '富文本编辑器',
        description: '基于 tiptap 的富文本编辑器',
        href: '/docs/x/tiptap'
    },
    {
        name: '@xiaoye-react/ui',
        label: 'Dropzone',
        description: '基于 react-dropzone 的拖拽文件上传组件',
        href: '/docs/x/dropzone'
    },
    {
        name: '@xiaoye-react/ui',
        label: '弹窗管理器',
        description: '以声明式 API 管理模态框',
        href: '/docs/x/modals'
    }
]

interface ExtensionDemoProps {
    title: string
    description: string
    children: React.ReactNode
}

function ExtensionDemo({ title, description, children }: ExtensionDemoProps) {
    return (
        <section className={classes.demo}>
            <header className={classes.demoHeader}>
                <Title order={3} className={classes.demoTitle}>
                    {title}
                </Title>
                <Text className={classes.demoDescription}>{description}</Text>
            </header>
            <div className={classes.demoArea}>{children}</div>
        </section>
    )
}

export function Extensions() {
    const navigate = useNavigate()
    const { pathname, search } = useLocation()
    const localized = (path: string) => utils.getLocalizedPathname(path, utils.isZhCN(pathname), search)

    const timeoutRef = useRef<number>(-1)

    return (
        <section className={classes.root}>
            <HomePageContainer>
                <HomePageTitle order={2}>扩展</HomePageTitle>

                <HomePageDescription className={classes.description}>
                    扩展是为 ReactUI 提供额外功能的附加包，例如富文本编辑器、通知系统、图表、模态框管理器等。
                    它们易于集成到你的应用中，提供无缝的使用体验。
                </HomePageDescription>

                <HomePageLearnMore href="/docs/x/extensions">浏览全部扩展</HomePageLearnMore>

                <SimpleGrid cols={{ md: 2 }} className={classes.grid} verticalSpacing={30}>
                    <ExtensionDemo title="通知系统" description="在应用的任何位置显示、更新或隐藏通知">
                        <Group justify="center">
                            <Button
                                className={classes.demoControl}
                                variant="default"
                                radius="md"
                                size="lg"
                                onClick={() => {
                                    window.clearTimeout(timeoutRef.current)
                                    const id = notifications.show({
                                        id: 'home-page-demo',
                                        withBorder: true,
                                        loading: true,
                                        title: '正在加载数据',
                                        radius: 'md',
                                        message: '数据将在 3 秒内加载完成，当前不可关闭',
                                        autoClose: false,
                                        withCloseButton: false
                                    })

                                    timeoutRef.current = window.setTimeout(() => {
                                        notifications.update({
                                            id,
                                            color: 'teal',
                                            withBorder: true,
                                            title: '数据已加载',
                                            radius: 'md',
                                            message: '通知将在 2 秒后自动关闭，你现在可以手动关闭此通知',
                                            icon: <FiCheck size={18} />,
                                            loading: false,
                                            autoClose: 2000
                                        })
                                    }, 3000)
                                }}
                            >
                                显示通知
                            </Button>
                        </Group>
                    </ExtensionDemo>

                    <Stack>
                        <ExtensionDemo title="Spotlight" description="Ctrl + K 命令面板，可用于搜索或执行常用操作">
                            <Group justify="center">
                                <Button
                                    className={classes.demoControl}
                                    size="lg"
                                    radius="md"
                                    variant="default"
                                    rightSection={<FiSearch size={20} color="var(--ui-color-dimmed)" />}
                                    miw={300}
                                    justify="space-between"
                                    onClick={spotlight.open}
                                >
                                    打开搜索面板
                                </Button>
                            </Group>
                            <Spotlight
                                actions={getSpotlightActions(navigate, localized)}
                                nothingFound="未找到..."
                                highlightQuery
                                shortcut={['mod + K', '/']}
                                searchProps={{
                                    leftSection: <FiSearch size={20} />,
                                    placeholder: '搜索...'
                                }}
                            />
                        </ExtensionDemo>

                        <ExtensionDemo title="官方扩展" description="官方维护的附加包，覆盖日期、图表、编辑等专业场景">
                            <SimpleGrid cols={2} spacing="sm">
                                {officialExtensions.map(ext => (
                                    <Link
                                        key={ext.name}
                                        href={localized(ext.href)}
                                        className={classes.extensionCard}
                                        aria-label={`${ext.label}（${ext.name}）`}
                                    >
                                        <Text className={classes.extensionName}>{ext.label}</Text>
                                        <Text className={classes.extensionDesc}>{ext.description}</Text>
                                    </Link>
                                ))}
                            </SimpleGrid>
                        </ExtensionDemo>
                    </Stack>
                </SimpleGrid>
            </HomePageContainer>
        </section>
    )
}
