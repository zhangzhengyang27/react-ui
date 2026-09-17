import { fireEvent, render, screen } from '@testing-library/react'
import { beforeAll, describe, expect, it } from 'vitest'
import { UIProvider } from '../../core'
import { Splitter } from './Splitter'

const renderWithProvider = (ui: React.ReactNode) => render(<UIProvider>{ui}</UIProvider>)

// jsdom 未实现 PointerEvent：fireEvent.pointerDown 会回退到 window.Event,
// eventInit 里的 clientX/pointerId 等属性会被丢弃,这里补一个最小 polyfill
// 让拖拽测试的事件携带真实坐标
beforeAll(() => {
    if (typeof window !== 'undefined' && !(window as any).PointerEvent) {
        class PointerEventPolyfill extends Event {
            pointerId: number
            clientX: number
            clientY: number
            isPrimary: boolean
            button: number
            constructor(type: string, init: Record<string, any> = {}) {
                super(type, init)
                this.pointerId = init.pointerId ?? 1
                this.clientX = init.clientX ?? 0
                this.clientY = init.clientY ?? 0
                this.isPrimary = init.isPrimary ?? true
                this.button = init.button ?? 0
            }
        }
        ;(window as any).PointerEvent = PointerEventPolyfill
    }
})

describe('Splitter', () => {
    it('renders panels and resizer', () => {
        renderWithProvider(
            <Splitter data-testid="splitter" style={{ width: 400, height: 200 }}>
                <Splitter.Panel data-testid="panel-1">Panel 1</Splitter.Panel>
                <Splitter.Panel data-testid="panel-2">Panel 2</Splitter.Panel>
            </Splitter>
        )

        expect(screen.getByTestId('splitter')).toBeInTheDocument()
        expect(screen.getByTestId('panel-1')).toHaveTextContent('Panel 1')
        expect(screen.getByTestId('panel-2')).toHaveTextContent('Panel 2')
        expect(screen.getAllByRole('separator')).toHaveLength(1)
    })

    it('supports vertical orientation', () => {
        renderWithProvider(
            <Splitter orientation="vertical" data-testid="splitter">
                <Splitter.Panel>Panel 1</Splitter.Panel>
                <Splitter.Panel>Panel 2</Splitter.Panel>
            </Splitter>
        )

        expect(screen.getByTestId('splitter')).toHaveAttribute('data-orientation', 'vertical')
    })

    it('updates panel sizes on resizer drag', () => {
        renderWithProvider(
            <Splitter data-testid="splitter" style={{ width: 400, height: 200 }}>
                <Splitter.Panel data-testid="panel-1">Panel 1</Splitter.Panel>
                <Splitter.Panel data-testid="panel-2">Panel 2</Splitter.Panel>
            </Splitter>
        )

        const resizer = screen.getAllByRole('separator')[0]
        fireEvent.pointerDown(resizer, { pointerId: 1, clientX: 200, clientY: 100 })
        fireEvent.pointerMove(document, { pointerId: 1, clientX: 300, clientY: 100 })
        fireEvent.pointerUp(document, { pointerId: 1 })

        const panel1 = screen.getByTestId('panel-1')
        const panel2 = screen.getByTestId('panel-2')
        expect(panel1.style.flexBasis).toContain('%')
        expect(panel2.style.flexBasis).toContain('%')
    })

    it('ignores pointer events from other pointers during drag', () => {
        renderWithProvider(
            <Splitter data-testid="splitter" style={{ width: 400, height: 200 }}>
                <Splitter.Panel data-testid="panel-1">Panel 1</Splitter.Panel>
                <Splitter.Panel data-testid="panel-2">Panel 2</Splitter.Panel>
            </Splitter>
        )

        const resizer = screen.getAllByRole('separator')[0]
        fireEvent.pointerDown(resizer, { pointerId: 1, clientX: 200, clientY: 100 })
        // 另一根手指/其他指针的 move 不应改写 sizes
        fireEvent.pointerMove(document, { pointerId: 2, clientX: 350, clientY: 100 })
        fireEvent.pointerUp(document, { pointerId: 1 })

        expect(screen.getByTestId('panel-1').style.flexBasis).toContain('50')
    })

    it('stops dragging on pointercancel and removes listeners', () => {
        renderWithProvider(
            <Splitter data-testid="splitter" style={{ width: 400, height: 200 }}>
                <Splitter.Panel data-testid="panel-1">Panel 1</Splitter.Panel>
                <Splitter.Panel data-testid="panel-2">Panel 2</Splitter.Panel>
            </Splitter>
        )

        const resizer = screen.getAllByRole('separator')[0]
        fireEvent.pointerDown(resizer, { pointerId: 1, clientX: 200, clientY: 100 })
        // 触摸被系统手势打断:拖拽终止,后续指针移动不再改写 sizes
        fireEvent.pointerCancel(document, { pointerId: 1 })
        fireEvent.pointerMove(document, { pointerId: 1, clientX: 350, clientY: 100 })

        expect(screen.getByTestId('panel-1').style.flexBasis).toContain('50')
    })
})
