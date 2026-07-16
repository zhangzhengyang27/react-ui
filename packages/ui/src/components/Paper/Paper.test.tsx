import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { UIProvider } from '../../core'
import { Paper } from './Paper'

const renderWithProvider = (ui: React.ReactNode) => render(<UIProvider>{ui}</UIProvider>)

describe('Paper', () => {
    it('renders a div by default', () => {
        renderWithProvider(<Paper data-testid="paper">content</Paper>)

        const element = screen.getByTestId('paper')
        expect(element.tagName).toBe('DIV')
        expect(element).toHaveTextContent('content')
    })

    it('supports polymorphic rendering', () => {
        renderWithProvider(
            <Paper component="section" data-testid="paper">
                section content
            </Paper>
        )

        expect(screen.getByTestId('paper').tagName).toBe('SECTION')
    })

    it('applies static classes', () => {
        renderWithProvider(<Paper data-testid="paper">content</Paper>)

        expect(screen.getByTestId('paper')).toHaveClass('ui-Paper-root')
    })

    it('adds data-with-border when withBorder is true', () => {
        renderWithProvider(
            <Paper data-testid="paper" withBorder>
                content
            </Paper>
        )

        expect(screen.getByTestId('paper')).toHaveAttribute('data-with-border')
    })

    it('forwards additional props', () => {
        renderWithProvider(
            <Paper data-testid="paper" aria-label="card">
                content
            </Paper>
        )

        expect(screen.getByTestId('paper')).toHaveAttribute('aria-label', 'card')
    })
})
