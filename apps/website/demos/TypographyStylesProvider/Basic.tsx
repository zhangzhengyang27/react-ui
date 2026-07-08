'use client'

import { TypographyStylesProvider } from '@react-ui/ui'

export default function TypographyStylesProviderBasicDemo() {
    return (
        <TypographyStylesProvider>
            <h1>文章标题</h1>
            <p>
                这是一段示例文本，<a href="#">包含一个链接</a>。 TypographyStylesProvider 会为内部的 HTML
                元素提供一致的排版样式。
            </p>
            <ul>
                <li>无序列表项一</li>
                <li>无序列表项二</li>
            </ul>
            <blockquote>这是一段引用文本。</blockquote>
            <pre>
                <code>const example = &quot;hello world&quot;</code>
            </pre>
        </TypographyStylesProvider>
    )
}
