'use client'

import { Overlay, Paper } from '@react-ui/ui'

export default function OverlayBasicDemo() {
    return (
        <div style={{ position: 'relative', height: 160 }}>
            <Paper style={{ height: '100%', padding: 16 }}>底层内容</Paper>
            <Overlay center>覆盖层内容</Overlay>
        </div>
    )
}
