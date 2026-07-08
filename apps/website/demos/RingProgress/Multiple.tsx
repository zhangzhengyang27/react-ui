'use client'

import { RingProgress } from '@react-ui/ui'

export default function RingProgressMultipleDemo() {
    return (
        <RingProgress
            size={160}
            thickness={16}
            roundCaps
            sections={[
                { value: 30, color: 'cyan' },
                { value: 25, color: 'orange' },
                { value: 20, color: 'grape' }
            ]}
            label="进度"
        />
    )
}
