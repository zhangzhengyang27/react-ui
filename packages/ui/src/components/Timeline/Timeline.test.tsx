import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MantineProvider } from '../../core'
import { Timeline } from './Timeline'

describe('Timeline', () => {
    it('renders timeline items with title and content', () => {
        render(
            <MantineProvider>
                <Timeline>
                    <Timeline.Item title="First">First content</Timeline.Item>
                    <Timeline.Item title="Second">Second content</Timeline.Item>
                </Timeline>
            </MantineProvider>
        )

        expect(screen.getByText('First')).toBeInTheDocument()
        expect(screen.getByText('First content')).toBeInTheDocument()
        expect(screen.getByText('Second')).toBeInTheDocument()
        expect(screen.getByText('Second content')).toBeInTheDocument()
    })

    it('marks items up to active index as active by default', () => {
        const { container } = render(
            <MantineProvider>
                <Timeline active={1}>
                    <Timeline.Item title="First">First content</Timeline.Item>
                    <Timeline.Item title="Second">Second content</Timeline.Item>
                    <Timeline.Item title="Third">Third content</Timeline.Item>
                </Timeline>
            </MantineProvider>
        )

        const items = container.querySelectorAll('[data-active]')
        expect(items.length).toBe(2)
    })

    it('marks items after active index as active when reverseActive is true', () => {
        const { container } = render(
            <MantineProvider>
                <Timeline active={1} reverseActive>
                    <Timeline.Item title="First">First content</Timeline.Item>
                    <Timeline.Item title="Second">Second content</Timeline.Item>
                    <Timeline.Item title="Third">Third content</Timeline.Item>
                </Timeline>
            </MantineProvider>
        )

        const items = container.querySelectorAll('[data-active]')
        expect(items.length).toBe(2)
    })

    it('sets data-align attribute on root element', () => {
        const { container } = render(
            <MantineProvider>
                <Timeline align="right">
                    <Timeline.Item title="First">First content</Timeline.Item>
                </Timeline>
            </MantineProvider>
        )

        expect(container.querySelector('[data-align="right"]')).toBeInTheDocument()
    })

    it('allows item active prop to override computed active state', () => {
        const { container } = render(
            <MantineProvider>
                <Timeline active={0}>
                    <Timeline.Item title="First">First content</Timeline.Item>
                    <Timeline.Item title="Second" active>
                        Second content
                    </Timeline.Item>
                </Timeline>
            </MantineProvider>
        )

        const items = container.querySelectorAll('[data-active]')
        expect(items.length).toBe(2)
    })
})
