import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { UIProvider } from '../../core'
import { ColorInput } from './ColorInput'

const renderWithProvider = (ui: React.ReactNode) => render(<UIProvider>{ui}</UIProvider>)

describe('ColorInput', () => {
    it('renders input with default value', () => {
        renderWithProvider(<ColorInput defaultValue="#ff0000" data-testid="color-input" />)
        expect(screen.getByDisplayValue('#ff0000')).toBeInTheDocument()
    })

    it('renders label when provided', () => {
        renderWithProvider(<ColorInput label="Choose color" />)
        expect(screen.getByText('Choose color')).toBeInTheDocument()
    })

    it('calls onChange when input value changes', () => {
        const handleChange = vi.fn()
        renderWithProvider(<ColorInput onChange={handleChange} />)
        const input = screen.getByRole('textbox')
        fireEvent.change(input, { target: { value: '#00ff00' } })
        expect(handleChange).toHaveBeenCalledWith('#00ff00')
    })

    it('does not allow text input when disallowInput is set', () => {
        renderWithProvider(<ColorInput disallowInput data-testid="color-input" />)
        expect(screen.getByRole('textbox')).toHaveAttribute('readonly')
    })

    it('renders without wrapper when label/description/error are not provided', () => {
        const { container } = renderWithProvider(<ColorInput data-testid="color-input" />)
        expect(container.querySelector('.inputWrapper')).not.toBeInTheDocument()
    })
})
