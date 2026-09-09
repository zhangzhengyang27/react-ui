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
})
