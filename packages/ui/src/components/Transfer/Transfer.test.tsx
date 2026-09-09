import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { UIProvider } from '../../core'
import { Transfer } from './Transfer'

const wrapper = ({ children }: { children: React.ReactNode }) => <UIProvider>{children}</UIProvider>

const fruits = [
    { value: 'apple', label: '苹果' },
    { value: 'banana', label: '香蕉' },
    { value: 'cherry', label: '樱桃' },
    { value: 'durian', label: '榴莲', disabled: true }
]

describe('Transfer', () => {
    it('按 value 拆分左右面板', () => {
        render(<Transfer data={fruits} defaultValue={['banana']} />, { wrapper })

        // 左侧：未选择项；右侧：已选择项
        expect(screen.getByText('苹果')).toBeInTheDocument()
        expect(screen.getByText('樱桃')).toBeInTheDocument()
        expect(screen.getByText('香蕉')).toBeInTheDocument()
        // 榴莲初始未选中，出现在左侧
        expect(screen.getAllByText('榴莲')).toHaveLength(1)
    })

    it('点击左侧项迁移到右侧并触发 onChange（保持 data 顺序）', () => {
        const onChange = vi.fn()
        render(<Transfer data={fruits} onChange={onChange} />, { wrapper })

        fireEvent.click(screen.getByRole('checkbox', { name: '樱桃' }))
        expect(onChange).toHaveBeenLastCalledWith(['cherry'])

        fireEvent.click(screen.getByRole('checkbox', { name: '苹果' }))
        expect(onChange).toHaveBeenLastCalledWith(['apple', 'cherry'])
    })

    it('点击右侧项迁回左侧', () => {
        const onChange = vi.fn()
        render(<Transfer data={fruits} defaultValue={['banana', 'cherry']} onChange={onChange} />, { wrapper })

        fireEvent.click(screen.getByRole('checkbox', { name: '香蕉' }))
        expect(onChange).toHaveBeenLastCalledWith(['cherry'])
    })

    it('面板头部全选按钮：左侧全选迁入，右侧清空迁出', () => {
        const onChange = vi.fn()
        render(<Transfer data={fruits} onChange={onChange} />, { wrapper })

        fireEvent.click(screen.getByRole('button', { name: '全选到右侧' }))
        // 榴莲禁用，不参与全选
        expect(onChange).toHaveBeenLastCalledWith(['apple', 'banana', 'cherry'])

        fireEvent.click(screen.getByRole('button', { name: '全部移除' }))
        expect(onChange).toHaveBeenLastCalledWith([])
    })

    it('面板计数反映各项数量', () => {
        render(<Transfer data={fruits} defaultValue={['apple', 'banana']} />, { wrapper })

        // 左侧剩余 2 项（樱桃 + 禁用的榴莲），右侧已选择 2 项
        expect(screen.getAllByText('2')).toHaveLength(2)
    })

    it('searchable 过滤面板内容', () => {
        render(<Transfer data={fruits} searchable />, { wrapper })

        fireEvent.change(screen.getByLabelText('搜索未选择项'), { target: { value: '苹' } })

        expect(screen.getByText('苹果')).toBeInTheDocument()
        expect(screen.queryByText('樱桃')).not.toBeInTheDocument()
    })

    it('禁用项不可迁移', () => {
        const onChange = vi.fn()
        render(<Transfer data={fruits} onChange={onChange} />, { wrapper })

        fireEvent.click(screen.getByRole('checkbox', { name: '榴莲' }))
        expect(onChange).not.toHaveBeenCalled()
    })

    it('面板列表方向键在项之间移动焦点', () => {
        render(<Transfer data={fruits} />, { wrapper })

        const apple = screen.getByRole('checkbox', { name: '苹果' })
        const banana = screen.getByRole('checkbox', { name: '香蕉' })

        apple.focus()
        fireEvent.keyDown(apple, { key: 'ArrowDown' })
        expect(document.activeElement).toBe(banana)

        fireEvent.keyDown(banana, { key: 'ArrowUp' })
        expect(document.activeElement).toBe(apple)
    })

    it('面板携带 role=group 与 aria-label', () => {
        render(<Transfer data={fruits} titles={['来源', '目标']} />, { wrapper })

        const groups = screen.getAllByRole('group')
        expect(groups).toHaveLength(2)
        expect(groups[0]).toHaveAttribute('aria-label', '来源')
        expect(groups[1]).toHaveAttribute('aria-label', '目标')
    })

    it('disabled 禁用整个组件', () => {
        const onChange = vi.fn()
        render(<Transfer data={fruits} disabled onChange={onChange} />, { wrapper })

        fireEvent.click(screen.getByRole('checkbox', { name: '苹果' }))
        expect(onChange).not.toHaveBeenCalled()
    })
})
