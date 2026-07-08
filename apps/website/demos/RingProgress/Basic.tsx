'use client'

import { RingProgress } from '@react-ui/ui'

export default function RingProgressBasicDemo() {
    return <RingProgress sections={[{ value: 60, color: 'blue' }]} label="60%" />
}
