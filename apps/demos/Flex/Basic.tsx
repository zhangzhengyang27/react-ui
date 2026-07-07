import React from 'react'
import { Flex, Box } from '@react-ui/ui'

const Basic: React.FC = () => {
    return (
        <Flex gap="md" align="center" justify="center">
            <Box style={{ width: 60, height: 60, background: 'var(--mantine-color-blue-6)' }} />
            <Box style={{ width: 60, height: 60, background: 'var(--mantine-color-green-6)' }} />
            <Box style={{ width: 60, height: 60, background: 'var(--mantine-color-red-6)' }} />
        </Flex>
    )
}

export default Basic
