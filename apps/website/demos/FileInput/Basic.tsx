'use client'

import { useState } from 'react'
import { FileInput } from '@react-ui/ui'

export default function FileInputBasicDemo() {
    const [file, setFile] = useState<File | null>(null)

    return (
        <FileInput
            label="上传文件"
            placeholder="请选择文件"
            value={file}
            onChange={value => setFile(value as File | null)}
        />
    )
}
