import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { UIProvider } from '../../core'
import { Autocomplete } from './Autocomplete'

const renderAutocomplete = (ui: React.ReactElement) => render(<UIProvider>{ui}</UIProvider>)

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

        const clearButton = screen.getByRole('button', { name: 'Clear input' })
        fireEvent.click(clearButton)

        expect(onChange).toHaveBeenCalledWith('')
    })

    it('gives consumer rightSection precedence over the internal clear button and chevron', () => {
        const custom = renderAutocomplete(
            <Autocomplete
                data={['React', 'Vue']}
                defaultValue="Vue"
                clearable
                rightSection={<span data-testid="custom-right-section" />}
            />
        )

        expect(screen.getByTestId('custom-right-section')).toBeInTheDocument()
        // 内部控件（清除按钮 / 箭头均为 svg）整体让位，且右侧 section 不重复堆叠
        expect(screen.queryByRole('button', { name: 'Clear input' })).not.toBeInTheDocument()
        const rightSection = custom.container.querySelector('div[data-position="right"]')
        expect(custom.container.querySelectorAll('div[data-position="right"]')).toHaveLength(1)
        expect(rightSection?.querySelector('svg')).toBeNull()
        expect(rightSection?.querySelector('[data-testid="custom-right-section"]')).not.toBeNull()

        // 未传 rightSection 时维持原有渲染：箭头照常出现在右侧 section
        const fallback = renderAutocomplete(<Autocomplete data={['React', 'Vue']} />)
        expect(fallback.container.querySelector('div[data-position="right"] svg')).not.toBeNull()
    })

    it('groups consecutive items carrying the same `group`', async () => {
        renderAutocomplete(
            <Autocomplete
                data={[
                    { value: 'React', group: 'Frontend' },
                    { value: 'Angular', group: 'Frontend' },
                    { value: 'Node', group: 'Backend' }
                ]}
            />
        )

        fireEvent.click(screen.getByRole('combobox'))

        expect(await screen.findByRole('option', { name: 'Angular' })).toBeInTheDocument()
        expect(screen.getByRole('option', { name: 'Node' })).toBeInTheDocument()
        // 分组标题不能混成 option：3 个数据点只有 3 个 option，标签在 option 之外
        expect(screen.getAllByRole('option')).toHaveLength(3)
        const label = screen.getByText('Frontend')
        expect(label.closest('[role="option"]')).toBeNull()
    })
})
