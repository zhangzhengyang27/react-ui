'use client'

import { NativeSelect } from '@react-ui/ui'

const DATA = ['React', 'Vue', 'Angular']

export default function NativeSelectBasicDemo() {
    return <NativeSelect data={DATA} label="选择框架" />
}
