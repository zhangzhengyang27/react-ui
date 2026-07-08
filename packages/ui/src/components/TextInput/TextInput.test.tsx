import { useState } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { MantineProvider } from '../../core'
import { TextInput } from './TextInput'

const renderWithProvider = (ui: React.ReactNode) => render(<MantineProvider>{ui}</MantineProvider>)

describe('TextInput', () => {
    it('renders an input', () => {
        renderWithProvider(<TextInput defaultValue="hello" />)

        expect(screen.getByRole('textbox')).toHaveValue('hello')
    })

    it('renders label, description, error and required asterisk', () => {
        renderWithProvider(<TextInput label="Label" description="Description" error="Error" required />)

        expect(screen.getByText('Label')).toBeInTheDocument()
        expect(screen.getByText('*')).toBeInTheDocument()
        expect(screen.getByText('Description')).toBeInTheDocument()
        expect(screen.getByText('Error')).toBeInTheDocument()
    })

    it('works as an uncontrolled input', () => {
        renderWithProvider(<TextInput defaultValue="initial" />)

        const input = screen.getByRole('textbox')
        fireEvent.change(input, { target: { value: 'updated' } })

        expect(input).toHaveValue('updated')
    })

    it('works as a controlled input', () => {
        function Controlled() {
            const [value, setValue] = useState('')
            return <TextInput value={value} onChange={event => setValue(event.target.value)} />
        }

        renderWithProvider(<Controlled />)

        const input = screen.getByRole('textbox')
        fireEvent.change(input, { target: { value: 'controlled' } })

        expect(input).toHaveValue('controlled')
    })

    it('disables the input', () => {
        renderWithProvider(<TextInput disabled />)

        expect(screen.getByRole('textbox')).toBeDisabled()
    })

    it('applies invalid state to the wrapper', () => {
        renderWithProvider(<TextInput invalid />)

        expect(screen.getByRole('textbox').closest('[data-invalid]')).toBeInTheDocument()
    })

    it('calls onChange when value changes', () => {
        const onChange = vi.fn()
        renderWithProvider(<TextInput onChange={onChange} />)

        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'x' } })

        expect(onChange).toHaveBeenCalled()
    })
})
