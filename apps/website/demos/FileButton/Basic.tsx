'use client'

import { useState } from 'react'
import { Button, FileButton } from '@react-ui/ui'

export default function FileButtonBasicDemo() {
    const [file, setFile] = useState<File | null>(null)

    return (
        <>
            <FileButton onChange={setFile} accept="image/png,image/jpeg">
                {({ onClick }) => <Button onClick={onClick}>上传图片</Button>}
            </FileButton>
            {file && <div style={{ marginTop: 8 }}>已选择: {file.name}</div>}
        </>
    )
}
