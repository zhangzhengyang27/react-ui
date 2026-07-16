import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { UIProvider } from '../../core'
import { CloseButton } from './CloseButton'

const renderWithProvider = (ui: React.ReactNode) => render(<UIProvider>{ui}</UIProvider>)

describe('CloseButton', () => {
    it('renders a button by default', () => {
        renderWithProvider(<CloseButton data-testid="close" />)

        const element = screen.getByTestId('close')
        expect(element.tagName).toBe('BUTTON')
        expect(element).toHaveAttribute('type', 'button')
    })

    it('renders the default close icon', () => {
        renderWithProvider(<CloseButton data-testid="close" />)

        const element = screen.getByTestId('close')
        expect(element.querySelector('svg')).toBeInTheDocument()
    })

    it('renders custom icon', () => {
        renderWithProvider(<CloseButton data-testid="close" icon={<span data-testid="custom-icon">x</span>} />)

        expect(screen.getByTestId('custom-icon')).toBeInTheDocument()
        expect(screen.queryByTestId('close')?.querySelector('svg')).not.toBeInTheDocument()
    })

    it('applies static classes', () => {
        renderWithProvider(<CloseButton data-testid="close" />)

        expect(screen.getByTestId('close')).toHaveClass('ui-CloseButton-root')
    })

    it('sets disabled attribute and data-disabled', () => {
        renderWithProvider(<CloseButton data-testid="close" disabled />)

        const element = screen.getByTestId('close')
        expect(element).toBeDisabled()
        expect(element).toHaveAttribute('data-disabled')
    })

    it('renders children', () => {
        renderWithProvider(
            <CloseButton data-testid="close">
                <span>close</span>
            </CloseButton>
        )

        expect(screen.getByText('close')).toBeInTheDocument()
    })
})
