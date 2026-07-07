import React from 'react'
import { Breadcrumbs, Anchor } from '@react-ui/ui'

const Basic: React.FC = () => {
    return (
        <Breadcrumbs>
            <Anchor href="#">首页</Anchor>
            <Anchor href="#">分类</Anchor>
            <Anchor href="#">详情</Anchor>
        </Breadcrumbs>
    )
}

export default Basic
