'use client'

import { EmptyState, Button } from '@react-ui/ui'

export default function EmptyStateBasicDemo() {
    return (
        <EmptyState
            icon={<span style={{ fontSize: 32 }}>📦</span>}
            title="暂无数据"
            description="当前列表为空，点击下方按钮创建第一条记录。"
        >
            <EmptyState.Actions>
                <Button>创建记录</Button>
            </EmptyState.Actions>
        </EmptyState>
    )
}
