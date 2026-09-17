import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { UIProvider } from '../../core'
import { getPaginationItems, Pagination } from './Pagination'

const renderPagination = (props: React.ComponentProps<typeof Pagination>) =>
    render(
        <UIProvider>
            <Pagination {...props} />
        </UIProvider>
    )

describe('Pagination', () => {
    it('renders page buttons and controls', () => {
        renderPagination({ total: 5 })

        expect(screen.getByLabelText('Previous page')).toBeInTheDocument()
        expect(screen.getByLabelText('Next page')).toBeInTheDocument()
        expect(screen.getByLabelText('Page 1')).toBeInTheDocument()
        expect(screen.getByLabelText('Page 5')).toBeInTheDocument()
    })

    it('does not render previous/next controls when withControls is false', () => {
        renderPagination({ total: 5, withControls: false })

        expect(screen.queryByLabelText('Previous page')).not.toBeInTheDocument()
        expect(screen.queryByLabelText('Next page')).not.toBeInTheDocument()
        expect(screen.getByLabelText('Page 1')).toBeInTheDocument()
    })

    it('renders first/last controls when withEdges is true', () => {
        renderPagination({ total: 5, withEdges: true })

        expect(screen.getByLabelText('First page')).toBeInTheDocument()
        expect(screen.getByLabelText('Last page')).toBeInTheDocument()
    })

    it('calls onChange when a page is clicked', () => {
        const onChange = vi.fn()
        renderPagination({ total: 5, onChange })

        fireEvent.click(screen.getByLabelText('Page 3'))
        expect(onChange).toHaveBeenCalledWith(3)
    })

    it('updates active page on click in uncontrolled mode', () => {
        renderPagination({ total: 5, defaultValue: 1 })

        fireEvent.click(screen.getByLabelText('Page 3'))
        expect(screen.getByLabelText('Page 3')).toHaveAttribute('aria-current', 'page')
    })

    it('respects controlled value', () => {
        const { rerender } = renderPagination({ total: 5, value: 2 })

        expect(screen.getByLabelText('Page 2')).toHaveAttribute('aria-current', 'page')

        rerender(
            <UIProvider>
                <Pagination total={5} value={4} />
            </UIProvider>
        )

        expect(screen.getByLabelText('Page 4')).toHaveAttribute('aria-current', 'page')
    })

    it('renders dots for large page counts', () => {
        renderPagination({ total: 20, value: 10 })

        expect(screen.getAllByLabelText('...').length).toBeGreaterThan(0)
    })

    it('applies color prop to active control via the CSS variable consumed by CSS', () => {
        // 变量名须与 Pagination.module.css 的 .control[data-active] 读取端一致
        //（--pagination-control-bg），否则 color prop 对激活页样式零影响
        renderPagination({ total: 5, value: 2, color: 'red', 'data-testid': 'pagination-root' })

        const root = screen.getByTestId('pagination-root')
        expect(root.style.getPropertyValue('--pagination-control-bg')).not.toBe('')

        // 未传 color 时不写入该变量，激活页回落主题默认主色
        renderPagination({ total: 5, value: 2, 'data-testid': 'pagination-plain' })
        expect(screen.getByTestId('pagination-plain').style.getPropertyValue('--pagination-control-bg')).toBe('')
    })

    it('disables previous and first controls on the first page', () => {
        renderPagination({ total: 5, value: 1, withEdges: true })

        expect(screen.getByLabelText('Previous page')).toBeDisabled()
        expect(screen.getByLabelText('First page')).toBeDisabled()
        expect(screen.getByLabelText('Next page')).not.toBeDisabled()
    })

    it('disables next and last controls on the last page', () => {
        renderPagination({ total: 5, value: 5, withEdges: true })

        expect(screen.getByLabelText('Next page')).toBeDisabled()
        expect(screen.getByLabelText('Last page')).toBeDisabled()
        expect(screen.getByLabelText('Previous page')).not.toBeDisabled()
    })
})

describe('getPaginationItems', () => {
    it('returns all pages when total is small', () => {
        expect(getPaginationItems(5, 1, 1, 1)).toEqual([1, 2, 3, 4, 5])
    })

    it('returns pages with dots when total is large', () => {
        expect(getPaginationItems(20, 10, 1, 1)).toEqual([1, 'dots', 9, 10, 11, 'dots', 20])
    })

    it('shows dots only on the right near the start', () => {
        // 与组件实际渲染算法（usePagination）对齐：左溢出 item 数为 siblings*2+boundaries+2
        expect(getPaginationItems(20, 2, 1, 1)).toEqual([1, 2, 3, 4, 5, 'dots', 20])
    })

    it('shows dots only on the left near the end', () => {
        // 与组件实际渲染算法对齐：右溢出 item 数为 boundaries+1+2*siblings
        expect(getPaginationItems(20, 19, 1, 1)).toEqual([1, 'dots', 16, 17, 18, 19, 20])
    })

    it('produces the same range the component renders for the same input', () => {
        // 单一事实源约束：导出工具的输出必须与 Pagination 渲染出的页码一致（B05-16 分叉回归防护）
        const cases = [
            { total: 20, value: 2 },
            { total: 20, value: 10 },
            { total: 20, value: 19 },
            { total: 7, value: 4 }
        ] as const

        for (const { total, value } of cases) {
            const { unmount } = renderPagination({ total, value })

            const expected = getPaginationItems(total, value, 1, 1)
            // 渲染端页码经 role=button 的控件呈现（dots 为 div、edges 为图标按钮，均不在页码序列内）
            const renderedPages = screen
                .getAllByRole('button')
                .map(button => Number(button.textContent))
                .filter(page => Number.isInteger(page) && page > 0)

            expect(renderedPages).toEqual(expected.filter(item => item !== 'dots'))
            // 省略号数量同样一致（渲染端以 aria-label='...' 的 dots 呈现）
            expect(screen.queryAllByLabelText('...').length).toBe(expected.filter(item => item === 'dots').length)
            unmount()
        }
    })
})
