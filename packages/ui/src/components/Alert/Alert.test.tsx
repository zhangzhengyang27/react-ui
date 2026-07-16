import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { UIProvider } from '../../core'
import { Alert } from './Alert'

describe('Alert', () => {
    it('renders with children', () => {
        render(
            <UIProvider>
                <Alert>Alert message</Alert>
            </UIProvider>
        )

        expect(screen.getByText('Alert message')).toBeInTheDocument()
    })

    it('renders title and icon', () => {
        render(
            <UIProvider>
                <Alert title="Alert title" icon="icon">
                    Alert message
                </Alert>
            </UIProvider>
        )

        expect(screen.getByText('Alert title')).toBeInTheDocument()
        expect(screen.getByText('icon')).toBeInTheDocument()
    })

    it('calls onClose when close button is clicked', () => {
        const onClose = vi.fn()
        render(
            <UIProvider>
                <Alert withCloseButton onClose={onClose}>
                    Alert message
                </Alert>
            </UIProvider>
        )

        screen.getByRole('button').click()
        expect(onClose).toHaveBeenCalled()
    })
})
