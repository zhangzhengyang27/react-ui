'use client'

import { useState } from 'react'
import { FileInput } from '@react-ui/ui'

export default function FileInputMultipleDemo() {
    const [files, setFiles] = useState<File[]>([])

    return (
        <FileInput
            label="多文件上传"
            placeholder="请选择文件"
            multiple
            value={files}
            onChange={value => setFiles(value as File[])}
            clearable
        />
    )
}
