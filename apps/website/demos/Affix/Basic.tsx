'use client'

import { Affix, Button } from '@react-ui/ui'

export default function AffixBasicDemo() {
    return (
        <div style={{ height: 160, position: 'relative' }}>
            <Affix position={{ bottom: 20, right: 20 }} withinPortal={false}>
                <Button>固定按钮</Button>
            </Affix>
        </div>
    )
}
