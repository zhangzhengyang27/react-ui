import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { UIProvider } from '../../core'
import { Select } from './Select'

const renderSelect = (ui: React.ReactElement) => render(<UIProvider>{ui}</UIProvider>)

describe('Select', () => {
    it('renders with placeholder', () => {
        renderSelect(<Select data={['React', 'Vue']} placeholder="Choose" />)
        expect(screen.getByPlaceholderText('Choose')).toBeInTheDocument()
    })

    it('selects option when clicked', async () => {
        const onChange = vi.fn()
        renderSelect(<Select data={['React', 'Vue', 'Angular']} onChange={onChange} />)

        fireEvent.click(screen.getByRole('combobox'))
        const option = await screen.findByRole('option', { name: 'Vue' })
        fireEvent.click(option)

        expect(onChange).toHaveBeenCalledWith('Vue')
    })

    it('supports defaultValue', () => {
        renderSelect(<Select data={['React', 'Vue']} defaultValue="Vue" />)
        expect(screen.getByRole('combobox')).toHaveValue('Vue')
    })

    it('filters options when searchable', async () => {
        renderSelect(<Select data={['React', 'Vue', 'Angular']} searchable />)
        const input = screen.getByRole('combobox')

        fireEvent.focus(input)
        fireEvent.change(input, { target: { value: 'Vu' } })

        await waitFor(() => {
            expect(screen.getByRole('option', { name: 'Vue' })).toBeInTheDocument()
            expect(screen.queryByRole('option', { name: 'React' })).not.toBeInTheDocument()
        })
    })

    it('renders label and error', () => {
        renderSelect(<Select data={['a', 'b']} label="Label" error="Error" />)
        expect(screen.getByText('Label')).toBeInTheDocument()
        expect(screen.getByText('Error')).toBeInTheDocument()
    })
})
