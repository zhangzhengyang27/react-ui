import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { MantineProvider } from '../../core'
import { getPaginationItems, Pagination } from './Pagination'

const renderPagination = (props: React.ComponentProps<typeof Pagination>) =>
    render(
        <MantineProvider>
            <Pagination {...props} />
        </MantineProvider>
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
            <MantineProvider>
                <Pagination total={5} value={4} />
            </MantineProvider>
        )

        expect(screen.getByLabelText('Page 4')).toHaveAttribute('aria-current', 'page')
    })

    it('renders dots for large page counts', () => {
        renderPagination({ total: 20, value: 10 })

        expect(screen.getAllByText('...').length).toBeGreaterThan(0)
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
        expect(getPaginationItems(20, 2, 1, 1)).toEqual([1, 2, 3, 4, 5, 6, 'dots', 20])
    })

    it('shows dots only on the left near the end', () => {
        expect(getPaginationItems(20, 19, 1, 1)).toEqual([1, 'dots', 15, 16, 17, 18, 19, 20])
    })
})
