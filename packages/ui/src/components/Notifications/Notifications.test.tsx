import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { UIProvider } from '../../core'
import { Notifications } from './Notifications'
import { notifications } from './notifications.store'

function Wrapper({ children }: { children: React.ReactNode }) {
    return (
        <UIProvider>
            <Notifications />
            {children}
        </UIProvider>
    )
}

afterEach(() => {
    notifications.clean()
    vi.useRealTimers()
})

describe('@xiaoye-react/ui/Notifications', () => {
    it('shows notification via notifications.show', () => {
        render(<div />, { wrapper: Wrapper })
        act(() => {
            notifications.show({ message: 'Hello' })
        })
        expect(screen.getByText('Hello')).toBeInTheDocument()
    })

    it('hides notification via close button', () => {
        render(<div />, { wrapper: Wrapper })
        act(() => {
            notifications.show({ message: 'Close me' })
        })
        fireEvent.click(screen.getByRole('button', { name: /关闭通知/i }))
        expect(screen.queryByText('Close me')).not.toBeInTheDocument()
    })

    it('hides notification via notifications.hide', async () => {
        render(<div />, { wrapper: Wrapper })
        let id: string
        act(() => {
            id = notifications.show({ message: 'Hide me' })
        })
        act(() => {
            notifications.hide(id)
        })
        await waitFor(() => {
            expect(screen.queryByText('Hide me')).not.toBeInTheDocument()
        })
    })

    it('cleans all notifications', async () => {
        render(<div />, { wrapper: Wrapper })
        act(() => {
            notifications.show({ message: 'One' })
            notifications.show({ message: 'Two' })
        })
        act(() => {
            notifications.clean()
        })
        await waitFor(() => {
            expect(screen.queryByText('One')).not.toBeInTheDocument()
            expect(screen.queryByText('Two')).not.toBeInTheDocument()
        })
    })
})
