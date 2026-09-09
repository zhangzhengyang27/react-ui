import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { UIProvider } from '@xiaoye-react/ui'
import { ProTable } from './ProTable'
import type { ProTableRequestParams } from './ProTable'

const wrapper = ({ children }: { children: React.ReactNode }) => <UIProvider>{children}</UIProvider>

interface User {
    id: string
    name: string
}

const columns = [
    { accessor: 'name', title: '姓名' },
    { accessor: 'id', title: '工号' }
]

function makeRequest(
    recordsFor: (params: ProTableRequestParams) => User[],
    total?: number
) {
    return vi.fn(async (params: ProTableRequestParams) => ({
        records: recordsFor(params),
        total: total ?? recordsFor(params).length
    }))
}

const usersFor = (params: ProTableRequestParams) =>
    Array.from({ length: 3 }, (_, index) => ({
        id: `E-${(params.page - 1) * 3 + index + 1}`,
        name: `用户${(params.page - 1) * 3 + index + 1}`
    }))

describe('@xiaoye-react/pro/ProTable', () => {
    it('挂载后自动发起首查并渲染数据', async () => {
        const request = makeRequest(usersFor, 3)
        render(<ProTable columns={columns} request={request} />, { wrapper })

        await waitFor(() => expect(screen.getByText('用户1')).toBeInTheDocument())
        expect(request).toHaveBeenCalledWith(
            expect.objectContaining({ page: 1, pageSize: 10, search: {}, sortStatus: null })
        )
        // total 透传给 DataTable 分页底栏
        expect(screen.getByText('共 3 条')).toBeInTheDocument()
    })

    it('翻页携带新页码重新请求', async () => {
        const request = makeRequest(usersFor, 45)
        render(<ProTable columns={columns} request={request} total-label="t" />, { wrapper })

        await waitFor(() => expect(screen.getByRole('button', { name: 'Page 2' })).toBeInTheDocument())
        fireEvent.click(screen.getByRole('button', { name: 'Page 2' }))

        await waitFor(() =>
            expect(request).toHaveBeenLastCalledWith(
                expect.objectContaining({ page: 2, pageSize: 10 })
            )
        )
        await waitFor(() => expect(screen.getByText('用户4')).toBeInTheDocument())
    })

    it('查询区触发搜索并回到第 1 页', async () => {
        const request = makeRequest(usersFor, 45)
        render(
            <ProTable
                columns={columns}
                request={request}
                search={{ fields: [{ name: 'keyword', type: 'text', label: '关键词' }] }}
            />,
            { wrapper }
        )

        await waitFor(() => expect(screen.getByLabelText('关键词')).toBeInTheDocument())
        fireEvent.click(screen.getByRole('button', { name: 'Page 3' }))
        await waitFor(() =>
            expect(request).toHaveBeenLastCalledWith(expect.objectContaining({ page: 3 }))
        )

        fireEvent.change(screen.getByLabelText('关键词'), { target: { value: '王五' } })
        fireEvent.click(screen.getByRole('button', { name: '查询' }))

        await waitFor(() =>
            expect(request).toHaveBeenLastCalledWith(
                expect.objectContaining({ page: 1, search: { keyword: '王五' } })
            )
        )
    })

    it('刷新按钮以当前参数重新请求', async () => {
        const request = makeRequest(usersFor, 3)
        render(<ProTable columns={columns} request={request} />, { wrapper })

        await waitFor(() => expect(request).toHaveBeenCalledTimes(1))
        fireEvent.click(screen.getByRole('button', { name: '刷新' }))

        await waitFor(() => expect(request).toHaveBeenCalledTimes(2))
        expect(request).toHaveBeenLastCalledWith(expect.objectContaining({ page: 1 }))
    })

    it('竞态：慢速的旧请求响应被丢弃', async () => {
        const slow = vi.fn(
            (params: ProTableRequestParams) =>
                new Promise<{ records: User[]; total: number }>(resolve =>
                    setTimeout(() => resolve({ records: [{ id: 'S', name: '慢速数据' }], total: 1 }), 200)
                )
        )
        const fast = vi.fn(async () => ({ records: [{ id: 'F', name: '快速数据' }], total: 1 }))

        const { rerender } = render(<ProTable columns={columns} request={slow} />, { wrapper })
        // loading 中的表格
        rerender(<ProTable columns={columns} request={fast} />)

        await waitFor(() => expect(screen.getByText('快速数据')).toBeInTheDocument())
        await new Promise(resolve => setTimeout(resolve, 300))

        // 慢速响应返回后不应覆盖快速数据
        expect(screen.getByText('快速数据')).toBeInTheDocument()
        expect(screen.queryByText('慢速数据')).not.toBeInTheDocument()
    })

    it('排序变化回第 1 页并透传 sortStatus', async () => {
        const request = makeRequest(usersFor, 45)
        render(
            <ProTable
                columns={[
                    { accessor: 'name', title: '姓名', sortable: true },
                    { accessor: 'id', title: '工号' }
                ]}
                request={request}
            />,
            { wrapper }
        )

        await waitFor(() => expect(screen.getByText('姓名')).toBeInTheDocument())
        fireEvent.click(screen.getByText('姓名').closest('button')!)

        await waitFor(() =>
            expect(request).toHaveBeenLastCalledWith(
                expect.objectContaining({ page: 1, sortStatus: { accessor: 'name', direction: 'asc' } })
            )
        )
    })

    it('actionsRef.refresh 以当前参数重新请求', async () => {
        const request = makeRequest(usersFor, 3);
        const actionsRef = { current: null as { refresh: () => void } | null };
        render(<ProTable columns={columns} request={request} actionsRef={actionsRef} />, { wrapper });

        await waitFor(() => expect(request).toHaveBeenCalledTimes(1));
        actionsRef.current!.refresh();

        await waitFor(() => expect(request).toHaveBeenCalledTimes(2));
        expect(request).toHaveBeenLastCalledWith(expect.objectContaining({ page: 1 }));
    });

    it('request 失败时结束 loading 并回调 onRequestError', async () => {
        const request = vi.fn().mockRejectedValue(new Error('网络错误'))
        const onRequestError = vi.fn()
        render(<ProTable columns={columns} request={request} onRequestError={onRequestError} />, { wrapper })

        await waitFor(() => expect(onRequestError).toHaveBeenCalled())
        expect(onRequestError.mock.calls[0][0]).toBeInstanceOf(Error)
    })
})
