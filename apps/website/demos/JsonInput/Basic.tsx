'use client'

import { useState } from 'react'
import { JsonInput } from '@react-ui/ui'

export default function JsonInputBasicDemo() {
    const [value, setValue] = useState('{"name":"react-ui","version":"0.0.1"}')

    return <JsonInput label="JSON 输入" value={value} onChange={setValue} rows={6} />
}
