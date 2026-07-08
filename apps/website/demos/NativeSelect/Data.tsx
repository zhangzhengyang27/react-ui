'use client'

import { NativeSelect } from '@react-ui/ui'

const DATA = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue', disabled: true },
    { value: 'angular', label: 'Angular' }
]

export default function NativeSelectDataDemo() {
    return <NativeSelect data={DATA} label="选择框架" />
}
