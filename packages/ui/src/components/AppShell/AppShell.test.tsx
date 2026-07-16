import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { UIProvider } from '../../core'
import { AppShell } from './AppShell'

const renderWithProvider = (ui: React.ReactNode) => render(<UIProvider>{ui}</UIProvider>)

describe('AppShell', () => {
    it('renders root and subcomponents', () => {
        renderWithProvider(
            <AppShell data-testid="shell" header={{ height: 60 }} navbar={{ width: 200 }}>
                <AppShell.Header data-testid="header">Header</AppShell.Header>
                <AppShell.Navbar data-testid="navbar">Navbar</AppShell.Navbar>
                <AppShell.Main data-testid="main">Main</AppShell.Main>
            </AppShell>
        )

        expect(screen.getByTestId('shell')).toBeInTheDocument()
        expect(screen.getByTestId('header')).toHaveTextContent('Header')
        expect(screen.getByTestId('navbar')).toHaveTextContent('Navbar')
        expect(screen.getByTestId('main')).toHaveTextContent('Main')
    })

    it('renders aside and footer', () => {
        renderWithProvider(
            <AppShell data-testid="shell" aside={{ width: 180 }} footer={{ height: 40 }}>
                <AppShell.Aside data-testid="aside">Aside</AppShell.Aside>
                <AppShell.Main>Main</AppShell.Main>
                <AppShell.Footer data-testid="footer">Footer</AppShell.Footer>
            </AppShell>
        )

        expect(screen.getByTestId('aside')).toHaveTextContent('Aside')
        expect(screen.getByTestId('footer')).toHaveTextContent('Footer')
    })

    it('marks navbar as collapsed', () => {
        renderWithProvider(
            <AppShell navbar={{ width: 200, collapsed: true }}>
                <AppShell.Navbar data-testid="navbar">Navbar</AppShell.Navbar>
                <AppShell.Main>Main</AppShell.Main>
            </AppShell>
        )

        expect(screen.getByTestId('navbar')).toHaveAttribute('data-collapsed')
    })
})
