'use client'

import { useState } from 'react'
import { MaskInput } from '@react-ui/ui'

export default function MaskInputBasicDemo() {
    const [value, setValue] = useState('')

    return (
        <MaskInput label="手机号" mask="(###) ####-####" placeholder="请输入手机号" value={value} onChange={setValue} />
    )
}
