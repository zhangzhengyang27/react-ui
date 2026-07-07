'use client'

import { Portal } from '@react-ui/ui'

export default function PortalBasicDemo() {
    return (
        <Portal>
            <div
                style={{
                    position: 'fixed',
                    bottom: 16,
                    right: 16,
                    padding: 12,
                    background: 'var(--nextra-bg-color, #222)',
                    border: '1px solid var(--nextra-border-color, #333)',
                    borderRadius: 8
                }}
            >
                渲染到 document.body
            </div>
        </Portal>
    )
}
