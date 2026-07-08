'use client'

import { Skeleton } from '@react-ui/ui'

export default function SkeletonTemplateDemo() {
    return (
        <Skeleton>
            <div style={{ padding: 16, width: 280 }}>
                <h3 style={{ margin: 0 }}>文章标题</h3>
                <p style={{ margin: '8px 0 0' }}>这是一段示例内容，真实加载时会替换骨架屏。</p>
            </div>
        </Skeleton>
    )
}
