'use client'

import { useState } from 'react'
import { Button, FocusTrap } from '@react-ui/ui'

export default function FocusTrapBasicDemo() {
    const [active, setActive] = useState(true)
    return (
        <div>
            <Button onClick={() => setActive(a => !a)} style={{ marginBottom: 12 }}>
                {active ? '停用' : '启用'} FocusTrap
            </Button>
            <FocusTrap active={active}>
                <div style={{ display: 'flex', gap: 8 }}>
                    <input placeholder="第一个输入框" style={{ padding: 8, borderRadius: 4 }} />
                    <input placeholder="第二个输入框" style={{ padding: 8, borderRadius: 4 }} />
                </div>
            </FocusTrap>
        </div>
    )
}
