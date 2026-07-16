import { useState } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { UIProvider } from '../../core'
import { Textarea } from './Textarea'

const renderWithProvider = (ui: React.ReactNode) => render(<UIProvider>{ui}</UIProvider>)

describe('Textarea', () => {
    it('renders a textarea', () => {
        renderWithProvider(<Textarea defaultValue="hello" />)

        const textarea = screen.getByRole('textbox')
        expect(textarea.tagName).toBe('TEXTAREA')
        expect(textarea).toHaveValue('hello')
    })

    it('supports the rows attribute', () => {
        renderWithProvider(<Textarea rows={5} />)

        expect(screen.getByRole('textbox')).toHaveAttribute('rows', '5')
    })

    it('works as an uncontrolled textarea', () => {
        renderWithProvider(<Textarea defaultValue="initial" />)

        const textarea = screen.getByRole('textbox')
        fireEvent.change(textarea, { target: { value: 'updated' } })

        expect(textarea).toHaveValue('updated')
    })

    it('works as a controlled textarea', () => {
        function Controlled() {
            const [value, setValue] = useState('')
            return <Textarea value={value} onChange={event => setValue(event.target.value)} />
        }

        renderWithProvider(<Controlled />)

        const textarea = screen.getByRole('textbox')
        fireEvent.change(textarea, { target: { value: 'controlled' } })

        expect(textarea).toHaveValue('controlled')
    })

    it('disables the textarea', () => {
        renderWithProvider(<Textarea disabled />)

        expect(screen.getByRole('textbox')).toBeDisabled()
    })

    it('applies invalid state to the wrapper', () => {
        renderWithProvider(<Textarea invalid />)

        expect(screen.getByRole('textbox').closest('[data-error]')).toBeInTheDocument()
    })

    it('calls onChange when value changes', () => {
        const onChange = vi.fn()
        renderWithProvider(<Textarea onChange={onChange} />)

        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'x' } })

        expect(onChange).toHaveBeenCalled()
    })
})
