import { useInterval } from '@xiaoye-react/hooks'
import { Alert, Box, Card, Group, SimpleGrid, Text, Title } from '@xiaoye-react/ui'
import { AreaChart, DonutChart } from '@xiaoye-react/charts'
import { PageContainer } from '@xiaoye-react/pro'
import { LuTriangleAlert } from 'react-icons/lu'
import dayjs from 'dayjs'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { HealthBadge } from '../components/HealthBadge'
import { ServiceIcon } from '../components/ServiceIcon'
import { StatTile } from '../components/StatTile'
import { useHealthChecks } from '../api/use-health'
import type { HealthResult } from '../api/health'
import {
    fetchUmamiActive,
    fetchUmamiMetrics,
    fetchUmamiPageviews,
    fetchUmamiStats,
    resolveRange,
    UmamiAuthError,
    UmamiError,
    type UmamiMetric,
    type UmamiPageviews,
    type UmamiStats
} from '../api/umami'
import { SERVICES, SERVICE_GROUPS, type ServiceDef } from '../config/services'
import { useConsoleSettings } from '../settings/ConsoleSettingsContext'

const DONUT_PALETTE = ['indigo.6', 'teal.6', 'violet.6', 'orange.6', 'pink.6', 'cyan.6']

function ServiceCard({ service, result, checking }: { service: ServiceDef; result?: HealthResult; checking: boolean }) {
    const clickable = Boolean(service.url)
    const body = (
        <>
            <Group justify="space-between" wrap="nowrap" mb={6}>
                <Group gap="xs" wrap="nowrap">
                    <ServiceIcon icon={service.icon} />
                    <Text fw={600} fz="sm" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {service.name}
                    </Text>
                </Group>
                <HealthBadge result={result} checking={checking} />
            </Group>
            {service.description && (
                <Text size="xs" c="dimmed" lineClamp={1}>
                    {service.description}
                </Text>
            )}
            {service.url && (
                <Text size="xs" c="dimmed" mt={2} style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {service.url.replace(/^https?:\/\//, '')}
                </Text>
            )}
        </>
    )

    if (!clickable) {
        return (
            <Card withBorder radius="md" padding="sm" style={{ opacity: 0.75 }}>
                {body}
            </Card>
        )
    }

    return (
        <a
            href={service.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none', color: 'inherit' }}
        >
            <Card withBorder radius="md" padding="sm" style={{ cursor: 'pointer' }}>
                {body}
            </Card>
        </a>
    )
}

interface UmamiDashboardData {
    stats?: UmamiStats
    pageviews?: UmamiPageviews
    browsers?: UmamiMetric[]
    active?: number
}

/** 总览页 Umami 数据：近 24h 统计 + 趋势 + 浏览器分布 + 实时在线，5 分钟刷新 */
function useUmamiDashboard() {
    const { settings } = useConsoleSettings()
    const creds = useMemo(
        () => ({
            baseUrl: settings.umamiUrl,
            username: settings.umamiUsername,
            password: settings.umamiPassword
        }),
        [settings.umamiUrl, settings.umamiUsername, settings.umamiPassword]
    )
    const enabled = Boolean(settings.dashboardSiteId && settings.umamiUsername)

    const [data, setData] = useState<UmamiDashboardData>({})
    const [error, setError] = useState<string>()
    const [loading, setLoading] = useState(false)

    const load = useCallback(async () => {
        if (!enabled) return
        setLoading(true)
        setError(undefined)
        try {
            const { startAt, endAt, unit } = resolveRange('24h')
            const [stats, pageviews, browsers, active] = await Promise.all([
                fetchUmamiStats(creds, settings.dashboardSiteId, startAt, endAt),
                fetchUmamiPageviews(creds, settings.dashboardSiteId, { startAt, endAt, unit }),
                fetchUmamiMetrics(creds, settings.dashboardSiteId, 'browser', startAt, endAt),
                fetchUmamiActive(creds, settings.dashboardSiteId)
            ])
            setData({ stats, pageviews, browsers: browsers.slice(0, 6), active })
        } catch (e) {
            setData({})
            setError(
                e instanceof UmamiAuthError
                    ? e.message
                    : `Umami 请求失败：${e instanceof UmamiError || e instanceof Error ? e.message : String(e)}`
            )
        } finally {
            setLoading(false)
        }
    }, [creds, enabled, settings.dashboardSiteId])

    useEffect(() => {
        void load()
    }, [load])
    useInterval(load, 5 * 60_000, { autoInvoke: true })

    return { ...data, error, loading, enabled }
}

export function DashboardPage() {
    const { settings } = useConsoleSettings()
    const { results, running } = useHealthChecks(SERVICES, { intervalSec: settings.healthIntervalSec })
    const umami = useUmamiDashboard()

    const checkable = SERVICES.filter((s) => s.checkable)
    const upCount = checkable.filter((s) => results[s.id]?.status === 'up').length
    const downCount = checkable.filter((s) => results[s.id]?.status === 'down').length
    const checkedCount = checkable.filter((s) => results[s.id]).length
    const avgLatency = (() => {
        const latencies = checkable
            .map((s) => results[s.id]?.latencyMs)
            .filter((n): n is number => typeof n === 'number')
        return latencies.length ? Math.round(latencies.reduce((a, b) => a + b, 0) / latencies.length) : null
    })()

    // pageviews/sessions 两个系列按时间点合并为行数据
    const trendRows = useMemo(() => {
        const pv = umami.pageviews?.pageviews ?? []
        const sessions = umami.pageviews?.sessions ?? []
        return pv.map((p, i) => ({
            time: p.x.length > 10 ? p.x.slice(11, 16) : p.x.slice(5, 10),
            pageviews: p.y,
            sessions: sessions[i]?.y ?? 0
        }))
    }, [umami.pageviews])

    return (
        <PageContainer
            title="总览"
            subtitle={`每 ${Math.max(15, settings.healthIntervalSec)}s 自动巡检 · 更新于 ${dayjs().format('HH:mm:ss')}`}
        >
            <SimpleGrid cols={{ base: 1, xs: 2, lg: 4 }} spacing="md" mb="lg">
                <StatTile
                    label="服务在线"
                    value={checkedCount ? `${upCount} / ${checkedCount}` : '—'}
                    hint={`不可达 ${downCount} 个`}
                />
                <StatTile
                    label="平均延迟"
                    value={avgLatency != null ? `${avgLatency}ms` : '—'}
                    hint="可达服务平均响应"
                />
                <StatTile
                    label="实时在线"
                    value={umami.enabled ? umami.active ?? '—' : '未配置'}
                    hint="Umami 最近 5 分钟访客"
                    loading={umami.loading && umami.active === undefined}
                />
                <StatTile
                    label="近 24h PV"
                    value={umami.enabled && umami.stats ? umami.stats.pageviews : '未配置'}
                    hint={umami.stats ? `UV ${umami.stats.visitors}` : '到「设置」页配置 Umami'}
                    sparkline={trendRows.map((r) => r.pageviews)}
                    sparklineColor="indigo.6"
                    loading={umami.loading && !umami.stats}
                />
            </SimpleGrid>

            {umami.error && (
                <Alert
                    icon={<LuTriangleAlert size={16} />}
                    color="yellow"
                    title="Umami 数据不可用"
                    mb="lg"
                >
                    {umami.error}（请到「设置」页检查配置）
                </Alert>
            )}

            {SERVICE_GROUPS.map((group) => {
                const groupServices = SERVICES.filter((s) => s.group === group)
                if (groupServices.length === 0) return null
                return (
                    <Box key={group} mb="lg">
                        <Title order={5} mb="sm">
                            {group}
                        </Title>
                        <SimpleGrid cols={{ base: 1, xs: 2, lg: 4 }} spacing="sm">
                            {groupServices.map((service) => (
                                <ServiceCard
                                    key={service.id}
                                    service={service}
                                    result={results[service.id]}
                                    checking={running && service.checkable}
                                />
                            ))}
                        </SimpleGrid>
                    </Box>
                )
            })}

            {umami.enabled && (
                <SimpleGrid cols={{ base: 1, lg: 2 }} spacing="md">
                    <Box>
                        <Title order={5} mb="sm">
                            访问趋势（近 24h）
                        </Title>
                        <Card withBorder radius="md" padding="sm">
                            <AreaChart
                                h={260}
                                data={trendRows}
                                dataKey="time"
                                series={[
                                    { name: 'pageviews', color: 'indigo.6' },
                                    { name: 'sessions', color: 'teal.6' }
                                ]}
                                withLegend
                                unit="次"
                            />
                        </Card>
                    </Box>
                    <Box>
                        <Title order={5} mb="sm">
                            浏览器分布（近 24h）
                        </Title>
                        <Card withBorder radius="md" padding="sm">
                            <DonutChart
                                h={260}
                                withLegend
                                unit="次"
                                data={(umami.browsers ?? []).map((b, i) => ({
                                    name: b.x,
                                    value: b.y,
                                    color: DONUT_PALETTE[i % DONUT_PALETTE.length]
                                }))}
                            />
                        </Card>
                    </Box>
                </SimpleGrid>
            )}
        </PageContainer>
    )
}
