'use client'

import { VisuallyHidden } from '@react-ui/ui'

export default function VisuallyHiddenBasicDemo() {
    return (
        <button style={{ fontSize: 24 }}>
            <VisuallyHidden>仅屏幕阅读器可读</VisuallyHidden>
            <span aria-hidden>🚀</span>
        </button>
    )
}
