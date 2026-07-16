import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { UIProvider } from '../../core'
import { Notification } from './Notification'

describe('Notification', () => {
    it('renders title and message', () => {
        render(
            <UIProvider>
                <Notification title="成功" message="操作已完成" />
            </UIProvider>
        )

        expect(screen.getByText('成功')).toBeInTheDocument()
        expect(screen.getByText('操作已完成')).toBeInTheDocument()
    })

    it('renders icon', () => {
        render(
            <UIProvider>
                <Notification icon={<span data-testid="icon">!</span>} message="提示" />
            </UIProvider>
        )

        expect(screen.getByTestId('icon')).toBeInTheDocument()
    })

    it('renders loading state', () => {
        render(
            <UIProvider>
                <Notification loading message="加载中" />
            </UIProvider>
        )

        expect(screen.getByText('加载中')).toBeInTheDocument()
    })

    it('calls onClose when close button is clicked', () => {
        const onClose = vi.fn()
        render(
            <UIProvider>
                <Notification message="可关闭" onClose={onClose} />
            </UIProvider>
        )

        screen.getByRole('button').click()
        expect(onClose).toHaveBeenCalled()
    })

    it('does not render close button when withCloseButton is false', () => {
        render(
            <UIProvider>
                <Notification message="不可关闭" withCloseButton={false} />
            </UIProvider>
        )

        expect(screen.queryByRole('button')).not.toBeInTheDocument()
    })
})
