import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { UIProvider } from '../../core'
import { Drawer } from './Drawer'

describe('Drawer', () => {
    it('renders when opened is true', () => {
        render(
            <UIProvider>
                <Drawer opened onClose={vi.fn()} title="Drawer title">
                    Drawer content
                </Drawer>
            </UIProvider>
        )

        expect(screen.getByText('Drawer title')).toBeInTheDocument()
        expect(screen.getByText('Drawer content')).toBeInTheDocument()
    })

    it('does not render content when opened is false', () => {
        render(
            <UIProvider>
                <Drawer opened={false} onClose={vi.fn()} title="Drawer title">
                    Drawer content
                </Drawer>
            </UIProvider>
        )

        expect(screen.queryByText('Drawer title')).not.toBeInTheDocument()
        expect(screen.queryByText('Drawer content')).not.toBeInTheDocument()
    })

    it('calls onClose when close button is clicked', () => {
        const onClose = vi.fn()
        render(
            <UIProvider>
                <Drawer opened onClose={onClose} title="Drawer title">
                    Drawer content
                </Drawer>
            </UIProvider>
        )

        screen.getAllByRole('button')[0].click()
        expect(onClose).toHaveBeenCalled()
    })

    it('renders with different positions', () => {
        const { rerender } = render(
            <UIProvider>
                <Drawer opened onClose={vi.fn()} position="right" title="Drawer title">
                    Drawer content
                </Drawer>
            </UIProvider>
        )

        expect(screen.getByText('Drawer title')).toBeInTheDocument()

        rerender(
            <UIProvider>
                <Drawer opened onClose={vi.fn()} position="bottom" title="Drawer title">
                    Drawer content
                </Drawer>
            </UIProvider>
        )

        expect(screen.getByText('Drawer title')).toBeInTheDocument()
    })
})
