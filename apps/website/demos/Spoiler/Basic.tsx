'use client'

import { Spoiler } from '@react-ui/ui'

export default function BasicDemo() {
    return (
        <Spoiler maxHeight={60} showLabel="展开" hideLabel="收起">
            <p>
                这是一段用于演示 Spoiler 组件折叠效果的长文本。当内容高度超过 maxHeight
                时，组件会自动显示展开按钮，用户可以点击按钮查看完整内容。该组件非常适合在详情页、评论列表或商品描述中使用，能够在有限的页面空间内保留完整信息的可读性。
            </p>
        </Spoiler>
    )
}
