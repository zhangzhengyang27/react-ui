'use client'

import { useState } from 'react'
import { Button, FileButton } from '@react-ui/ui'

export default function FileButtonMultipleDemo() {
    const [files, setFiles] = useState<File[]>([])

    return (
        <>
            <FileButton onChange={setFiles} multiple accept="image/png,image/jpeg">
                {({ onClick }) => <Button onClick={onClick}>上传多张图片</Button>}
            </FileButton>
            {files.length > 0 && (
                <ul style={{ marginTop: 8 }}>
                    {files.map((file, index) => (
                        <li key={index}>{file.name}</li>
                    ))}
                </ul>
            )}
        </>
    )
}
