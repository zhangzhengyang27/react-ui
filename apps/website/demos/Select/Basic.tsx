'use client'

import { Select } from '@react-ui/ui'

export default function SelectBasicDemo() {
    return <Select data={['React', 'Vue', 'Angular']} placeholder="选择框架" defaultValue="React" />
}
