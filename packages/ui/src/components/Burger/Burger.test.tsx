import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { UIProvider } from '../../core'
import { Burger } from './Burger'

const renderWithProvider = (ui: React.ReactNode) => render(<UIProvider>{ui}</UIProvider>)

describe('Burger', () => {
    it('renders a button by default', () => {
        renderWithProvider(<Burger data-testid="burger" />)

        const element = screen.getByTestId('burger')
        expect(element.tagName).toBe('BUTTON')
    })

    it('applies static classes', () => {
        renderWithProvider(<Burger data-testid="burger" />)

        expect(screen.getByTestId('burger')).toHaveClass('ui-Burger-root')
    })

    it('sets data-opened on burger element when opened is true', () => {
        renderWithProvider(<Burger data-testid="burger" opened />)

        const element = screen.getByTestId('burger').querySelector('.ui-Burger-burger')
        expect(element).toHaveAttribute('data-opened')
    })

    it('does not set data-opened on burger element when opened is false', () => {
        renderWithProvider(<Burger data-testid="burger" opened={false} />)

        const element = screen.getByTestId('burger').querySelector('.ui-Burger-burger')
        expect(element).not.toHaveAttribute('data-opened')
    })

    it('forwards additional props', () => {
        renderWithProvider(<Burger data-testid="burger" aria-label="Toggle navigation" />)

        expect(screen.getByTestId('burger')).toHaveAttribute('aria-label', 'Toggle navigation')
    })
})
