'use client'

import { SegmentedControl } from '@react-ui/ui'

export default function SegmentedControlBasicDemo() {
    return <SegmentedControl data={['React', 'Vue', 'Angular']} defaultValue="React" />
}
