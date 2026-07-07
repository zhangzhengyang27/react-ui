'use client'

import { Breadcrumbs, Anchor } from '@react-ui/ui'

export default function BreadcrumbsBasicDemo() {
    return (
        <Breadcrumbs>
            <Anchor href="#">首页</Anchor>
            <Anchor href="#">分类</Anchor>
            <Anchor href="#">详情</Anchor>
        </Breadcrumbs>
    )
}
