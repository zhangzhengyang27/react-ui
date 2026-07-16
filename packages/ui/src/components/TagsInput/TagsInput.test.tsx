import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { UIProvider } from '../../core'
import { TagsInput } from './TagsInput'

const renderTagsInput = (ui: React.ReactElement) => render(<UIProvider>{ui}</UIProvider>)

describe('TagsInput', () => {
    it('renders with placeholder', () => {
        renderTagsInput(<TagsInput placeholder="Add tag" />)
        expect(screen.getByPlaceholderText('Add tag')).toBeInTheDocument()
    })

    it('adds tag on Enter', () => {
        const onChange = vi.fn()
        renderTagsInput(<TagsInput onChange={onChange} />)

        const input = screen.getByRole('combobox')
        fireEvent.change(input, { target: { value: 'React' } })
        fireEvent.keyDown(input, { key: 'Enter' })

        expect(onChange).toHaveBeenCalledWith(['React'])
    })

    it('removes tag when pill close button is clicked', () => {
        const onChange = vi.fn()
        renderTagsInput(<TagsInput defaultValue={['React', 'Vue']} onChange={onChange} />)

        const closeButton = screen.getByRole('button', { name: '移除 React' })
        fireEvent.click(closeButton)

        expect(onChange).toHaveBeenCalledWith(['Vue'])
    })

    it('removes last tag on Backspace when input is empty', () => {
        const onChange = vi.fn()
        renderTagsInput(<TagsInput defaultValue={['React', 'Vue']} onChange={onChange} />)

        const input = screen.getByRole('combobox')
        fireEvent.keyDown(input, { key: 'Backspace' })

        expect(onChange).toHaveBeenCalledWith(['React'])
    })

    it('prevents duplicates by default', () => {
        const onChange = vi.fn()
        renderTagsInput(<TagsInput defaultValue={['React']} onChange={onChange} />)

        const input = screen.getByRole('combobox')
        fireEvent.change(input, { target: { value: 'React' } })
        fireEvent.keyDown(input, { key: 'Enter' })

        expect(onChange).not.toHaveBeenCalledWith(['React', 'React'])
    })

    it('limits tags with maxTags', () => {
        const onChange = vi.fn()
        renderTagsInput(<TagsInput defaultValue={['React']} maxTags={2} onChange={onChange} />)

        const input = screen.getByRole('combobox')
        fireEvent.change(input, { target: { value: 'Vue' } })
        fireEvent.keyDown(input, { key: 'Enter' })

        expect(onChange).toHaveBeenCalledWith(['React', 'Vue'])

        fireEvent.change(input, { target: { value: 'Angular' } })
        fireEvent.keyDown(input, { key: 'Enter' })

        expect(input).toBeDisabled()
    })

    it('selects option from data when clicked', async () => {
        const onChange = vi.fn()
        renderTagsInput(<TagsInput data={['React', 'Vue', 'Angular']} onChange={onChange} />)

        fireEvent.click(screen.getByRole('combobox'))
        const option = await screen.findByRole('option', { name: 'Vue' })
        fireEvent.click(option)

        expect(onChange).toHaveBeenCalledWith(['Vue'])
    })
})
