import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { UIProvider } from '../../core'
import { Mark } from './Mark'

const renderWithProvider = (ui: React.ReactNode) => render(<UIProvider>{ui}</UIProvider>)

describe('Mark', () => {
    it('renders a mark element by default', () => {
        renderWithProvider(<Mark data-testid="mark">Marked</Mark>)

        const element = screen.getByTestId('mark')
        expect(element.tagName).toBe('MARK')
        expect(element).toHaveTextContent('Marked')
    })

    it('applies static classes', () => {
        renderWithProvider(<Mark data-testid="mark">Marked</Mark>)

        expect(screen.getByTestId('mark')).toHaveClass('ui-Mark-root')
    })

    it('accepts a custom color', () => {
        renderWithProvider(
            <Mark data-testid="mark" color="red">
                Marked
            </Mark>
        )

        expect(screen.getByTestId('mark')).toBeInTheDocument()
    })
})
