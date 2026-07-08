'use client'

import { Splitter, Box } from '@react-ui/ui'

export default function SplitterBasicDemo() {
    return (
        <Box style={{ height: 200 }}>
            <Splitter>
                <Splitter.Panel>
                    <Box style={{ padding: 16, background: 'var(--ui-color-gray-2)', height: '100%' }}>Panel 1</Box>
                </Splitter.Panel>
                <Splitter.Panel>
                    <Box style={{ padding: 16, background: 'var(--ui-color-gray-0)', height: '100%' }}>Panel 2</Box>
                </Splitter.Panel>
            </Splitter>
        </Box>
    )
}
