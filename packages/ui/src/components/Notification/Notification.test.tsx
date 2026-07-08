import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MantineProvider } from '../../core'
import { Notification } from './Notification'

describe('Notification', () => {
    it('renders title and message', () => {
        render(
            <MantineProvider>
                <Notification title="成功" message="操作已完成" />
            </MantineProvider>
        )

        expect(screen.getByText('成功')).toBeInTheDocument()
        expect(screen.getByText('操作已完成')).toBeInTheDocument()
    })

    it('renders icon', () => {
        render(
            <MantineProvider>
                <Notification icon={<span data-testid="icon">!</span>} message="提示" />
            </MantineProvider>
        )

        expect(screen.getByTestId('icon')).toBeInTheDocument()
    })

    it('renders loading state', () => {
        render(
            <MantineProvider>
                <Notification loading message="加载中" />
            </MantineProvider>
        )

        expect(screen.getByText('加载中')).toBeInTheDocument()
    })

    it('calls onClose when close button is clicked', () => {
        const onClose = vi.fn()
        render(
            <MantineProvider>
                <Notification message="可关闭" onClose={onClose} />
            </MantineProvider>
        )

        screen.getByRole('button').click()
        expect(onClose).toHaveBeenCalled()
    })

    it('does not render close button when withCloseButton is false', () => {
        render(
            <MantineProvider>
                <Notification message="不可关闭" withCloseButton={false} />
            </MantineProvider>
        )

        expect(screen.queryByRole('button')).not.toBeInTheDocument()
    })
})
