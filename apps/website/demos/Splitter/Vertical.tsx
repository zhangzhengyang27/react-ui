'use client'

import { Splitter, Box } from '@react-ui/ui'

export default function SplitterVerticalDemo() {
    return (
        <Box style={{ height: 240 }}>
            <Splitter orientation="vertical">
                <Splitter.Panel>
                    <Box style={{ padding: 16, background: 'var(--ui-color-blue-1)', height: '100%' }}>Top Panel</Box>
                </Splitter.Panel>
                <Splitter.Panel>
                    <Box style={{ padding: 16, background: 'var(--ui-color-teal-1)', height: '100%' }}>
                        Bottom Panel
                    </Box>
                </Splitter.Panel>
            </Splitter>
        </Box>
    )
}
