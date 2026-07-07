'use client'

import { Container, Paper } from '@react-ui/ui'

export default function ContainerBasicDemo() {
    return (
        <Container size="xs">
            <Paper withBorder style={{ padding: 24 }}>
                居中容器，限制最大宽度。
            </Paper>
        </Container>
    )
}
