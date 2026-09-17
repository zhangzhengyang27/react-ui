import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { UIProvider } from '../../core'
import { Cascader } from './Cascader'
import type { CascaderNode } from './cascader-utils'

const wrapper = ({ children }: { children: React.ReactNode }) => <UIProvider>{children}</UIProvider>

const regionData: CascaderNode[] = [
    {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
            {
                value: 'hangzhou',
                label: 'Hangzhou',
                children: [{ value: 'xihu', label: 'West Lake' }]
            },
            { value: 'ningbo', label: 'Ningbo' }
        ]
    },
    {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [{ value: 'nanjing', label: 'Nanjing' }]
    }
]

describe('Cascader', () => {
    it('打开面板逐级导航并选中叶子节点', () => {
        const onChange = vi.fn()
        render(<Cascader data={regionData} onChange={onChange} defaultDropdownOpened />, { wrapper })

        fireEvent.click(screen.getByRole('option', { name: 'Zhejiang' }))
        fireEvent.click(screen.getByRole('option', { name: 'Hangzhou' }))
        fireEvent.click(screen.getByRole('option', { name: 'West Lake' }))

        expect(onChange).toHaveBeenCalledWith('xihu')
        expect((screen.getByRole('textbox') as HTMLInputElement).value).toBe('Zhejiang / Hangzhou / West Lake')
    })

    it('defaultValue 回显完整路径', () => {
        render(<Cascader data={regionData} defaultValue="xihu" />, { wrapper })

        expect((screen.getByRole('textbox') as HTMLInputElement).value).toBe('Zhejiang / Hangzhou / West Lake')
    })

    it('多选：选中多个叶子并以 Pill 展示', () => {
        const onChange = vi.fn()
        render(
            <Cascader data={regionData} mode="multiple" onChange={onChange} defaultDropdownOpened />,
            { wrapper }
        )

        fireEvent.click(screen.getByRole('option', { name: 'Zhejiang' }))
        fireEvent.click(screen.getByRole('option', { name: 'Ningbo' }))
        expect(onChange).toHaveBeenLastCalledWith(['ningbo'])

        fireEvent.click(screen.getByRole('option', { name: 'Jiangsu' }))
        fireEvent.click(screen.getByRole('option', { name: 'Nanjing' }))
        expect(onChange).toHaveBeenLastCalledWith(['ningbo', 'nanjing'])

        expect(screen.getByText('Ningbo')).toBeInTheDocument()
        // Nanjing 同时出现在面板选项与 Pill 中
        expect(screen.getAllByText('Nanjing').length).toBeGreaterThan(0)
    })

    it('可搜索：命中叶子并展示路径', () => {
        const onChange = vi.fn()
        render(<Cascader data={regionData} searchable onChange={onChange} defaultDropdownOpened />, {
            wrapper
        })

        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'West' } })

        const option = screen.getByRole('option', { name: /West Lake/ })
        expect(option).toBeInTheDocument()
        expect(screen.getByText('Zhejiang / Hangzhou')).toBeInTheDocument()

        fireEvent.click(option)
        expect(onChange).toHaveBeenCalledWith('xihu')
    })

    it('懒加载：点击 hasChildren 节点触发 loadData', async () => {
        const loadData = vi.fn().mockResolvedValue([{ value: 'child-a', label: 'Child A' }])
        const asyncData: CascaderNode[] = [{ value: 'root', label: 'Root', hasChildren: true }]

        render(<Cascader data={asyncData} loadData={loadData} defaultDropdownOpened />, { wrapper })

        fireEvent.click(screen.getByRole('option', { name: 'Root' }))

        await waitFor(() => expect(screen.getByRole('option', { name: 'Child A' })).toBeInTheDocument())
        expect(loadData).toHaveBeenCalledTimes(1)

        fireEvent.click(screen.getByRole('option', { name: 'Child A' }))
        expect((screen.getByRole('textbox') as HTMLInputElement).value).toBe('Root / Child A')
    })

    it('键盘导航：上下在列内移动焦点，右展开下一级，左回上一级', async () => {
        const onChange = vi.fn()
        render(<Cascader data={regionData} onChange={onChange} defaultDropdownOpened />, { wrapper })

        const zhejiang = screen.getByRole('option', { name: 'Zhejiang' })
        zhejiang.focus()
        fireEvent.keyDown(zhejiang, { key: 'ArrowDown' })
        expect(document.activeElement).toBe(screen.getByRole('option', { name: 'Jiangsu' }))

        // ArrowRight 展开当前节点并聚焦下一列第一项
        fireEvent.keyDown(screen.getByRole('option', { name: 'Zhejiang' }), { key: 'ArrowRight' })
        await waitFor(() => expect(screen.getByRole('option', { name: 'Hangzhou' })).toBeInTheDocument())
        expect(document.activeElement).toBe(screen.getByRole('option', { name: 'Hangzhou' }))

        // ArrowLeft 回到上一列
        fireEvent.keyDown(screen.getByRole('option', { name: 'Hangzhou' }), { key: 'ArrowLeft' })
        expect(document.activeElement).toBe(screen.getByRole('option', { name: 'Zhejiang' }))

        // Enter 等价于点击：选中叶子
        fireEvent.keyDown(screen.getByRole('option', { name: 'Hangzhou' }), { key: 'ArrowRight' })
        await waitFor(() => expect(screen.getByRole('option', { name: 'West Lake' })).toBeInTheDocument())
        fireEvent.click(screen.getByRole('option', { name: 'West Lake' }))
        expect(onChange).toHaveBeenCalledWith('xihu')
    })

    it('clearable：清除选中值', () => {
        const onChange = vi.fn()
        render(<Cascader data={regionData} defaultValue="xihu" clearable onChange={onChange} />, { wrapper })

        fireEvent.click(screen.getByRole('button'))
        expect(onChange).toHaveBeenCalledWith(null)
        expect((screen.getByRole('textbox') as HTMLInputElement).value).toBe('')
    })

    it('禁用节点不可选中', () => {
        const onChange = vi.fn()
        const disabledData: CascaderNode[] = [
            { value: 'a', label: 'A', disabled: true },
            { value: 'b', label: 'B' }
        ]
        render(<Cascader data={disabledData} onChange={onChange} defaultDropdownOpened />, { wrapper })

        fireEvent.click(screen.getByRole('option', { name: 'A' }))
        expect(onChange).not.toHaveBeenCalled()

        fireEvent.click(screen.getByRole('option', { name: 'B' }))
        expect(onChange).toHaveBeenCalledWith('b')
    })

    it('键盘进入面板：打开态在输入框按 ArrowDown 聚焦首列首项', () => {
        render(<Cascader data={regionData} defaultDropdownOpened />, { wrapper })

        const input = screen.getByRole('textbox')
        input.focus()
        fireEvent.keyDown(input, { key: 'ArrowDown' })

        // 焦点从输入框移入面板首列首项，选项从此键盘可达
        expect(document.activeElement).toBe(screen.getByRole('option', { name: 'Zhejiang' }))

        // 面板内继续 ArrowDown 在列内移动
        fireEvent.keyDown(document.activeElement!, { key: 'ArrowDown' })
        expect(document.activeElement).toBe(screen.getByRole('option', { name: 'Jiangsu' }))
    })

    it('键盘进入面板：搜索模式下 ArrowDown 聚焦搜索结果首项', () => {
        render(<Cascader data={regionData} searchable defaultDropdownOpened />, { wrapper })

        const input = screen.getByRole('textbox')
        fireEvent.change(input, { target: { value: 'West' } })
        fireEvent.keyDown(input, { key: 'ArrowDown' })

        expect(document.activeElement).toBe(screen.getByRole('option', { name: /West Lake/ }))
    })

    it('禁用节点带 aria-disabled，读屏可感知', () => {
        const disabledData: CascaderNode[] = [{ value: 'a', label: 'A', disabled: true }]
        render(<Cascader data={disabledData} defaultDropdownOpened />, { wrapper })

        expect(screen.getByRole('option', { name: 'A' })).toHaveAttribute('aria-disabled', 'true')
    })
})
