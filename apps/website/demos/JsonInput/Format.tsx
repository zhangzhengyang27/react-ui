'use client'

import { JsonInput } from '@react-ui/ui'

export default function JsonInputFormatDemo() {
    return <JsonInput label="自动格式化" defaultValue='{"a":1,"b":2}' formatOnBlur rows={6} />
}
