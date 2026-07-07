import { createRef } from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { MantineProvider } from '../../core'
import { ScrollArea } from './ScrollArea'

const renderWithProvider = (ui: React.ReactNode) => render(<MantineProvider>{ui}</MantineProvider>)

const getViewport = () => screen.getByTestId('scrollarea').querySelector('[data-scrollarea-viewport]') as HTMLDivElement

describe('ScrollArea', () => {
    it('renders root with static class and viewport', () => {
        renderWithProvider(
            <ScrollArea data-testid="scrollarea" style={{ height: 200 }}>
                <div style={{ height: 500 }}>content</div>
            </ScrollArea>
        )

        const root = screen.getByTestId('scrollarea')
        expect(root).toHaveClass('mantine-ScrollArea-root')

        const viewport = getViewport()
        expect(viewport).toBeInTheDocument()
        expect(viewport).toHaveClass('mantine-ScrollArea-viewport')
    })

    it('does not render custom scrollbars when type is "never"', () => {
        renderWithProvider(
            <ScrollArea data-testid="scrollarea" type="never">
                content
            </ScrollArea>
        )

        expect(screen.queryByTestId('scrollarea')?.querySelector('[data-react-ui-scrollbar]')).not.toBeInTheDocument()
    })

    it('renders only horizontal scrollbar when scrollbars="x"', async () => {
        renderWithProvider(
            <ScrollArea data-testid="scrollarea" scrollbars="x">
                content
            </ScrollArea>
        )

        await waitFor(() => {
            const scrollbars = screen.getByTestId('scrollarea').querySelectorAll('[data-react-ui-scrollbar]')
            expect(scrollbars.length).toBe(1)
            expect(scrollbars[0]).toHaveAttribute('data-orientation', 'horizontal')
        })
    })

    it('renders only vertical scrollbar when scrollbars="y"', async () => {
        renderWithProvider(
            <ScrollArea data-testid="scrollarea" scrollbars="y">
                content
            </ScrollArea>
        )

        await waitFor(() => {
            const scrollbars = screen.getByTestId('scrollarea').querySelectorAll('[data-react-ui-scrollbar]')
            expect(scrollbars.length).toBe(1)
            expect(scrollbars[0]).toHaveAttribute('data-orientation', 'vertical')
        })
    })

    it('renders both scrollbars by default', async () => {
        renderWithProvider(<ScrollArea data-testid="scrollarea">content</ScrollArea>)

        await waitFor(() => {
            const scrollbars = screen.getByTestId('scrollarea').querySelectorAll('[data-react-ui-scrollbar]')
            expect(scrollbars.length).toBe(2)
        })
    })

    it('forwards viewportRef to the viewport element', () => {
        const ref = createRef<HTMLDivElement>()
        renderWithProvider(
            <ScrollArea data-testid="scrollarea" viewportRef={ref}>
                content
            </ScrollArea>
        )

        expect(ref.current).toBe(getViewport())
    })

    it('calls onScrollPositionChange when viewport is scrolled', () => {
        const onScrollPositionChange = vi.fn()
        renderWithProvider(
            <ScrollArea data-testid="scrollarea" onScrollPositionChange={onScrollPositionChange}>
                <div style={{ height: 500 }}>content</div>
            </ScrollArea>
        )

        const viewport = getViewport()
        viewport.scrollTop = 100
        fireEvent.scroll(viewport)

        expect(onScrollPositionChange).toHaveBeenCalledWith({ x: 0, y: 100 })
    })

    it('calls onBottomReached when scrolled to bottom', () => {
        const onBottomReached = vi.fn()
        renderWithProvider(
            <ScrollArea data-testid="scrollarea" onBottomReached={onBottomReached}>
                <div style={{ height: 500 }}>content</div>
            </ScrollArea>
        )

        const viewport = getViewport()
        viewport.scrollTop = viewport.scrollHeight - viewport.clientHeight
        fireEvent.scroll(viewport)

        expect(onBottomReached).toHaveBeenCalled()
    })

    it('calls onTopReached when scrolled to top', () => {
        const onTopReached = vi.fn()
        renderWithProvider(
            <ScrollArea data-testid="scrollarea" onTopReached={onTopReached}>
                <div style={{ height: 500 }}>content</div>
            </ScrollArea>
        )

        const viewport = getViewport()
        viewport.scrollTop = 100
        fireEvent.scroll(viewport)
        viewport.scrollTop = 0
        fireEvent.scroll(viewport)

        expect(onTopReached).toHaveBeenCalled()
    })

    it('calls onRightReached when scrolled to right', () => {
        const onRightReached = vi.fn()
        renderWithProvider(
            <ScrollArea data-testid="scrollarea" onRightReached={onRightReached}>
                <div style={{ width: 500 }}>content</div>
            </ScrollArea>
        )

        const viewport = getViewport()
        viewport.scrollLeft = viewport.scrollWidth - viewport.clientWidth
        fireEvent.scroll(viewport)

        expect(onRightReached).toHaveBeenCalled()
    })

    it('calls onLeftReached when scrolled to left', () => {
        const onLeftReached = vi.fn()
        renderWithProvider(
            <ScrollArea data-testid="scrollarea" onLeftReached={onLeftReached}>
                <div style={{ width: 500 }}>content</div>
            </ScrollArea>
        )

        const viewport = getViewport()
        viewport.scrollLeft = 100
        fireEvent.scroll(viewport)
        viewport.scrollLeft = 0
        fireEvent.scroll(viewport)

        expect(onLeftReached).toHaveBeenCalled()
    })

    it('sets initial scroll position via startScrollPosition', () => {
        renderWithProvider(
            <ScrollArea data-testid="scrollarea" startScrollPosition={{ x: 50, y: 80 }}>
                <div style={{ width: 500, height: 500 }}>content</div>
            </ScrollArea>
        )

        const viewport = getViewport()
        expect(viewport.scrollLeft).toBe(50)
        expect(viewport.scrollTop).toBe(80)
    })

    it('forwards viewportProps to the viewport element', () => {
        renderWithProvider(
            <ScrollArea data-testid="scrollarea" viewportProps={{ 'aria-label': 'scrollable region' } as any}>
                content
            </ScrollArea>
        )

        expect(getViewport()).toHaveAttribute('aria-label', 'scrollable region')
    })

    it('forwards additional props to the root element', () => {
        renderWithProvider(
            <ScrollArea data-testid="scrollarea" id="my-scroll-area">
                content
            </ScrollArea>
        )

        expect(screen.getByTestId('scrollarea')).toHaveAttribute('id', 'my-scroll-area')
    })
})
