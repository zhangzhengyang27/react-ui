import {
    ActionIcon,
    AppShell,
    Burger,
    Group,
    NavLink,
    Text,
    Title,
    Tooltip as UITooltip,
    UnstyledButton
} from '@xiaoye-react/ui'
import { Spotlight, openSpotlight, type SpotlightActionData } from '@xiaoye-react/spotlight'
import {
    LuChartPie,
    LuLayoutDashboard,
    LuMonitor,
    LuMoon,
    LuSearch,
    LuSettings,
    LuSun,
    LuTable
} from 'react-icons/lu'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useDisclosure } from '@xiaoye-react/hooks'
import { SERVICES } from '../config/services'
import { useConsoleSettings } from '../settings/ConsoleSettingsContext'

const NAV_ITEMS = [
    { to: '/', label: '总览', icon: LuLayoutDashboard },
    { to: '/analytics', label: '访问分析', icon: LuChartPie },
    { to: '/services', label: '服务管理', icon: LuTable },
    { to: '/settings', label: '设置', icon: LuSettings }
] as const

function ThemeToggle() {
    const { settings, update } = useConsoleSettings()
    const next = settings.theme === 'light' ? 'dark' : settings.theme === 'dark' ? 'auto' : 'light'
    const Icon = settings.theme === 'dark' ? LuMoon : settings.theme === 'light' ? LuSun : LuMonitor

    return (
        <UITooltip label={`主题：${settings.theme === 'auto' ? '跟随系统' : settings.theme === 'dark' ? '深色' : '浅色'}（点击切换）`}>
            <ActionIcon variant="default" size="lg" onClick={() => update({ theme: next })} aria-label="切换主题">
                <Icon size={17} />
            </ActionIcon>
        </UITooltip>
    )
}

export function AppLayout() {
    const location = useLocation()
    const navigate = useNavigate()
    const [navOpened, { toggle: toggleNav }] = useDisclosure(true)

    const spotlightActions: SpotlightActionData[] = [
        ...NAV_ITEMS.map((item) => ({
            id: `nav-${item.to}`,
            title: item.label,
            description: '页面导航',
            onClick: () => navigate(item.to)
        })),
        ...SERVICES.filter((s) => s.url).map((s) => ({
            id: `svc-${s.id}`,
            title: s.name,
            description: `${s.group}${s.description ? ` · ${s.description}` : ''}`,
            onClick: () => window.open(s.url, '_blank', 'noopener')
        }))
    ]

    return (
        <AppShell header={{ height: 56 }} navbar={{ width: 220, collapsed: !navOpened }} padding="md">
            <AppShell.Header>
                <Group h="100%" px="md" justify="space-between" wrap="nowrap">
                    <Group gap="sm" wrap="nowrap">
                        <Burger opened={navOpened} onClick={toggleNav} size="sm" />
                        <Title order={4} mb={0}>NAS 控制台</Title>
                    </Group>
                    <Group gap="xs" wrap="nowrap">
                        <ActionIcon variant="default" size="lg" onClick={() => openSpotlight()} aria-label="搜索服务">
                            <LuSearch size={17} />
                        </ActionIcon>
                        <ThemeToggle />
                    </Group>
                </Group>
            </AppShell.Header>

            <AppShell.Navbar p="xs">
                {NAV_ITEMS.map((item) => (
                    <NavLink
                        key={item.to}
                        active={location.pathname === item.to}
                        label={item.label}
                        leftSection={<item.icon size={18} />}
                        onClick={() => navigate(item.to)}
                    />
                ))}
                <UnstyledButton
                    mt="auto"
                    mb="xs"
                    px="sm"
                    onClick={() => openSpotlight()}
                    style={{ fontSize: 12, opacity: 0.65, textAlign: 'center' }}
                >
                    按 ⌘K 快速搜索服务
                </UnstyledButton>
            </AppShell.Navbar>

            <AppShell.Main>
                <Outlet />
            </AppShell.Main>

            <Spotlight
                actions={spotlightActions}
                nothingFound="未找到匹配的服务或页面"
                searchProps={{ placeholder: '搜索服务或页面…' }}
            />
        </AppShell>
    )
}
