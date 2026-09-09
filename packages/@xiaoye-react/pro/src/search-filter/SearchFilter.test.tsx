import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { UIProvider } from '@xiaoye-react/ui'
import { SearchFilter } from './SearchFilter'

const wrapper = ({ children }: { children: React.ReactNode }) => <UIProvider>{children}</UIProvider>

const fields = [
    { name: 'keyword', label: '关键词', type: 'text' as const },
    { name: 'status', label: '状态', type: 'select' as const, data: ['启用', '停用'] },
    { name: 'minAge', label: '最小年龄', type: 'number' as const }
]

describe('@xiaoye-react/pro/SearchFilter', () => {
    it('按 fields 配置渲染输入控件', () => {
        render(<SearchFilter fields={fields} />, { wrapper })

        expect(screen.getByLabelText('关键词')).toBeInTheDocument()
        expect(screen.getByLabelText('状态')).toBeInTheDocument()
        expect(screen.getByLabelText('最小年龄')).toBeInTheDocument()
    })

    it('输入后点击查询回调携带当前值', () => {
        const onSearch = vi.fn()
        render(<SearchFilter fields={fields} onSearch={onSearch} />, { wrapper })

        fireEvent.change(screen.getByLabelText('关键词'), { target: { value: '张三' } })
        fireEvent.click(screen.getByRole('button', { name: '查询' }))

        expect(onSearch).toHaveBeenCalledWith({ keyword: '张三' })
    })

    it('文本输入回车触发查询', () => {
        const onSearch = vi.fn()
        render(<SearchFilter fields={fields} onSearch={onSearch} />, { wrapper })

        fireEvent.change(screen.getByLabelText('关键词'), { target: { value: '李四' } })
        fireEvent.submit(screen.getByRole('button', { name: '查询' }).closest('form')!)

        expect(onSearch).toHaveBeenCalledWith({ keyword: '李四' })
    })

    it('重置恢复 defaultValues 并触发 onReset', () => {
        const onSearch = vi.fn()
        const onReset = vi.fn()
        render(
            <SearchFilter fields={fields} defaultValues={{ keyword: '初始' }} onSearch={onSearch} onReset={onReset} />,
            { wrapper }
        )

        fireEvent.change(screen.getByLabelText('关键词'), { target: { value: '修改后' } })
        fireEvent.click(screen.getByRole('button', { name: '重置' }))
        expect(onReset).toHaveBeenCalled()

        fireEvent.click(screen.getByRole('button', { name: '查询' }))
        expect(onSearch).toHaveBeenLastCalledWith({ keyword: '初始' })
    })

    it('字段超出 collapsedRows 时折叠并提供展开按钮', () => {
        const manyFields = [
            ...fields,
            { name: 'city', label: '城市', type: 'text' as const }
        ]
        render(<SearchFilter fields={manyFields} columns={3} collapsedRows={1} />, { wrapper })

        expect(screen.getByLabelText('关键词')).toBeInTheDocument()
        expect(screen.queryByLabelText('城市')).not.toBeInTheDocument()

        fireEvent.click(screen.getByRole('button', { name: '展开' }))
        expect(screen.getByLabelText('城市')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: '收起' })).toBeInTheDocument()
    })

    it('render 自定义字段并收集其值', () => {
        const onSearch = vi.fn()
        render(
            <SearchFilter
                fields={[
                    {
                        name: 'custom',
                        render: ({ onChange }) => (
                            <input aria-label="自定义" onChange={event => onChange(event.currentTarget.value)} />
                        )
                    }
                ]}
                onSearch={onSearch}
            />,
            { wrapper }
        )

        fireEvent.change(screen.getByLabelText('自定义'), { target: { value: 'abc' } })
        fireEvent.click(screen.getByRole('button', { name: '查询' }))

        expect(onSearch).toHaveBeenCalledWith({ custom: 'abc' })
    })
})
