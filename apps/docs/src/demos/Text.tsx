import React from 'react'
import { Text } from '@react-ui/ui'

const TextDemo: React.FC = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Text>默认文本</Text>
            <Text size="xl">超大文本 size=xl</Text>
            <Text size="sm" style={{ color: 'var(--mantine-color-gray-6)' }}>
                小号暗色文本
            </Text>
            <Text variant="gradient" gradient={{ from: 'blue', to: 'cyan', deg: 90 }}>
                渐变文本
            </Text>
            <Text truncate>这是一段很长的会被截断的文本这是一段很长的会被截断的文本</Text>
            <Text lineClamp={2}>
                两行截断：这是一段很长的会被截断到两行的文本这是一段很长的会被截断到两行的文本这是一段很长的会被截断到两行的文本
            </Text>
        </div>
    )
}

export default TextDemo
