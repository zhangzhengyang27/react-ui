'use client'

import React, { useEffect, useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useTheme } from 'next-themes'

export interface CodeBlockProps {
    code: string
    language?: string
}

export function CodeBlock({ code, language = 'tsx' }: CodeBlockProps) {
    const { resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    // 避免服务端/客户端主题不一致导致的 hydration mismatch：
    // 挂载前统一使用亮色主题，挂载后再根据实际主题切换。
    const style = mounted && resolvedTheme === 'dark' ? vscDarkPlus : oneLight

    return (
        <SyntaxHighlighter
            language={language}
            style={style}
            customStyle={{
                margin: 0,
                padding: 16,
                fontSize: 13,
                lineHeight: 1.5,
                borderRadius: 0,
                background: 'transparent'
            }}
            codeTagProps={{
                style: {
                    fontFamily:
                        'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
                }
            }}
        >
            {code.trim()}
        </SyntaxHighlighter>
    )
}
