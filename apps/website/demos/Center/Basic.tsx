'use client'

import { Center, Box } from '@react-ui/ui'

export default function CenterBasicDemo() {
    return (
        <Box style={{ height: 120, background: 'var(--ui-color-gray-2)' }}>
            <Center>
                <Box>居中对齐</Box>
            </Center>
        </Box>
    )
}
