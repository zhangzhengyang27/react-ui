import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { UIProvider } from '../../core'
import { MultiSelect } from './MultiSelect'

const renderMultiSelect = (ui: React.ReactElement) => render(<UIProvider>{ui}</UIProvider>)

describe('MultiSelect', () => {
    it('renders with placeholder', () => {
        renderMultiSelect(<MultiSelect data={['React', 'Vue']} placeholder="Choose" />)
        expect(screen.getByPlaceholderText('Choose')).toBeInTheDocument()
    })

    it('selects multiple options when clicked', async () => {
        const onChange = vi.fn()
        renderMultiSelect(<MultiSelect data={['React', 'Vue', 'Angular']} onChange={onChange} />)

        fireEvent.click(screen.getByRole('combobox'))
        const option = await screen.findByRole('option', { name: 'Vue' })
        fireEvent.click(option)

        expect(onChange).toHaveBeenCalledWith(['Vue'])

        const option2 = await screen.findByRole('option', { name: 'React' })
        fireEvent.click(option2)

        expect(onChange).toHaveBeenCalledWith(['Vue', 'React'])
    })

    it('removes option when pill close button is clicked', () => {
        const onChange = vi.fn()
        renderMultiSelect(
            <MultiSelect data={['React', 'Vue', 'Angular']} defaultValue={['React', 'Vue']} onChange={onChange} />
        )

        const closeButton = screen.getByRole('button', { name: '移除 React' })
        fireEvent.click(closeButton)

        expect(onChange).toHaveBeenCalledWith(['Vue'])
    })

    it('supports maxSelectedValues', async () => {
        const onChange = vi.fn()
        renderMultiSelect(<MultiSelect data={['React', 'Vue', 'Angular']} maxSelectedValues={1} onChange={onChange} />)

        fireEvent.click(screen.getByRole('combobox'))
        const option = await screen.findByRole('option', { name: 'React' })
        fireEvent.click(option)

        expect(onChange).toHaveBeenCalledWith(['React'])

        const option2 = await screen.findByRole('option', { name: 'Vue' })
        expect(option2).toHaveAttribute('aria-disabled', 'true')
    })

    it('clears all values when clear button is clicked', async () => {
        const onChange = vi.fn()
        renderMultiSelect(
            <MultiSelect data={['React', 'Vue']} defaultValue={['React']} clearable onChange={onChange} />
        )

        const clearButton = screen.getByRole('button', { name: '清除选择' })
        fireEvent.click(clearButton)

        expect(onChange).toHaveBeenCalledWith([])
    })

    it('filters options when searchable', async () => {
        renderMultiSelect(<MultiSelect data={['React', 'Vue', 'Angular']} searchable />)
        const input = screen.getByRole('combobox')

        fireEvent.focus(input)
        fireEvent.change(input, { target: { value: 'Vu' } })

        await waitFor(() => {
            expect(screen.getByRole('option', { name: 'Vue' })).toBeInTheDocument()
            expect(screen.queryByRole('option', { name: 'React' })).not.toBeInTheDocument()
        })
    })
})
