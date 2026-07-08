'use client'

import { AppShell, Box } from '@react-ui/ui'

export default function AppShellCollapsedDemo() {
    return (
        <Box style={{ height: 240, overflow: 'hidden' }}>
            <AppShell header={{ height: 48 }} navbar={{ width: 160, collapsed: true }} padding="md">
                <AppShell.Header style={{ background: 'var(--ui-color-blue-6)', color: '#fff' }}>
                    Header
                </AppShell.Header>
                <AppShell.Navbar style={{ background: 'var(--ui-color-gray-2)' }}>Navbar</AppShell.Navbar>
                <AppShell.Main>Main with collapsed navbar</AppShell.Main>
            </AppShell>
        </Box>
    )
}
