import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { UIProvider } from '../../core'
import { JsonInput } from './JsonInput'

const renderWithProvider = (ui: React.ReactNode) => render(<UIProvider>{ui}</UIProvider>)

describe('JsonInput', () => {
    it('renders with default value', () => {
        renderWithProvider(<JsonInput defaultValue='{"a":1}' data-testid="json-input" />)
        expect(screen.getByDisplayValue('{"a":1}')).toBeInTheDocument()
    })

    it('calls onChange when value changes', () => {
        const handleChange = vi.fn()
        renderWithProvider(<JsonInput onChange={handleChange} data-testid="json-input" />)
        const textarea = screen.getByRole('textbox')
        fireEvent.change(textarea, { target: { value: '{"b":2}' } })
        expect(handleChange).toHaveBeenCalledWith('{"b":2}')
    })

    it('formats value on blur when formatOnBlur is set', () => {
        renderWithProvider(<JsonInput formatOnBlur defaultValue='{"a":1}' data-testid="json-input" />)
        const textarea = screen.getByRole('textbox')
        fireEvent.change(textarea, { target: { value: '{"a":1}' } })
        fireEvent.blur(textarea)
        expect(textarea).toHaveValue('{\n  "a": 1\n}')
    })
})
