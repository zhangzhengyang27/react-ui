import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Button } from '../Button'
import { UIProvider } from '../../core'
import { Tooltip } from './Tooltip'

describe('Tooltip', () => {
    it('renders tooltip with target element', () => {
        render(
            <UIProvider>
                <Tooltip label="tooltip content">
                    <Button>target</Button>
                </Tooltip>
            </UIProvider>
        )

        expect(screen.getByText('target')).toBeInTheDocument()
    })

    it('renders tooltip content when opened is true', () => {
        render(
            <UIProvider>
                <Tooltip label="tooltip content" opened>
                    <Button>target</Button>
                </Tooltip>
            </UIProvider>
        )

        expect(screen.getByText('tooltip content')).toBeInTheDocument()
    })

    it('does not render tooltip content when disabled', () => {
        render(
            <UIProvider>
                <Tooltip label="tooltip content" opened disabled>
                    <Button>target</Button>
                </Tooltip>
            </UIProvider>
        )

        expect(screen.queryByText('tooltip content')).not.toBeInTheDocument()
    })

    // 回归测试：floating-ui 的 setReference 必须并入子元素 ref 合并链。
    // 缺失时 useFloating 注册不到 reference，useHover 无法在触发元素上绑定原生 mouseenter
    // （mouseenter 不冒泡，必须派发到按钮本身），悬停永远打不开 tooltip，
    // 且 opened 常开时 x/y 恒为 0（浮层卡在文档左上角）
    it('opens on hover with reference registered via child ref chain', async () => {
        render(
            <UIProvider>
                <Tooltip label="hover content">
                    <Button>hover target</Button>
                </Tooltip>
            </UIProvider>
        )

        expect(screen.queryByText('hover content')).not.toBeInTheDocument()
        fireEvent.mouseEnter(screen.getByRole('button', { name: 'hover target' }))
        // 全量并发执行时机器负载高，进场过渡（双 rAF + 100ms）需要放宽等待
        await waitFor(() => expect(screen.getByText('hover content')).toBeInTheDocument(), { timeout: 5000 })
    })
})
