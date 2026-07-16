import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { UIProvider } from '../../core'
import { Modal } from './Modal'

describe('Modal', () => {
    it('renders when opened is true', () => {
        render(
            <UIProvider>
                <Modal opened onClose={vi.fn()} title="Modal title">
                    Modal content
                </Modal>
            </UIProvider>
        )

        expect(screen.getByText('Modal title')).toBeInTheDocument()
        expect(screen.getByText('Modal content')).toBeInTheDocument()
    })

    it('does not render content when opened is false', () => {
        render(
            <UIProvider>
                <Modal opened={false} onClose={vi.fn()} title="Modal title">
                    Modal content
                </Modal>
            </UIProvider>
        )

        expect(screen.queryByText('Modal title')).not.toBeInTheDocument()
        expect(screen.queryByText('Modal content')).not.toBeInTheDocument()
    })

    it('calls onClose when close button is clicked', () => {
        const onClose = vi.fn()
        render(
            <UIProvider>
                <Modal opened onClose={onClose} title="Modal title">
                    Modal content
                </Modal>
            </UIProvider>
        )

        screen.getAllByRole('button')[0].click()
        expect(onClose).toHaveBeenCalled()
    })
})
