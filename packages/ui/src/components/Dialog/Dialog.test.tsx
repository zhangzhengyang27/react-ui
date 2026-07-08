import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { MantineProvider } from '../../core'
import { Dialog } from './Dialog'

function Wrapper({ children }: { children: React.ReactNode }) {
    return <MantineProvider>{children}</MantineProvider>
}

describe('@react-ui/ui/Dialog', () => {
    it('renders when opened', () => {
        render(
            <Dialog opened title="Confirm" onClose={vi.fn()}>
                Content
            </Dialog>,
            { wrapper: Wrapper }
        )
        expect(screen.getByText('Confirm')).toBeInTheDocument()
        expect(screen.getByText('Content')).toBeInTheDocument()
    })

    it('does not render content when closed', () => {
        render(
            <Dialog opened={false} title="Confirm" onClose={vi.fn()}>
                Content
            </Dialog>,
            { wrapper: Wrapper }
        )
        expect(screen.queryByText('Content')).not.toBeInTheDocument()
    })

    it('calls onClose when close button is clicked', () => {
        const onClose = vi.fn()
        render(
            <Dialog opened title="Confirm" onClose={onClose}>
                Content
            </Dialog>,
            { wrapper: Wrapper }
        )
        fireEvent.click(screen.getByRole('button', { name: /关闭对话框/i }))
        expect(onClose).toHaveBeenCalled()
    })

    it('does not render overlay when withOverlay is false', () => {
        render(
            <Dialog opened title="Confirm" onClose={vi.fn()} withOverlay={false}>
                Content
            </Dialog>,
            { wrapper: Wrapper }
        )
        expect(document.querySelector('.mantine-Dialog-overlay')).not.toBeInTheDocument()
    })
})
