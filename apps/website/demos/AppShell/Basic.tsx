'use client'

import { AppShell, Box } from '@react-ui/ui'

export default function AppShellBasicDemo() {
    return (
        <Box style={{ height: 300, overflow: 'hidden' }}>
            <AppShell
                header={{ height: 48 }}
                navbar={{ width: 160 }}
                aside={{ width: 120 }}
                footer={{ height: 40 }}
                padding="md"
            >
                <AppShell.Header style={{ background: 'var(--ui-color-blue-6)', color: '#fff' }}>
                    Header
                </AppShell.Header>
                <AppShell.Navbar style={{ background: 'var(--ui-color-gray-2)' }}>Navbar</AppShell.Navbar>
                <AppShell.Main>Main Content</AppShell.Main>
                <AppShell.Aside style={{ background: 'var(--ui-color-gray-2)' }}>Aside</AppShell.Aside>
                <AppShell.Footer style={{ background: 'var(--ui-color-dark-6)', color: '#fff' }}>
                    Footer
                </AppShell.Footer>
            </AppShell>
        </Box>
    )
}
