import React from 'react'
import { Title } from '@react-ui/ui'

const TitleDemo: React.FC = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Title order={1}>h1 标题</Title>
            <Title order={2}>h2 标题</Title>
            <Title order={3}>h3 标题</Title>
            <Title order={4} size="h1">
                h4 但用 h1 尺寸
            </Title>
            <Title order={5} lineClamp={1}>
                单行截断标题单行截断标题单行截断标题单行截断标题单行截断标题
            </Title>
        </div>
    )
}

export default TitleDemo
