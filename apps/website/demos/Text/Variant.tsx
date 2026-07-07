'use client'

import { Stack, Text } from '@react-ui/ui'

export default function TextVariantDemo() {
    return (
        <Stack>
            <Text variant="text">text 变体</Text>
            <Text variant="gradient" gradient={{ from: 'grape', to: 'blue', deg: 45 }}>
                gradient 渐变文本
            </Text>
        </Stack>
    )
}
