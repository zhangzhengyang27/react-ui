import { showNotification } from '@xiaoye-react/notifications'
import {
    Button,
    Card,
    Divider,
    Group,
    NumberInput,
    PasswordInput,
    SegmentedControl,
    Select,
    Text,
    TextInput,
    Title
} from '@xiaoye-react/ui'
import { PageContainer } from '@xiaoye-react/pro'
import { useEffect, useState } from 'react'
import { fetchUmamiWebsites, UmamiAuthError, type UmamiWebsite } from '../api/umami'
import { useConsoleSettings } from '../settings/ConsoleSettingsContext'

export function SettingsPage() {
    const { settings, update } = useConsoleSettings()

    const [umamiUrl, setUmamiUrl] = useState(settings.umamiUrl)
    const [username, setUsername] = useState(settings.umamiUsername)
    const [password, setPassword] = useState(settings.umamiPassword)
    const [siteId, setSiteId] = useState(settings.dashboardSiteId)
    const [sites, setSites] = useState<UmamiWebsite[]>([])
    const [testing, setTesting] = useState(false)

    useEffect(() => {
        setUmamiUrl(settings.umamiUrl)
        setUsername(settings.umamiUsername)
        setPassword(settings.umamiPassword)
        setSiteId(settings.dashboardSiteId)
        // 仅在挂载时同步一次，避免测试连接后覆盖用户输入
    }, [])

    const saveUmami = (site?: string) =>
        update({
            umamiUrl: umamiUrl.trim().replace(/\/+$/, ''),
            umamiUsername: username.trim(),
            umamiPassword: password,
            dashboardSiteId: site ?? siteId
        })

    async function testConnection() {
        setTesting(true)
        try {
            saveUmami()
            const list = await fetchUmamiWebsites({
                baseUrl: umamiUrl.trim().replace(/\/+$/, ''),
                username: username.trim(),
                password
            })
            setSites(list)
            showNotification({
                title: '连接成功',
                message: `已获取 ${list.length} 个站点`,
                color: 'green'
            })
        } catch (e) {
            showNotification({
                title: e instanceof UmamiAuthError ? '授权失败' : '连接失败',
                message: e instanceof Error ? e.message : String(e),
                color: 'red'
            })
        } finally {
            setTesting(false)
        }
    }

    return (
        <PageContainer title="设置" subtitle="配置保存在浏览器 localStorage，仅本机生效，不会上传">
            <Card withBorder radius="md" mb="md">
                <Title order={5} mb="sm">外观</Title>
                <Group gap="sm">
                    <Text size="sm" c="dimmed">主题</Text>
                    <SegmentedControl
                        value={settings.theme}
                        onChange={(v) => update({ theme: v as 'light' | 'dark' | 'auto' })}
                        data={[
                            { label: '浅色', value: 'light' },
                            { label: '深色', value: 'dark' },
                            { label: '跟随系统', value: 'auto' }
                        ]}
                    />
                </Group>
            </Card>

            <Card withBorder radius="md" mb="md">
                <Title order={5} mb="sm">健康检查</Title>
                <Group gap="sm" align="center">
                    <Text size="sm" c="dimmed">巡检间隔（秒）</Text>
                    <NumberInput
                        w={120}
                        min={15}
                        max={600}
                        step={5}
                        value={settings.healthIntervalSec}
                        onChange={(v) => update({ healthIntervalSec: Number(v) || 60 })}
                    />
                    <Text size="xs" c="dimmed">最短 15 秒；间隔越短对目标站点请求越频繁</Text>
                </Group>
            </Card>

            <Card withBorder radius="md">
                <Title order={5} mb="sm">Umami 访问分析</Title>
                <Text size="xs" c="dimmed" mb="sm">
                    凭据仅保存在本浏览器 localStorage，请勿在公用电脑保存。
                </Text>
                <Group grow mb="sm">
                    <TextInput
                        label="部署地址"
                        placeholder="https://analytics.zhangzhengyang.com"
                        value={umamiUrl}
                        onChange={(e) => setUmamiUrl(e.currentTarget.value)}
                    />
                    <TextInput
                        label="用户名"
                        value={username}
                        onChange={(e) => setUsername(e.currentTarget.value)}
                    />
                    <PasswordInput
                        label="密码"
                        value={password}
                        onChange={(e) => setPassword(e.currentTarget.value)}
                    />
                </Group>
                <Group mb="sm">
                    <Button loading={testing} onClick={testConnection}>
                        保存并测试连接
                    </Button>
                    {sites.length > 0 && (
                        <Select
                            w={280}
                            label="总览页默认站点"
                            placeholder="选择站点"
                            data={sites.map((s) => ({ value: s.id, label: s.name }))}
                            value={siteId || null}
                            onChange={(v) => {
                                setSiteId(v ?? '')
                                update({ dashboardSiteId: v ?? '' })
                            }}
                            searchable
                            clearable
                        />
                    )}
                </Group>
                <Divider />
                <Text size="xs" c="dimmed" mt="sm">
                    Umami API 采用浏览器直连（官方 /api/* 开放 CORS）；token 缓存在 sessionStorage，关闭标签页即失效。
                </Text>
            </Card>
        </PageContainer>
    )
}
