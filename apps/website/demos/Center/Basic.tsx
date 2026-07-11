import React from 'react'
import { Center, Box } from '@react-ui/ui'

const Basic: React.FC = () => {
    return (
        <Box style={{ height: 120, background: 'var(--ui-color-gray-2)' }}>
            <Center>
                <Box>居中对齐</Box>
            </Center>
        </Box>
    )
}

export default Basic
