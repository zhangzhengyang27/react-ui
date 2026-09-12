import { useInterval } from '@xiaoye-react/hooks'
import {
    Alert,
    Box,
    Card,
    Group,
    Paper,
    SegmentedControl,
    Select,
    SimpleGrid,
    Table,
    Text,
    Title
} from '@xiaoye-react/ui'
import { AreaChart, BarChart } from '@xiaoye-react/charts'
import { PageContainer } from '@xiaoye-react/pro'
import { LuTriangleAlert } from 'react-icons/lu'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { StatTile } from '../components/StatTile'
import {
    fetchUmamiMetrics,
    fetchUmamiPageviews,
    fetchUmamiStats,
    fetchUmamiWebsites,
    resolveRange,
    UmamiAuthError,
    type UmamiCreds,
    type UmamiMetric,
    type UmamiPageviews,
    type UmamiStats,
    type UmamiWebsite
} from '../api/umami'
import { useConsoleSettings } from '../settings/ConsoleSettingsContext'

type RangeKey = '24h' | '7d' | '30d'
type MetricKey = 'path' | 'referrer' | 'browser' | 'os' | 'device'

const RANGE_OPTIONS = [
    { label: '近 24 小时', value: '24h' },
    { label: '近 7 天', value: '7d' },
    { label: '近 30 天', value: '30d' }
]

const METRIC_TABS: { key: MetricKey; label: string }[] = [
    { key: 'path', label: '热门页面' },
    { key: 'referrer', label: '访问来源' },
    { key: 'browser', label: '浏览器' },
    { key: 'os', label: '操作系统' },
    { key: 'device', label: '设备' }
]

function percent(cur: number, prev?: number) {
    if (!prev) return undefined
    const delta = ((cur - prev) / prev) * 100
    const sign = delta > 0 ? '+' : ''
    return `${sign}${delta.toFixed(1)}%`
}

function fmtDuration(seconds: number) {
    if (seconds < 60) return `${Math.round(seconds)}s`
    const m = Math.floor(seconds / 60)
    const s = Math.round(seconds % 60)
    return `${m}m${s ? `${s}s` : ''}`
}

