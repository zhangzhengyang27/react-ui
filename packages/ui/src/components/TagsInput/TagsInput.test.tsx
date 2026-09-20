import { fireEvent, render, screen, waitFor } from '@testing-library/react'
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

        // 达到 maxTags 后输入框为 readOnly（而非 disabled），保证 Backspace 仍可删除 tag
        expect(input).toHaveAttribute('readonly')
    })

    it('selects option from data when clicked', async () => {
        const onChange = vi.fn()
        renderTagsInput(<TagsInput data={['React', 'Vue', 'Angular']} onChange={onChange} />)

        fireEvent.click(screen.getByRole('combobox'))
        const option = await screen.findByRole('option', { name: 'Vue' })
        fireEvent.click(option)

        expect(onChange).toHaveBeenCalledWith(['Vue'])
    })

    it('点击输入框本体不关闭已展开的建议下拉', async () => {
        renderTagsInput(<TagsInput data={['React', 'Vue']} />)
        const input = screen.getByRole('combobox')

        // 点击打开建议下拉
        fireEvent.click(input)
        const wrapper = input.closest('[aria-expanded]')
        await waitFor(() => {
            expect(wrapper).toHaveAttribute('aria-expanded', 'true')
            expect(screen.getByRole('option', { name: 'React' })).toBeInTheDocument()
        })

        // 输入过程中点击输入框（调整光标）不收起建议列表
        fireEvent.click(input)
        expect(wrapper).toHaveAttribute('aria-expanded', 'true')
        await waitFor(() => {
            expect(screen.getByRole('option', { name: 'Vue' })).toBeInTheDocument()
        })
    })

    it('gives consumer rightSection precedence over the internal clear button', () => {
        // div[data-position="right"] 限定输入框右侧 section，避免命中胶囊（Badge）的同名 span
        const custom = renderTagsInput(
            <TagsInput
                defaultValue={['React', 'Vue']}
                clearable
                rightSection={<span data-testid="custom-right-section" />}
            />
        )

        expect(screen.getByTestId('custom-right-section')).toBeInTheDocument()
        // 内部清除按钮让位，右侧 section 只渲染一个且不叠加
        expect(screen.queryByRole('button', { name: 'Clear all' })).not.toBeInTheDocument()
        expect(custom.container.querySelectorAll('div[data-position="right"]')).toHaveLength(1)
        expect(custom.container.querySelector('div[data-position="right"] svg')).toBeNull()

        // 未传 rightSection 时维持原有渲染：clearable 且有值时右侧仍为清除按钮
        const fallback = renderTagsInput(<TagsInput defaultValue={['React']} clearable />)
        expect(fallback.getByRole('button', { name: 'Clear all' })).toBeInTheDocument()
        expect(fallback.container.querySelectorAll('div[data-position="right"]')).toHaveLength(1)
    })
})
