'use client'

import { EmptyState, Group } from '@react-ui/ui'

export default function EmptyStateVariantDemo() {
    return (
        <Group justify="center" gap="xl">
            <EmptyState
                variant="filled"
                color="blue"
                icon={<span style={{ fontSize: 32 }}>🔍</span>}
                title="未找到结果"
                description="请尝试更换关键词或筛选条件。"
            />
            <EmptyState
                variant="light"
                color="red"
                icon={<span style={{ fontSize: 32 }}>⚠️</span>}
                title="出错了"
                description="请刷新页面或稍后再试。"
            />
        </Group>
    )
}
