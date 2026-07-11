import { createRef } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import { MantineProvider } from '../../core'
import { Carousel } from './Carousel'

const renderWithProvider = (ui: React.ReactNode) => render(<MantineProvider>{ui}</MantineProvider>)

beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation((query: string) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: vi.fn(),
            removeListener: vi.fn(),
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn()
        }))
    })

    Object.defineProperty(window, 'IntersectionObserver', {
        writable: true,
        value: vi.fn().mockImplementation(() => ({
            observe: vi.fn(),
            unobserve: vi.fn(),
            disconnect: vi.fn(),
            takeRecords: vi.fn()
        }))
    })
})

describe('Carousel', () => {
    it('renders root with static class and slides', () => {
        renderWithProvider(
            <Carousel data-testid="carousel">
                <Carousel.Slide>1</Carousel.Slide>
                <Carousel.Slide>2</Carousel.Slide>
            </Carousel>
        )

        const root = screen.getByTestId('carousel')
        expect(root).toHaveClass('mantine-Carousel-root')
        expect(screen.getByText('1')).toBeInTheDocument()
        expect(screen.getByText('2')).toBeInTheDocument()
    })

    it('renders previous and next controls by default', () => {
        renderWithProvider(
            <Carousel data-testid="carousel">
                <Carousel.Slide>1</Carousel.Slide>
                <Carousel.Slide>2</Carousel.Slide>
            </Carousel>
        )

        expect(screen.getByLabelText('Previous slide')).toBeInTheDocument()
        expect(screen.getByLabelText('Next slide')).toBeInTheDocument()
    })

    it('does not render controls when withControls is false', () => {
        renderWithProvider(
            <Carousel data-testid="carousel" withControls={false}>
                <Carousel.Slide>1</Carousel.Slide>
            </Carousel>
        )

        expect(screen.queryByLabelText('Previous slide')).not.toBeInTheDocument()
        expect(screen.queryByLabelText('Next slide')).not.toBeInTheDocument()
    })

    it('renders indicators container when withIndicators is true', () => {
        renderWithProvider(
            <Carousel data-testid="carousel" withIndicators>
                <Carousel.Slide>1</Carousel.Slide>
                <Carousel.Slide>2</Carousel.Slide>
            </Carousel>
        )

        expect(screen.getByRole('tablist', { name: 'Slides' })).toBeInTheDocument()
    })

    it('calls onPreviousSlide and onNextSlide when controls are clicked', () => {
        const onPreviousSlide = vi.fn()
        const onNextSlide = vi.fn()

        renderWithProvider(
            <Carousel
                data-testid="carousel"
                onPreviousSlide={onPreviousSlide}
                onNextSlide={onNextSlide}
            >
                <Carousel.Slide>1</Carousel.Slide>
                <Carousel.Slide>2</Carousel.Slide>
            </Carousel>
        )

        fireEvent.click(screen.getByLabelText('Previous slide'))
        expect(onPreviousSlide).toHaveBeenCalledTimes(1)

        fireEvent.click(screen.getByLabelText('Next slide'))
        expect(onNextSlide).toHaveBeenCalledTimes(1)
    })

    it('supports keyboard navigation and calls callbacks', () => {
        const onPreviousSlide = vi.fn()
        const onNextSlide = vi.fn()

        renderWithProvider(
            <Carousel
                data-testid="carousel"
                onPreviousSlide={onPreviousSlide}
                onNextSlide={onNextSlide}
            >
                <Carousel.Slide>1</Carousel.Slide>
                <Carousel.Slide>2</Carousel.Slide>
            </Carousel>
        )

        const root = screen.getByTestId('carousel')
        fireEvent.keyDown(root, { key: 'ArrowLeft' })
        expect(onPreviousSlide).toHaveBeenCalledTimes(1)

        fireEvent.keyDown(root, { key: 'ArrowRight' })
        expect(onNextSlide).toHaveBeenCalledTimes(1)
    })

    it('does not respond to keyboard events when withKeyboardEvents is false', () => {
        const onNextSlide = vi.fn()

        renderWithProvider(
            <Carousel
                data-testid="carousel"
                withKeyboardEvents={false}
                onNextSlide={onNextSlide}
            >
                <Carousel.Slide>1</Carousel.Slide>
                <Carousel.Slide>2</Carousel.Slide>
            </Carousel>
        )

        const root = screen.getByTestId('carousel')
        fireEvent.keyDown(root, { key: 'ArrowRight' })
        expect(onNextSlide).not.toHaveBeenCalled()
    })

    it('forwards ref to the root element', () => {
        const ref = createRef<HTMLDivElement>()
        renderWithProvider(
            <Carousel ref={ref}>
                <Carousel.Slide>1</Carousel.Slide>
            </Carousel>
        )

        expect(ref.current).toHaveClass('mantine-Carousel-root')
    })

    it('forwards id to the root element', () => {
        renderWithProvider(
            <Carousel id="my-carousel">
                <Carousel.Slide>1</Carousel.Slide>
            </Carousel>
        )

        expect(document.getElementById('my-carousel')).toHaveClass('mantine-Carousel-root')
    })
})
