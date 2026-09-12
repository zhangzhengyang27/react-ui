import { Badge, Group, Loader, Tooltip } from '@xiaoye-react/ui'
import dayjs from 'dayjs'
import type { HealthResult } from '../api/health'

export interface HealthBadgeProps {
    /** undefined = 尚未检查过 */
    result?: HealthResult
    /** 检查进行中（且尚无结果）时显示 loading 态 */
    checking?: boolean
}

export function HealthBadge({ result, checking }: HealthBadgeProps) {
    if (!result) {
        if (checking) {
            return (
                <Group gap={6} wrap="nowrap">
                    <Loader size={12} type="dots" />
                    <Badge color="gray" variant="light">检查中…</Badge>
                </Group>
            )
        }
        return <Badge color="gray" variant="light">未检查</Badge>
    }

    const checkedAt = dayjs(result.checkedAt).format('HH:mm:ss')

    // flexShrink: 0 —— 卡片窄时避免延迟徽标被压缩截断
    if (result.status === 'up') {
        return (
            <Tooltip label={`最近检查 ${checkedAt}`}>
                <Badge color="green" variant="light" style={{ flexShrink: 0 }}>
                    {result.latencyMs}ms
                </Badge>
            </Tooltip>
        )
    }

    return (
        <Tooltip label={`${result.error ?? '网络不可达'} · ${checkedAt}`}>
            <Badge color="red" variant="light" style={{ flexShrink: 0 }}>
                不可达
            </Badge>
        </Tooltip>
    )
}
