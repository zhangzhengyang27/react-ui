import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { UIProvider } from '../../core'
import { ThemeIcon } from './ThemeIcon'

const renderWithProvider = (ui: React.ReactNode) => render(<UIProvider>{ui}</UIProvider>)

describe('ThemeIcon', () => {
    it('renders children inside themed container', () => {
        renderWithProvider(<ThemeIcon data-testid="theme-icon">icon</ThemeIcon>)

        expect(screen.getByTestId('theme-icon')).toHaveTextContent('icon')
    })

    it('renders as div by default', () => {
        renderWithProvider(<ThemeIcon data-testid="theme-icon">icon</ThemeIcon>)

        expect(screen.getByTestId('theme-icon').tagName).toBe('DIV')
    })

    it('applies static classes', () => {
        renderWithProvider(<ThemeIcon data-testid="theme-icon">icon</ThemeIcon>)

        expect(screen.getByTestId('theme-icon')).toHaveClass('ui-ThemeIcon-root')
    })

    it('supports data-variant attribute', () => {
        renderWithProvider(
            <ThemeIcon variant="outline" data-testid="theme-icon">
                icon
            </ThemeIcon>
        )

        expect(screen.getByTestId('theme-icon')).toHaveAttribute('data-variant', 'outline')
    })
})
