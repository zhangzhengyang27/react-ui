import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { getDefaultZIndex, UIProvider } from '../../core'
import { Drawer } from '../Drawer'
import { Modal } from './Modal'
import { useModalsStack } from './use-modals-stack'

// 从文本节点向上找到挂 --mb-z-index 变量的 ModalBase 根节点（Modal/Drawer 共用）
function findOverlayRoot(text: string): HTMLElement {
    let node: HTMLElement | null = screen.getByText(text).parentElement
    while (node && !node.style.getPropertyValue('--mb-z-index')) {
        node = node.parentElement
    }
    expect(node, `未找到包含 ${text} 的弹层根节点`).not.toBeNull()
    return node as HTMLElement
}

function ModalStackDemo() {
    const stack = useModalsStack(['modal-a', 'modal-b'])

    return (
        <UIProvider>
            <Modal.Stack>
                <Modal {...stack.register('modal-a')} title="Modal A title">
                    Modal A content
                </Modal>
                <Modal {...stack.register('modal-b')} title="Modal B title">
                    Modal B content
                </Modal>
            </Modal.Stack>
            <button type="button" onClick={() => stack.open('modal-b')}>
                open-modal-b
            </button>
            <button type="button" onClick={() => stack.open('modal-a')}>
                open-modal-a
            </button>
        </UIProvider>
    )
}

function DrawerStackDemo() {
    const stack = useModalsStack(['drawer-a', 'drawer-b'])

    return (
        <UIProvider>
            <Drawer.Stack>
                <Drawer {...stack.register('drawer-a')} title="Drawer A title">
                    Drawer A content
                </Drawer>
                <Drawer {...stack.register('drawer-b')} title="Drawer B title">
                    Drawer B content
                </Drawer>
            </Drawer.Stack>
            <button type="button" onClick={() => stack.open('drawer-b')}>
                open-drawer-b
            </button>
            <button type="button" onClick={() => stack.open('drawer-a')}>
                open-drawer-a
            </button>
        </UIProvider>
    )
}

describe('Modal.Stack / Drawer.Stack', () => {
    it('Modal.Stack 渲染不触发无限 effect 循环，zIndex 按打开顺序分配', async () => {
        // 修复前：context value 每次渲染都是新对象 + addModal 永远返回新数组，
        // Modal effect 反复 cleanup/setup，React 19 抛 "Maximum update depth exceeded"
        const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})

        render(<ModalStackDemo />)

        // 乱序打开：先打开 JSX 中靠后的 modal-b，再打开 modal-a
        fireEvent.click(screen.getByText('open-modal-b'))
        fireEvent.click(screen.getByText('open-modal-a'))

        // 内容经 Transition 双重 rAF 后挂载，需等待异步帧
        expect(await screen.findByText('Modal A title')).toBeInTheDocument()
        expect(await screen.findByText('Modal B title')).toBeInTheDocument()

        const base = getDefaultZIndex('modal')
        // stack 顺序 = 打开顺序：后打开的 modal-a 层级更高（挂载顺序分配会导致层叠颠倒）
        expect(findOverlayRoot('Modal A title').style.getPropertyValue('--mb-z-index')).toBe(
            `calc(${base} + 1 + 1)`
        )
        expect(findOverlayRoot('Modal B title').style.getPropertyValue('--mb-z-index')).toBe(
            `calc(${base} + 0 + 1)`
        )

        // useModalsStack register 展开的 stackId 不应泄漏到 DOM
        expect(document.querySelector('[stackid]')).toBeNull()

        const depthErrors = consoleError.mock.calls.filter((call) =>
            String(call[0]).includes('Maximum update depth')
        )
        expect(depthErrors).toHaveLength(0)
        consoleError.mockRestore()
    })

    it('Drawer.Stack 渲染不触发无限 effect 循环，zIndex 按打开顺序分配', async () => {
        const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})

        render(<DrawerStackDemo />)

        // 乱序打开：先打开 JSX 中靠后的 drawer-b，再打开 drawer-a
        fireEvent.click(screen.getByText('open-drawer-b'))
        fireEvent.click(screen.getByText('open-drawer-a'))

        // 内容经 Transition 双重 rAF 后挂载，需等待异步帧
        expect(await screen.findByText('Drawer A title')).toBeInTheDocument()
        expect(await screen.findByText('Drawer B title')).toBeInTheDocument()

        const base = getDefaultZIndex('modal')
        expect(findOverlayRoot('Drawer A title').style.getPropertyValue('--mb-z-index')).toBe(
            `calc(${base} + 1 + 1)`
        )
        expect(findOverlayRoot('Drawer B title').style.getPropertyValue('--mb-z-index')).toBe(
            `calc(${base} + 0 + 1)`
        )

        const depthErrors = consoleError.mock.calls.filter((call) =>
            String(call[0]).includes('Maximum update depth')
        )
        expect(depthErrors).toHaveLength(0)
        consoleError.mockRestore()
    })
})
