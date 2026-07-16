import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { UIProvider } from '../../core'
import { VisuallyHidden } from './VisuallyHidden'

const renderWithProvider = (ui: React.ReactNode) => render(<UIProvider>{ui}</UIProvider>)

describe('VisuallyHidden', () => {
    it('renders children inside a span', () => {
        renderWithProvider(<VisuallyHidden data-testid="visually-hidden">screen reader only</VisuallyHidden>)

        const element = screen.getByTestId('visually-hidden')
        expect(element.tagName).toBe('SPAN')
        expect(element).toHaveTextContent('screen reader only')
    })

    it('applies the visually hidden styles', () => {
        renderWithProvider(<VisuallyHidden data-testid="visually-hidden">hidden</VisuallyHidden>)

        const element = screen.getByTestId('visually-hidden')
        expect(element).toHaveClass('ui-VisuallyHidden-root')
    })

    it('forwards additional props to the span', () => {
        renderWithProvider(
            <VisuallyHidden data-testid="visually-hidden" aria-live="polite">
                announcement
            </VisuallyHidden>
        )

        expect(screen.getByTestId('visually-hidden')).toHaveAttribute('aria-live', 'polite')
    })
})
