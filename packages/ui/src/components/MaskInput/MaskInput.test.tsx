import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { UIProvider } from '../../core'
import { MaskInput } from './MaskInput'

const renderWithProvider = (ui: React.ReactNode) => render(<UIProvider>{ui}</UIProvider>)

describe('MaskInput', () => {
    it('applies mask on initial render', () => {
        renderWithProvider(<MaskInput mask="(###) ###-####" defaultValue="1234567890" data-testid="mask-input" />)
        expect(screen.getByDisplayValue('(123) 456-7890')).toBeInTheDocument()
    })

    it('calls onChange with raw value when input changes', () => {
        const handleChange = vi.fn()
        renderWithProvider(<MaskInput mask="(###) ###-####" onChange={handleChange} data-testid="mask-input" />)

        const input = screen.getByTestId('mask-input') as HTMLInputElement
        fireEvent.change(input, { target: { value: '123' } })
        expect(handleChange).toHaveBeenCalledWith('123')
    })

    it('fills placeholders for empty positions', () => {
        renderWithProvider(<MaskInput mask="##-##" slotChar="*" data-testid="mask-input" />)
        expect(screen.getByDisplayValue('**-**')).toBeInTheDocument()
    })
})
