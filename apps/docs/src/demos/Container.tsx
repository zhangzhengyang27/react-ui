import React from 'react'
import { Container, Text, Title } from '@react-ui/ui'

const ContainerDemo: React.FC = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Container size="md" style={{ background: 'var(--mantine-color-gray-0)', padding: 16, borderRadius: 8 }}>
                <Title order={4}>size="md" 容器</Title>
                <Text size="sm">max-width 960px，水平居中</Text>
            </Container>
            <Container size="sm" style={{ background: 'var(--mantine-color-gray-1)', padding: 16, borderRadius: 8 }}>
                <Title order={4}>size="sm" 容器</Title>
                <Text size="sm">max-width 720px</Text>
            </Container>
            <Container fluid style={{ background: 'var(--mantine-color-gray-2)', padding: 16, borderRadius: 8 }}>
                <Title order={4}>fluid 容器</Title>
                <Text size="sm">占满父容器宽度</Text>
            </Container>
        </div>
    )
}

export default ContainerDemo