export function AnalyticsPage() {
    const { settings } = useConsoleSettings()
    const creds: UmamiCreds = useMemo(
        () => ({
            baseUrl: settings.umamiUrl,
            username: settings.umamiUsername,
            password: settings.umamiPassword
        }),
        [settings.umamiUrl, settings.umamiUsername, settings.umamiPassword]
    )
    const enabled = Boolean(settings.umamiUsername)

    const [sites, setSites] = useState<UmamiWebsite[]>([])
    const [siteId, setSiteId] = useState<string>(settings.dashboardSiteId)
    const [range, setRange] = useState<RangeKey>('24h')
    const [stats, setStats] = useState<UmamiStats>()
    const [pageviews, setPageviews] = useState<UmamiPageviews>()
    const [metricKey, setMetricKey] = useState<MetricKey>('path')
    const [metric, setMetric] = useState<UmamiMetric[]>([])
    const [error, setError] = useState<string>()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!enabled) return
        fetchUmamiWebsites(creds)
            .then((list) => {
                setSites(list)
                setSiteId((cur) => cur || list[0]?.id || '')
            })
            .catch((e) => setError(e instanceof Error ? e.message : String(e)))
    }, [creds, enabled])

    const load = useCallback(async () => {
        if (!enabled || !siteId) return
        setLoading(true)
        setError(undefined)
        try {
            const { startAt, endAt, unit } = resolveRange(range)
            const [s, p, m] = await Promise.all([
                fetchUmamiStats(creds, siteId, startAt, endAt),
                fetchUmamiPageviews(creds, siteId, { startAt, endAt, unit }),
                fetchUmamiMetrics(creds, siteId, metricKey, startAt, endAt)
            ])
            setStats(s)
            setPageviews(p)
            setMetric(m.slice(0, 10))
        } catch (e) {
            setError(e instanceof UmamiAuthError ? e.message : `Umami 请求失败：${e instanceof Error ? e.message : String(e)}`)
        } finally {
            setLoading(false)
        }
    }, [creds, enabled, siteId, range, metricKey])

    useEffect(() => {
        void load()
    }, [load])
    useInterval(load, 5 * 60_000, { autoInvoke: true })

    const trendRows = useMemo(() => {
        const pv = pageviews?.pageviews ?? []
        const sessions = pageviews?.sessions ?? []
        return pv.map((p, i) => ({
            time: p.x.length > 10 ? p.x.slice(5, 16) : p.x,
            pageviews: p.y,
            sessions: sessions[i]?.y ?? 0
        }))
    }, [pageviews])

    const siteName = sites.find((s) => s.id === siteId)?.name ?? siteId
    const bounceRate =
        stats && stats.visits > 0 ? `${Math.round((stats.bounces / stats.visits) * 100)}%` : undefined
    const bounceRatePrev =
        stats?.comparison && stats.comparison.visits > 0
            ? Math.round((stats.comparison.bounces / stats.comparison.visits) * 100)
            : undefined

    if (!enabled) {
        return (
            <PageContainer title="访问分析" subtitle="Umami 全站访问数据">
                <Alert icon={<LuTriangleAlert size={16} />} color="yellow" title="尚未配置 Umami 账号">
                    请到「设置」页填写 Umami 账号后使用本页。
                </Alert>
            </PageContainer>
        )
    }

    return (
        <PageContainer
            title="访问分析"
            subtitle="Umami 全站访问数据 · 5 分钟自动刷新"
            extra={
                <Group gap="xs">
                    <Select
                        w={260}
                        placeholder="选择站点"
                        data={sites.map((s) => ({ value: s.id, label: s.name }))}
                        value={siteId || null}
                        onChange={(v) => setSiteId(v ?? '')}
                        searchable
                    />
                    <SegmentedControl value={range} onChange={(v) => setRange(v as RangeKey)} data={RANGE_OPTIONS} />
                </Group>
            }
        >
            {error && (
                <Alert icon={<LuTriangleAlert size={16} />} color="yellow" title="数据不可用" mb="md">
                    {error}
                </Alert>
            )}

            <SimpleGrid cols={{ base: 1, xs: 2, lg: 4 }} spacing="md" mb="lg">
                <StatTile
                    label="页面浏览 PV"
                    value={stats?.pageviews ?? '—'}
                    hint={percent(stats?.pageviews ?? 0, stats?.comparison?.pageviews)}
                    loading={loading && !stats}
                />
                <StatTile
                    label="独立访客 UV"
                    value={stats?.visitors ?? '—'}
                    hint={percent(stats?.visitors ?? 0, stats?.comparison?.visitors)}
                    loading={loading && !stats}
                />
                <StatTile
                    label="访问次数"
                    value={stats?.visits ?? '—'}
                    hint={percent(stats?.visits ?? 0, stats?.comparison?.visits)}
                    loading={loading && !stats}
                />
                <StatTile
                    label="跳出率"
                    value={bounceRate ?? '—'}
                    hint={
                        stats?.totaltime
                            ? `平均停留 ${fmtDuration(stats.totaltime / Math.max(1, stats.visits ?? 1))}`
                            : percent(bounceRatePrev ?? 0, bounceRatePrev)
                    }
                    loading={loading && !stats}
                />
            </SimpleGrid>

            <Card withBorder radius="md" padding="sm" mb="lg">
                <Group justify="space-between" mb="xs">
                    <Title order={5}>{siteName} · 访问趋势</Title>
                    <Text size="xs" c="dimmed">
                        PV 对比 Sessions
                    </Text>
                </Group>
                <AreaChart
                    h={280}
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

            <Box>
                <Title order={5} mb="sm">
                    维度分析（Top 10）
                </Title>
                <SegmentedControl
                    mb="md"
                    value={metricKey}
                    onChange={(v) => setMetricKey(v as MetricKey)}
                    data={METRIC_TABS.map((t) => ({ label: t.label, value: t.key }))}
                />
                <Paper withBorder radius="md" p="md">
                    <BarChart
                        h={300}
                        data={metric.map((m) => ({ name: m.x, visits: m.y }))}
                        dataKey="name"
                        series={[{ name: 'visits', color: 'indigo.6' }]}
                        unit="次"
                    />
                    {metric.length > 0 && (
                        <Table mt="md" highlightOnHover verticalSpacing="xs" fz="sm">
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>维度值</Table.Th>
                                    <Table.Th style={{ textAlign: 'right' }}>次数</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {metric.map((m) => (
                                    <Table.Tr key={m.x}>
                                        <Table.Td style={{ wordBreak: 'break-all' }}>{m.x}</Table.Td>
                                        <Table.Td style={{ textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
                                            {m.y}
                                        </Table.Td>
                                    </Table.Tr>
                                ))}
                            </Table.Tbody>
                        </Table>
                    )}
                </Paper>
            </Box>
        </PageContainer>
    )
}
