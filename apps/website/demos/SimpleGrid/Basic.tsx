'use client'

import { SimpleGrid, Box } from '@react-ui/ui'

export default function SimpleGridBasicDemo() {
    return (
        <SimpleGrid cols={3} spacing="md">
            <Box style={{ height: 80, background: 'var(--mantine-color-blue-6)' }} />
            <Box style={{ width: 60, height: 60, background: 'var(--mantine-color-green-6)' }} />
            <Box style={{ width: 60, height: 60, background: 'var(--mantine-color-red-6)' }} />
            <Box style={{ width: 60, height: 60, background: 'var(--mantine-color-yellow-6)' }} />
            <Box style={{ width: 60, height: 60, background: 'var(--mantine-color-purple-6)' }} />
            <Box style={{ width: 60, height: 60, background: 'var(--mantine-color-pink-6)' }} />
        </SimpleGrid>
    )
}
