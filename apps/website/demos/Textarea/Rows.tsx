'use client'

import { Stack, Textarea } from '@react-ui/ui'

export default function TextareaRowsDemo() {
    return (
        <Stack>
            <Textarea rows={4} placeholder="固定 4 行高度" />
            <Textarea rows={3} style={{ resize: 'none' }} placeholder="禁止调整大小" />
        </Stack>
    )
}
