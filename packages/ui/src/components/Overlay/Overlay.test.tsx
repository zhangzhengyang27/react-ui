import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { UIProvider } from '../../core'
import { Overlay } from './Overlay'

const renderWithProvider = (ui: React.ReactNode) => render(<UIProvider>{ui}</UIProvider>)

describe('Overlay', () => {
    it('renders a div by default', () => {
        renderWithProvider(<Overlay data-testid="overlay" />)

        const element = screen.getByTestId('overlay')
        expect(element.tagName).toBe('DIV')
    })

    it('renders children', () => {
        renderWithProvider(
            <Overlay data-testid="overlay">
                <span data-testid="child">child</span>
            </Overlay>
        )

        expect(screen.getByTestId('child')).toBeInTheDocument()
    })

    it('applies static classes', () => {
        renderWithProvider(<Overlay data-testid="overlay" />)

        expect(screen.getByTestId('overlay')).toHaveClass('ui-Overlay-root')
    })

    it('sets data-center when center is true', () => {
        renderWithProvider(<Overlay data-testid="overlay" center />)

        expect(screen.getByTestId('overlay')).toHaveAttribute('data-center')
    })

    it('sets data-fixed when fixed is true', () => {
        renderWithProvider(<Overlay data-testid="overlay" fixed />)

        expect(screen.getByTestId('overlay')).toHaveAttribute('data-fixed')
    })

    it('supports polymorphic rendering', () => {
        renderWithProvider(
            <Overlay component="span" data-testid="overlay">
                content
            </Overlay>
        )

        expect(screen.getByTestId('overlay').tagName).toBe('SPAN')
    })
})
