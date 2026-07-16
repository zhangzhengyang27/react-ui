import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { UIProvider } from '../../core'
import { Badge } from './Badge'

const renderWithProvider = (ui: React.ReactNode) => render(<UIProvider>{ui}</UIProvider>)

describe('Badge', () => {
    it('renders a div by default', () => {
        renderWithProvider(<Badge data-testid="badge">Badge</Badge>)

        const element = screen.getByTestId('badge')
        expect(element.tagName).toBe('DIV')
        expect(element).toHaveTextContent('Badge')
    })

    it('applies static classes', () => {
        renderWithProvider(<Badge data-testid="badge">Badge</Badge>)

        expect(screen.getByTestId('badge')).toHaveClass('ui-Badge-root')
    })

    it('renders left and right sections', () => {
        renderWithProvider(
            <Badge data-testid="badge" leftSection="L" rightSection="R">
                Badge
            </Badge>
        )

        const root = screen.getByTestId('badge')
        expect(root).toHaveAttribute('data-with-left-section')
        expect(root).toHaveAttribute('data-with-right-section')
        expect(screen.getByText('L')).toHaveClass('ui-Badge-section')
        expect(screen.getByText('R')).toHaveClass('ui-Badge-section')
    })

    it('sets data-block when fullWidth is true', () => {
        renderWithProvider(
            <Badge data-testid="badge" fullWidth>
                Badge
            </Badge>
        )

        expect(screen.getByTestId('badge')).toHaveAttribute('data-block')
    })

    it('sets data-circle when circle is true', () => {
        renderWithProvider(
            <Badge data-testid="badge" circle>
                1
            </Badge>
        )

        expect(screen.getByTestId('badge')).toHaveAttribute('data-circle')
    })
})
