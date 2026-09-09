import { fireEvent, render, screen, within } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { UIProvider } from '../../core'
import { DataTable } from './DataTable'

const wrapper = ({ children }: { children: React.ReactNode }) => <UIProvider>{children}</UIProvider>

interface User {
    name: string
    age: number
    email: string
}

const users: User[] = [
    { name: '张三', age: 28, email: 'zhang@example.com' },
    { name: '李四', age: 22, email: 'li@example.com' },
    { name: '王五', age: 35, email: 'wang@example.com' }
]

const basicColumns = [
    { accessor: 'name', title: '姓名' },
    { accessor: 'age', title: '年龄', sortable: true },
    { accessor: 'email', title: '邮箱' }
]

describe('DataTable', () => {
    it('渲染表头与行数据', () => {
        render(<DataTable columns={basicColumns as any} records={users} />, { wrapper })

        expect(screen.getByRole('table')).toBeInTheDocument()
        expect(screen.getByText('姓名')).toBeInTheDocument()
        expect(screen.getByText('张三')).toBeInTheDocument()
        expect(screen.getByText('wang@example.com')).toBeInTheDocument()
        expect(screen.getAllByRole('row')).toHaveLength(4) // 表头 + 3 行
    })

    it('支持 render 自定义单元格并接收行索引', () => {
        render(
            <DataTable
                columns={[
                    { accessor: 'name', render: (record: User, index: number) => `${index + 1}-${record.name}` }
                ] as any}
                records={users}
            />,
            { wrapper }
        )

        expect(screen.getByText('1-张三')).toBeInTheDocument()
        expect(screen.getByText('3-王五')).toBeInTheDocument()
    })

    it('隐藏列不渲染', () => {
        render(<DataTable columns={[...basicColumns, { accessor: 'age', hidden: true }] as any} records={users} />, {
            wrapper
        })

        expect(screen.getAllByRole('columnheader')).toHaveLength(3)
    })

    it('无数据显示默认空态', () => {
        render(<DataTable columns={basicColumns as any} records={[]} />, { wrapper })

        expect(screen.getByText('暂无数据')).toBeInTheDocument()
    })

    it('无数据显示自定义空态', () => {
        render(<DataTable columns={basicColumns as any} records={[]} empty={<div>custom-empty</div>} />, {
            wrapper
        })

        expect(screen.getByText('custom-empty')).toBeInTheDocument()
        expect(screen.queryByText('暂无数据')).not.toBeInTheDocument()
    })

    it('loading 时标记 aria-busy', () => {
        const { container } = render(<DataTable columns={basicColumns as any} records={users} loading />, {
            wrapper
        })

        expect(screen.getByRole('table', { hidden: true }).closest('[aria-busy="true"]')).not.toBeNull()
        expect(container.querySelector('[aria-busy="true"]')).toBeInTheDocument()
    })

    it('非受控排序：点击表头本地升序，再次点击降序', () => {
        render(<DataTable columns={basicColumns as any} records={users} />, { wrapper })

        const ageHeader = screen.getByText('年龄')
        fireEvent.click(ageHeader.closest('button')!)

        let rows = screen.getAllByRole('row').slice(1)
        expect(within(rows[0]).getByText('22')).toBeInTheDocument() // 李四最小

        fireEvent.click(ageHeader.closest('button')!)
        rows = screen.getAllByRole('row').slice(1)
        expect(within(rows[0]).getByText('35')).toBeInTheDocument() // 王五最大
    })

    it('受控排序：不改动数据顺序，仅触发回调', () => {
        const onSortStatusChange = vi.fn()
        render(
            <DataTable
                columns={basicColumns as any}
                records={users}
                sortStatus={null}
                onSortStatusChange={onSortStatusChange}
            />,
            { wrapper }
        )

        fireEvent.click(screen.getByText('年龄').closest('button')!)

        expect(onSortStatusChange).toHaveBeenCalledWith({ accessor: 'age', direction: 'asc' })
        const firstRow = screen.getAllByRole('row')[1]
        expect(within(firstRow).getByText('28')).toBeInTheDocument() // 保持原顺序
    })

    it('表头展示 aria-sort', () => {
        render(<DataTable columns={basicColumns as any} records={users} defaultSortStatus={{ accessor: 'age', direction: 'asc' }} />, {
            wrapper
        })

        const ageHeader = screen.getByText('年龄').closest('th')!
        expect(ageHeader).toHaveAttribute('aria-sort', 'ascending')
    })

    it('复选框行选择：单行勾选、全选与半选态', () => {
        const onSelectedKeysChange = vi.fn()
        render(
            <DataTable
                columns={basicColumns as any}
                records={users}
                rowKey={(record: User) => record.name}
                selectionMode="checkbox"
                onSelectedKeysChange={onSelectedKeysChange}
            />,
            { wrapper }
        )

        const checkboxes = screen.getAllByRole('checkbox')
        expect(checkboxes).toHaveLength(4) // 表头全选 + 3 行

        fireEvent.click(checkboxes[1])
        expect(onSelectedKeysChange).toHaveBeenLastCalledWith(['张三'])

        fireEvent.click(checkboxes[2])
        expect(onSelectedKeysChange).toHaveBeenLastCalledWith(['张三', '李四'])

        // 全选
        fireEvent.click(checkboxes[0])
        expect(onSelectedKeysChange).toHaveBeenLastCalledWith(['张三', '李四', '王五'])
    })

    it('单选模式：radio 互斥', () => {
        render(
            <DataTable
                columns={basicColumns as any}
                records={users}
                rowKey={(record: User) => record.name}
                selectionMode="radio"
                defaultSelectedKeys={['张三']}
            />,
            { wrapper }
        )

        const radios = screen.getAllByRole('radio')
        expect(radios).toHaveLength(3)
        expect(radios[0]).toBeChecked()

        fireEvent.click(radios[2])
        expect(radios[2]).toBeChecked()
    })

    it('提供 total 时渲染分页底栏并触发翻页回调', () => {
        const onPageChange = vi.fn()
        render(
            <DataTable columns={basicColumns as any} records={users} total={45} defaultPageSize={10} onPageChange={onPageChange} />,
            { wrapper }
        )

        expect(screen.getByText('共 45 条')).toBeInTheDocument()

        fireEvent.click(screen.getByRole('button', { name: 'Page 2' }))
        expect(onPageChange).toHaveBeenCalledWith(2)
    })

    it('切换每页条数时重置页码（非受控）', () => {
        const onPageSizeChange = vi.fn()
        const onPageChange = vi.fn()
        render(
            <DataTable
                columns={basicColumns as any}
                records={users}
                total={45}
                defaultPage={3}
                defaultPageSize={10}
                onPageChange={onPageChange}
                onPageSizeChange={onPageSizeChange}
            />,
            { wrapper }
        )

        fireEvent.change(screen.getByLabelText('每页条数'), { target: { value: '20' } })

        expect(onPageSizeChange).toHaveBeenCalledWith(20)
        expect(onPageChange).toHaveBeenCalledWith(1)
    })

    it('行点击回调触发，单元格内控件点击不冒泡', () => {
        const onRowClick = vi.fn()
        render(
            <DataTable
                columns={basicColumns as any}
                records={users}
                rowKey={(record: User) => record.name}
                selectionMode="checkbox"
                onRowClick={onRowClick}
            />,
            { wrapper }
        )

        fireEvent.click(screen.getByText('张三'))
        expect(onRowClick).toHaveBeenCalledTimes(1)

        fireEvent.click(screen.getAllByLabelText('选择此行')[0])
        expect(onRowClick).toHaveBeenCalledTimes(1) // checkbox 点击未触发行点击
    })

    it('固定列设置 left 偏移', () => {
        const { container } = render(
            <DataTable
                columns={[
                    { accessor: 'name', title: '姓名', sticky: 'left', width: 120 },
                    { accessor: 'age', title: '年龄' }
                ] as any}
                records={users}
            />,
            { wrapper }
        )

        const stickyTh = container.querySelector('th[data-sticky="left"]')
        expect(stickyTh).not.toBeNull()
        expect((stickyTh as HTMLElement).style.left).toBe('0px')

        const stickyTd = container.querySelector('td[data-sticky="left"]')
        expect((stickyTd as HTMLElement).style.left).toBe('0px')
    })

    it('ellipsis 单元格添加 title 提示', () => {
        render(
            <DataTable columns={[{ accessor: 'email', ellipsis: true }] as any} records={users} />, { wrapper }
        )

        const cell = screen.getByTitle('zhang@example.com')
        expect(cell).toBeInTheDocument()
    })
})
