import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MantineProvider } from '../../core'
import { Breadcrumbs } from './Breadcrumbs'

const renderWithProvider = (ui: React.ReactNode) => render(<MantineProvider>{ui}</MantineProvider>)

describe('Breadcrumbs', () => {
    it('renders a div by default', () => {
        renderWithProvider(
            <Breadcrumbs data-testid="bc">
                <a href="/">Home</a>
                <a href="/library">Library</a>
                <span>Data</span>
            </Breadcrumbs>
        )

        const element = screen.getByTestId('bc')
        expect(element.tagName).toBe('DIV')
        expect(element.children).toHaveLength(5)
    })

    it('applies static classes', () => {
        renderWithProvider(
            <Breadcrumbs data-testid="bc">
                <a href="/">Home</a>
            </Breadcrumbs>
        )

        expect(screen.getByTestId('bc')).toHaveClass('mantine-Breadcrumbs-root')
    })

    it('uses default separator', () => {
        renderWithProvider(
            <Breadcrumbs data-testid="bc">
                <a href="/">Home</a>
                <a href="/library">Library</a>
            </Breadcrumbs>
        )

        expect(screen.getByText('/')).toHaveClass('mantine-Breadcrumbs-separator')
    })

    it('supports custom separator', () => {
        renderWithProvider(
            <Breadcrumbs data-testid="bc" separator=">">
                <a href="/">Home</a>
                <a href="/library">Library</a>
            </Breadcrumbs>
        )

        expect(screen.getByText('>')).toHaveClass('mantine-Breadcrumbs-separator')
    })
})
