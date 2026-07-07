'use client'

import { Flex, Box } from '@react-ui/ui'

export default function FlexBasicDemo() {
    return (
        <Flex gap="md" align="center" justify="center">
            <Box style={{ width: 60, height: 60, background: 'var(--mantine-color-blue-6)' }} />
            <Box style={{ width: 60, height: 60, background: 'var(--mantine-color-green-6)' }} />
            <Box style={{ width: 60, height: 60, background: 'var(--mantine-color-red-6)' }} />
        </Flex>
    )
}
