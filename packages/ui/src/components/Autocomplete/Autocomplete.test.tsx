import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { MantineProvider } from '../../core'
import { Autocomplete } from './Autocomplete'

const renderAutocomplete = (ui: React.ReactElement) => render(<MantineProvider>{ui}</MantineProvider>)

describe('Autocomplete', () => {
    it('renders with placeholder', () => {
        renderAutocomplete(<Autocomplete data={['React', 'Vue']} placeholder="Choose" />)
        expect(screen.getByPlaceholderText('Choose')).toBeInTheDocument()
    })

    it('updates value on input change', () => {
        const onChange = vi.fn()
        renderAutocomplete(<Autocomplete data={['React', 'Vue', 'Angular']} onChange={onChange} />)

        const input = screen.getByRole('combobox')
        fireEvent.change(input, { target: { value: 'Vu' } })

        expect(onChange).toHaveBeenCalledWith('Vu')
    })

    it('selects option when clicked', async () => {
        const onChange = vi.fn()
        renderAutocomplete(<Autocomplete data={['React', 'Vue', 'Angular']} onChange={onChange} />)

        fireEvent.click(screen.getByRole('combobox'))
        const option = await screen.findByRole('option', { name: 'Vue' })
        fireEvent.click(option)

        expect(onChange).toHaveBeenCalledWith('Vue')
    })

    it('filters options based on input value', async () => {
        renderAutocomplete(<Autocomplete data={['React', 'Vue', 'Angular']} />)

        const input = screen.getByRole('combobox')
        fireEvent.change(input, { target: { value: 'Vu' } })

        await waitFor(() => {
            expect(screen.getByRole('option', { name: 'Vue' })).toBeInTheDocument()
            expect(screen.queryByRole('option', { name: 'React' })).not.toBeInTheDocument()
        })
    })

    it('supports defaultValue', () => {
        renderAutocomplete(<Autocomplete data={['React', 'Vue']} defaultValue="Vue" />)
        expect(screen.getByRole('combobox')).toHaveValue('Vue')
    })

    it('clears value when clear button is clicked', () => {
        const onChange = vi.fn()
        renderAutocomplete(<Autocomplete data={['React', 'Vue']} defaultValue="Vue" clearable onChange={onChange} />)

        const clearButton = screen.getByRole('button', { name: '清除输入' })
        fireEvent.click(clearButton)

        expect(onChange).toHaveBeenCalledWith('')
    })
})
