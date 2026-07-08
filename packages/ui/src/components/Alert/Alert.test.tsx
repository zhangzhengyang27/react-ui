import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { MantineProvider } from '../../core'
import { Alert } from './Alert'

describe('Alert', () => {
    it('renders with children', () => {
        render(
            <MantineProvider>
                <Alert>Alert message</Alert>
            </MantineProvider>
        )

        expect(screen.getByText('Alert message')).toBeInTheDocument()
    })

    it('renders title and icon', () => {
        render(
            <MantineProvider>
                <Alert title="Alert title" icon="icon">
                    Alert message
                </Alert>
            </MantineProvider>
        )

        expect(screen.getByText('Alert title')).toBeInTheDocument()
        expect(screen.getByText('icon')).toBeInTheDocument()
    })

    it('calls onClose when close button is clicked', () => {
        const onClose = vi.fn()
        render(
            <MantineProvider>
                <Alert withCloseButton onClose={onClose}>
                    Alert message
                </Alert>
            </MantineProvider>
        )

        screen.getByRole('button').click()
        expect(onClose).toHaveBeenCalled()
    })
})
