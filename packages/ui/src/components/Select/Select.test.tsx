import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { UIProvider } from '../../core'
import { Loader } from '../Loader'
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

    // ---------- 可搜索交互 ----------

    it('opens dropdown on mouse down when searchable', async () => {
        renderSelect(<Select data={['React', 'Vue']} searchable />)
        const input = screen.getByRole('combobox')

        // 鼠标路径：mousedown → focus → click；mousedown 负责打开
        fireEvent.mouseDown(input)
        expect(input).toHaveAttribute('aria-expanded', 'true')
        await waitFor(() => {
            expect(screen.getByRole('option', { name: 'Vue' })).toBeInTheDocument()
        })
    })

    it('reopens dropdown on mouse down after Escape close', async () => {
        renderSelect(<Select data={['React', 'Vue']} searchable />)
        const input = screen.getByRole('combobox')

        fireEvent.mouseDown(input)
        await screen.findByRole('option', { name: 'Vue' })
        fireEvent.keyDown(input, { key: 'Escape' })
        await waitFor(() => expect(input).toHaveAttribute('aria-expanded', 'false'))

        fireEvent.mouseDown(input)
        expect(input).toHaveAttribute('aria-expanded', 'true')
        await waitFor(() => {
            expect(screen.getByRole('option', { name: 'Vue' })).toBeInTheDocument()
        })
    })

    it('opens dropdown on focus when openOnFocus', async () => {
        renderSelect(<Select data={['React', 'Vue']} searchable openOnFocus />)
        const input = screen.getByRole('combobox')

        fireEvent.focus(input)
        expect(input).toHaveAttribute('aria-expanded', 'true')
        await waitFor(() => {
            expect(screen.getByRole('option', { name: 'React' })).toBeInTheDocument()
        })
    })

    it('does not open on plain focus without openOnFocus', () => {
        renderSelect(<Select data={['React', 'Vue']} searchable />)
        const input = screen.getByRole('combobox')

        fireEvent.focus(input)
        expect(input).toHaveAttribute('aria-expanded', 'false')
    })

    it('resets stale search value when reopening dropdown', async () => {
        renderSelect(<Select data={['React', 'Vue']} searchable />)
        const input = screen.getByRole('combobox')

        fireEvent.change(input, { target: { value: 'Rea' } })
        await screen.findByRole('option', { name: 'React' })
        fireEvent.keyDown(input, { key: 'Escape' })
        await waitFor(() => expect(input).toHaveAttribute('aria-expanded', 'false'))

        // 键盘重开（非输入路径）：残留的 "Rea" 应被清空，完整列表可见
        fireEvent.keyDown(input, { key: 'ArrowDown' })
        await waitFor(() => {
            expect(screen.getByRole('option', { name: 'Vue' })).toBeInTheDocument()
        })
        expect((input as HTMLInputElement).value).toBe('')
    })

    it('resets search value after clearing selection', async () => {
        renderSelect(<Select data={['React', 'Vue']} searchable clearable defaultValue="React" />)
        const input = screen.getByRole('combobox')

        fireEvent.change(input, { target: { value: 'Rea' } })
        await screen.findByRole('option', { name: 'React' })

        fireEvent.click(screen.getByRole('button', { name: 'Clear selection' }))
        await waitFor(() => {
            expect(screen.getByRole('option', { name: 'Vue' })).toBeInTheDocument()
        })
        expect((input as HTMLInputElement).value).toBe('')
    })

    it('clears selection with clearable', () => {
        const onChange = vi.fn()
        renderSelect(<Select data={['React', 'Vue']} clearable defaultValue="React" onChange={onChange} />)

        fireEvent.click(screen.getByRole('button', { name: 'Clear selection' }))
        expect(onChange).toHaveBeenCalledWith(null)
        expect(screen.getByRole('combobox')).toHaveValue('')
    })

    it('resets keyboard active option when search changes, Enter selects first match', async () => {
        renderSelect(<Select data={['Apple', 'Banana', 'Cherry']} searchable />)
        const input = screen.getByRole('combobox')

        // 激活 Banana（index 1），随后搜索使列表只剩 Cherry
        fireEvent.keyDown(input, { key: 'ArrowDown' })
        fireEvent.keyDown(input, { key: 'ArrowDown' })
        fireEvent.change(input, { target: { value: 'Che' } })
        await screen.findByRole('option', { name: 'Cherry' })

        fireEvent.keyDown(input, { key: 'Enter' })
        await waitFor(() => expect(input).toHaveValue('Cherry'))
    })

    it('navigates options with keyboard across groups', async () => {
        const onChange = vi.fn()
        renderSelect(
            <Select
                data={[
                    { value: 'react', label: 'React', group: 'Frontend' },
                    { value: 'vue', label: 'Vue', group: 'Frontend' },
                    { value: 'node', label: 'Node', group: 'Backend' }
                ]}
                onChange={onChange}
            />
        )
        const input = screen.getByRole('combobox')
        fireEvent.click(input)
        await screen.findByRole('group', { name: 'Frontend' })

        expect(screen.getByRole('group', { name: 'Backend' })).toBeInTheDocument()

        // 打开时激活第一项；两次 ArrowDown 到达 Backend 组的 Node
        fireEvent.keyDown(input, { key: 'ArrowDown' })
        fireEvent.keyDown(input, { key: 'ArrowDown' })
        fireEvent.keyDown(input, { key: 'Enter' })

        await waitFor(() => expect(onChange).toHaveBeenCalledWith('node'))
    })

    it('selects first option with Enter immediately after opening', async () => {
        const onChange = vi.fn()
        renderSelect(<Select data={['React', 'Vue']} onChange={onChange} />)
        const input = screen.getByRole('combobox')

        fireEvent.click(input)
        await screen.findByRole('option', { name: 'React' })
        fireEvent.keyDown(input, { key: 'Enter' })

        await waitFor(() => expect(onChange).toHaveBeenCalledWith('React'))
    })

    // ---------- 受控 ----------

    it('supports controlled value', async () => {
        const onChange = vi.fn()
        const { rerender } = renderSelect(
            <UIProvider>
                <Select data={['React', 'Vue']} value="React" onChange={onChange} />
            </UIProvider>
        )
        expect(screen.getByRole('combobox')).toHaveValue('React')

        fireEvent.click(screen.getByRole('combobox'))
        fireEvent.click(await screen.findByRole('option', { name: 'Vue' }))

        expect(onChange).toHaveBeenCalledWith('Vue')
        // 受控模式下 UI 不变，直到父组件更新 value
        expect(screen.getByRole('combobox')).toHaveValue('React')

        rerender(
            <UIProvider>
                <Select data={['React', 'Vue']} value="Vue" onChange={onChange} />
            </UIProvider>
        )
        expect(screen.getByRole('combobox')).toHaveValue('Vue')
    })

    // ---------- 取消选择 ----------

    it('deselects when clicking the selected option by default', async () => {
        const onChange = vi.fn()
        renderSelect(<Select data={['React', 'Vue']} defaultValue="React" onChange={onChange} />)

        fireEvent.click(screen.getByRole('combobox'))
        fireEvent.click(await screen.findByRole('option', { name: 'React' }))

        expect(onChange).toHaveBeenCalledWith(null)
    })

    it('keeps value when allowDeselect is false', async () => {
        const onChange = vi.fn()
        renderSelect(
            <Select data={['React', 'Vue']} defaultValue="React" allowDeselect={false} onChange={onChange} />
        )

        fireEvent.click(screen.getByRole('combobox'))
        fireEvent.click(await screen.findByRole('option', { name: 'React' }))

        expect(onChange).toHaveBeenCalledWith('React')
    })

    // ---------- 失焦与回调 ----------

    it('closes dropdown on blur', async () => {
        renderSelect(<Select data={['React', 'Vue']} />)
        const input = screen.getByRole('combobox')

        fireEvent.click(input)
        await screen.findByRole('option', { name: 'Vue' })
        expect(input).toHaveAttribute('aria-expanded', 'true')

        fireEvent.blur(input)
        await waitFor(() => expect(input).toHaveAttribute('aria-expanded', 'false'))
    })

    it('keeps dropdown open when focus moves into the dropdown', async () => {
        renderSelect(<Select data={['React', 'Vue']} clearable defaultValue="React" />)
        const input = screen.getByRole('combobox')

        fireEvent.click(input)
        const option = await screen.findByRole('option', { name: 'Vue' })

        // 焦点落入下拉内部时不关闭（选项点击场景由 mousedown preventDefault 保护，这里直接断言判定逻辑）
        fireEvent.blur(input, { relatedTarget: option })
        expect(input).toHaveAttribute('aria-expanded', 'true')
    })

    it('calls consumer onFocus and onBlur handlers', async () => {
        const onFocus = vi.fn()
        const onBlur = vi.fn()
        renderSelect(<Select data={['a']} onFocus={onFocus} onBlur={onBlur} />)

        const input = screen.getByRole('combobox')
        fireEvent.focus(input)
        fireEvent.blur(input)

        expect(onFocus).toHaveBeenCalledTimes(1)
        expect(onBlur).toHaveBeenCalledTimes(1)
    })

    // ---------- 错误态 ----------

    it('marks input invalid when error is set', () => {
        renderSelect(<Select data={['a']} label="Label" error="Error" />)
        expect(screen.getByRole('combobox')).toHaveAttribute('aria-invalid', 'true')
    })

    // ---------- 展示能力 ----------

    it('shows loader instead of chevron when loading', () => {
        const { container } = renderSelect(<Select data={['a']} loading />)
        expect(container.querySelector(`.${Loader.classes.root}`)).toBeInTheDocument()
        // 加载中不渲染清除按钮
        expect(screen.queryByRole('button', { name: 'Clear selection' })).not.toBeInTheDocument()
    })

    it('limits rendered options', async () => {
        renderSelect(<Select data={['a', 'b', 'c', 'd']} limit={2} />)
        fireEvent.click(screen.getByRole('combobox'))

        const options = await screen.findAllByRole('option')
        expect(options).toHaveLength(2)
    })

    it('renders custom option content via renderOption', async () => {
        renderSelect(
            <Select
                data={['React', 'Vue']}
                defaultValue="React"
                renderOption={({ option, checked }) => (
                    <span data-testid={`custom-${option.value}`}>{checked ? `✓ ${option.label}` : option.label}</span>
                )}
            />
        )
        fireEvent.click(screen.getByRole('combobox'))

        expect(await screen.findByTestId('custom-React')).toHaveTextContent('✓ React')
        expect(screen.getByTestId('custom-Vue')).toHaveTextContent('Vue')
    })

    it('supports custom filter function', async () => {
        renderSelect(
            <Select
                data={['React', 'Vue', 'Angular']}
                searchable
                filter={({ options, search }) =>
                    options.filter(item => item.label.toLowerCase().startsWith(search.toLowerCase()))
                }
            />
        )
        const input = screen.getByRole('combobox')
        // "a" 用 startsWith 不命中 React/Vue，但命中 Angular
        fireEvent.change(input, { target: { value: 'a' } })

        await waitFor(() => {
            expect(screen.getByRole('option', { name: 'Angular' })).toBeInTheDocument()
            expect(screen.queryByRole('option', { name: 'React' })).not.toBeInTheDocument()
        })
    })

    it('renders grouped data format', async () => {
        renderSelect(
            <Select data={[{ group: 'Frontend', items: ['React', 'Vue'] }, 'Node']} />
        )
        fireEvent.click(screen.getByRole('combobox'))

        const group = await screen.findByRole('group', { name: 'Frontend' })
        expect(group).toHaveTextContent('React')
        expect(group).toHaveTextContent('Vue')
        expect(screen.getByRole('option', { name: 'Node' })).toBeInTheDocument()
    })

    it('does not warn on duplicate option values', async () => {
        const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
        renderSelect(<Select data={['A', 'A']} />)
        fireEvent.click(screen.getByRole('combobox'))
        await screen.findAllByRole('option', { name: 'A' })

        const keyWarning = spy.mock.calls.find(args =>
            String(args[0]).includes('Encountered two children with the same key')
        )
        expect(keyWarning).toBeFalsy()
        spy.mockRestore()
    })

    it('skips disabled options during keyboard navigation', async () => {
        const onChange = vi.fn()
        renderSelect(
            <Select
                data={[
                    { value: 'a', label: 'A' },
                    { value: 'b', label: 'B', disabled: true },
                    { value: 'c', label: 'C' }
                ]}
                onChange={onChange}
            />
        )
        const input = screen.getByRole('combobox')
        fireEvent.click(input)
        await screen.findByRole('option', { name: 'A' })

        fireEvent.keyDown(input, { key: 'ArrowDown' })
        fireEvent.keyDown(input, { key: 'Enter' })

        await waitFor(() => expect(onChange).toHaveBeenCalledWith('c'))
    })

    it('rotates chevron when dropdown opens', async () => {
        renderSelect(<Select data={['React', 'Vue']} />)
        const input = screen.getByRole('combobox')
        const chevron = input.parentElement!.querySelector('svg[data-opened]') ?? document.body
        expect(document.querySelector('svg[data-opened]')).toBeNull()

        fireEvent.click(input)
        await screen.findByRole('option', { name: 'Vue' })
        expect(document.querySelector('svg[data-opened]')).not.toBeNull()
        void chevron
    })
})
