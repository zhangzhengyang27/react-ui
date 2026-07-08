'use client'

import { CopyButton, Button } from '@react-ui/ui'

export default function CopyButtonBasicDemo() {
    return (
        <CopyButton value="hello@react-ui.dev">
            {({ copied, copy }) => (
                <Button color={copied ? 'teal' : 'blue'} onClick={copy}>
                    {copied ? '已复制' : '复制邮箱'}
                </Button>
            )}
        </CopyButton>
    )
}
