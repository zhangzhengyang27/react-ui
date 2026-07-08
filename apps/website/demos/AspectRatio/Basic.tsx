'use client'

import { AspectRatio, Box } from '@react-ui/ui'

export default function AspectRatioBasicDemo() {
    return (
        <AspectRatio ratio={16 / 9}>
            <Box style={{ background: 'var(--ui-color-blue-6)', color: '#fff', padding: 16 }}>16:9 比例容器</Box>
        </AspectRatio>
    )
}
