import { Button, Anchor, type DataTableColumn } from '@xiaoye-react/ui'
import { PageContainer, ProTable, type ProTableRequestParams, type ProTableRequestResult } from '@xiaoye-react/pro'
import { LuRefreshCw } from 'react-icons/lu'
import { useCallback, useMemo, useRef } from 'react'
import { HealthBadge } from '../components/HealthBadge'
import { ServiceIcon } from '../components/ServiceIcon'
import { useHealthChecks } from '../api/use-health'
import { SERVICES, SERVICE_GROUPS, type ServiceDef, type ServiceGroup } from '../config/services'
import { useConsoleSettings } from '../settings/ConsoleSettingsContext'

interface ServiceRow extends ServiceDef {
    healthStatus?: 'up' | 'down'
    latencyMs?: number | null
}

export function ServicesPage() {
    const { settings } = useConsoleSettings()
    const { results, running, refresh } = useHealthChecks(SERVICES, { intervalSec: settings.healthIntervalSec })

    // request 闭包读取 ref 中的最新健康数据，避免依赖变化触发 ProTable 重挂载
    const resultsRef = useRef(results)
    resultsRef.current = results

    const rows = useMemo<ServiceRow[]>(
        () =>
            SERVICES.map((s) => ({
                ...s,
                healthStatus: results[s.id]?.status,
                latencyMs: results[s.id]?.latencyMs
            })),
        [results]
    )
    const rowsRef = useRef(rows)
    rowsRef.current = rows

    const request = useCallback(async (params: ProTableRequestParams): Promise<ProTableRequestResult<ServiceRow>> => {
        const { page, pageSize, search, sortStatus } = params
        const keyword = typeof search?.keyword === 'string' ? search.keyword.trim() : ''
        const group = typeof search?.group === 'string' ? (search.group as ServiceGroup | '全部') : '全部'

        let list = rowsRef.current
        if (group && group !== '全部') {
            list = list.filter((r) => r.group === group)
        }
        if (keyword) {
            const kw = keyword.toLowerCase()
            list = list.filter(
                (r) =>
                    r.name.toLowerCase().includes(kw) ||
                    r.url.toLowerCase().includes(kw) ||
                    (r.description ?? '').toLowerCase().includes(kw)
            )
        }
        if (sortStatus && sortStatus.direction) {
            const accessor = String(sortStatus.accessor)
            const dir = sortStatus.direction === 'asc' ? 1 : -1
            list = [...list].sort((a, b) => {
                const va = a[accessor as keyof ServiceRow]
                const vb = b[accessor as keyof ServiceRow]
                if (va == null) return 1
                if (vb == null) return -1
                if (typeof va === 'number' && typeof vb === 'number') return (va - vb) * dir
                return String(va).localeCompare(String(vb), 'zh-CN') * dir
            })
        }

        const start = (page - 1) * pageSize
        return { records: list.slice(start, start + pageSize), total: list.length }
    }, [])

    const healthRefresh = useCallback(() => {
        void refresh()
    }, [refresh])

    const columns: DataTableColumn<ServiceRow>[] = [
        {
            accessor: 'name',
            title: '名称',
            sortable: true,
            render: (row) => (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                    <ServiceIcon icon={row.icon} size={16} />
                    <span>
                        {row.name}
                        {row.description && (
                            <span style={{ display: 'block', fontSize: 12, opacity: 0.6 }}>{row.description}</span>
                        )}
                    </span>
                </span>
            )
        },
        { accessor: 'group', title: '分组', sortable: true },
        {
            accessor: 'url',
            title: '入口',
            render: (row) =>
                row.url ? (
                    <Anchor href={row.url} target="_blank" rel="noopener noreferrer" fz="sm">
                        {row.url.replace(/^https?:\/\//, '')}
                    </Anchor>
                ) : (
                    <span style={{ opacity: 0.5 }}>内网服务</span>
                )
        },
        { accessor: 'internalPort', title: 'NAS 端口', textAlign: 'right' },
        {
            accessor: 'latencyMs',
            title: '健康',
            sortable: true,
            render: (row) =>
                row.checkable ? (
                    <HealthBadge
                        result={
                            row.healthStatus
                                ? {
                                      id: row.id,
                                      status: row.healthStatus,
                                      latencyMs: row.latencyMs ?? null,
                                      checkedAt: resultsRef.current[row.id]?.checkedAt ?? Date.now(),
                                      error: resultsRef.current[row.id]?.error
                                  }
                                : undefined
                        }
                        checking={running}
                    />
                ) : (
                    <span style={{ opacity: 0.5, fontSize: 12 }}>不探测</span>
                )
        }
    ]

    return (
        <PageContainer title="服务管理" subtitle="服务清单与健康状态 · 每 60s 自动巡检（可在设置中调整）">
            <ProTable
                columns={columns}
                request={request}
                rowKey={(row) => row.id}
                defaultPageSize={10}
                search={{
                    fields: [
                        { name: 'keyword', label: '关键词', type: 'text', placeholder: '名称 / 域名 / 描述' },
                        {
                            name: 'group',
                            label: '分组',
                            type: 'select',
                            data: ['全部', ...SERVICE_GROUPS]
                        }
                    ]
                }}
                defaultSearchValues={{ group: '全部' }}
                toolbar={
                    <Button
                        variant="light"
                        leftSection={<LuRefreshCw size={15} />}
                        loading={running}
                        onClick={healthRefresh}
                    >
                        立即巡检
                    </Button>
                }
                dataTableProps={{ striped: true, highlightOnHover: true }}
            />
        </PageContainer>
    )
}
