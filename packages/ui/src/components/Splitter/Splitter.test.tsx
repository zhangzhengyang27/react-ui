import { fireEvent, render, screen } from '@testing-library/react'
import { beforeAll, describe, expect, it, vi } from 'vitest'
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

// jsdom 不做布局，getBoundingClientRect 恒为 0 宽。useSplitter 把像素位移换算成
// 百分比增量（容器宽为 0 时直接跳过本次 resize），拖拽用例必须先给出容器宽度
const mockContainerWidth = (width: number) => {
    screen.getByTestId('splitter').getBoundingClientRect = () =>
        ({
            left: 0,
            top: 0,
            right: width,
            bottom: 200,
            width,
            height: 200,
            x: 0,
            y: 0,
            toJSON: () => ({})
        }) as DOMRect
}

// 拖拽：按下 → 移动到 targetX → 在同一位置抬起（抬起会同步结算一次 resize）
const dragResizer = (resizer: HTMLElement, fromX: number, toX: number) => {
    fireEvent.pointerDown(resizer, { pointerId: 1, clientX: fromX, clientY: 100 })
    fireEvent.pointerMove(document, { pointerId: 1, clientX: toX, clientY: 100 })
    fireEvent.pointerUp(document, { pointerId: 1, clientX: toX, clientY: 100 })
}

const flexBasis = (testId: string) => screen.getByTestId(testId).style.flexBasis

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

        mockContainerWidth(400)
        // 容器 400px 内向右拖 100px = +25%
        dragResizer(screen.getAllByRole('separator')[0], 200, 300)

        expect(flexBasis('panel-1')).toBe('75%')
        expect(flexBasis('panel-2')).toBe('25%')
    })

    it('ignores pointer events from other pointers during drag', () => {
        renderWithProvider(
            <Splitter data-testid="splitter" style={{ width: 400, height: 200 }}>
                <Splitter.Panel data-testid="panel-1">Panel 1</Splitter.Panel>
                <Splitter.Panel data-testid="panel-2">Panel 2</Splitter.Panel>
            </Splitter>
        )

        mockContainerWidth(400)
        const resizer = screen.getAllByRole('separator')[0]
        fireEvent.pointerDown(resizer, { pointerId: 1, clientX: 200, clientY: 100 })
        // 另一根手指/其他指针的 move 不应改写 sizes
        fireEvent.pointerMove(document, { pointerId: 2, clientX: 350, clientY: 100 })
        fireEvent.pointerUp(document, { pointerId: 1, clientX: 200, clientY: 100 })

        expect(flexBasis('panel-1')).toBe('50%')
    })

    it('stops dragging on pointercancel and removes listeners', () => {
        renderWithProvider(
            <Splitter data-testid="splitter" style={{ width: 400, height: 200 }}>
                <Splitter.Panel data-testid="panel-1">Panel 1</Splitter.Panel>
                <Splitter.Panel data-testid="panel-2">Panel 2</Splitter.Panel>
            </Splitter>
        )

        mockContainerWidth(400)
        const resizer = screen.getAllByRole('separator')[0]
        fireEvent.pointerDown(resizer, { pointerId: 1, clientX: 200, clientY: 100 })
        // 触摸被系统手势打断:在同一位置结束拖拽,sizes 保持 50%
        fireEvent.pointerCancel(document, { pointerId: 1, clientX: 200, clientY: 100 })
        fireEvent.pointerMove(document, { pointerId: 1, clientX: 350, clientY: 100 })

        expect(flexBasis('panel-1')).toBe('50%')
    })

    it('never drags a panel below its own min', () => {
        renderWithProvider(
            <Splitter data-testid="splitter" style={{ width: 400, height: 200 }}>
                <Splitter.Panel data-testid="panel-1" min={20}>
                    Panel 1
                </Splitter.Panel>
                <Splitter.Panel data-testid="panel-2">Panel 2</Splitter.Panel>
            </Splitter>
        )

        mockContainerWidth(400)
        // 向左拖 200px = -50%，panel-1 只能退到自己的 min(20%)
        dragResizer(screen.getAllByRole('separator')[0], 200, 0)

        expect(flexBasis('panel-1')).toBe('20%')
        expect(flexBasis('panel-2')).toBe('80%')
    })

    it('keeps the neighbouring panel below its max while dragging', () => {
        renderWithProvider(
            <Splitter data-testid="splitter" style={{ width: 400, height: 200 }}>
                <Splitter.Panel data-testid="panel-1" max={20}>
                    Panel 1
                </Splitter.Panel>
                <Splitter.Panel data-testid="panel-2">Panel 2</Splitter.Panel>
            </Splitter>
        )

        mockContainerWidth(400)
        // 向右拖 200px = +50%，panel-1 只能长到自己的 max(20%)
        dragResizer(screen.getAllByRole('separator')[0], 200, 400)

        expect(flexBasis('panel-1')).toBe('20%')
        expect(flexBasis('panel-2')).toBe('80%')
    })

    it('redistributes space from non-adjacent panels without breaking min/max', () => {
        renderWithProvider(
            <Splitter data-testid="splitter" redistribute="nearest" style={{ width: 400, height: 200 }}>
                <Splitter.Panel data-testid="panel-1" size={40} max={60}>
                    A
                </Splitter.Panel>
                <Splitter.Panel data-testid="panel-2" size={20} min={20}>
                    B
                </Splitter.Panel>
                <Splitter.Panel data-testid="panel-3" size={40}>
                    C
                </Splitter.Panel>
            </Splitter>
        )

        mockContainerWidth(400)
        // 向右拖 250px = +62.5%：A 到 max(60%) 为止，相邻的 B 已经顶在 min(20%) 无空间可让，
        // 缺口由 redistribute 向更远的 C 借用
        dragResizer(screen.getAllByRole('separator')[0], 100, 350)

        expect(flexBasis('panel-1')).toBe('60%')
        expect(flexBasis('panel-2')).toBe('20%')
        expect(flexBasis('panel-3')).toBe('20%')
    })

    it('leaves the layout untouched without redistribute', () => {
        renderWithProvider(
            <Splitter data-testid="splitter" style={{ width: 400, height: 200 }}>
                <Splitter.Panel data-testid="panel-1" size={40} max={60}>
                    A
                </Splitter.Panel>
                <Splitter.Panel data-testid="panel-2" size={20} min={20}>
                    B
                </Splitter.Panel>
                <Splitter.Panel data-testid="panel-3" size={40}>
                    C
                </Splitter.Panel>
            </Splitter>
        )

        mockContainerWidth(400)
        // 同样的拖拽：只影响相邻两面板时 A 被 B 的 min 卡住，一步都动不了
        dragResizer(screen.getAllByRole('separator')[0], 100, 350)

        expect(flexBasis('panel-1')).toBe('40%')
        expect(flexBasis('panel-2')).toBe('20%')
        expect(flexBasis('panel-3')).toBe('40%')
    })

    it('reports sizes through onSizesChange', () => {
        const onSizesChange = vi.fn()
        renderWithProvider(
            <Splitter
                data-testid="splitter"
                onSizesChange={onSizesChange}
                style={{ width: 400, height: 200 }}
            >
                <Splitter.Panel data-testid="panel-1">Panel 1</Splitter.Panel>
                <Splitter.Panel data-testid="panel-2">Panel 2</Splitter.Panel>
            </Splitter>
        )

        mockContainerWidth(400)
        dragResizer(screen.getAllByRole('separator')[0], 200, 300)

        expect(onSizesChange).toHaveBeenCalledWith([75, 25])
    })

    it('renders controlled sizes and keeps them untouched', () => {
        renderWithProvider(
            <Splitter data-testid="splitter" sizes={[30, 70]} style={{ width: 400, height: 200 }}>
                <Splitter.Panel data-testid="panel-1">Panel 1</Splitter.Panel>
                <Splitter.Panel data-testid="panel-2">Panel 2</Splitter.Panel>
            </Splitter>
        )

        mockContainerWidth(400)
        dragResizer(screen.getAllByRole('separator')[0], 200, 400)

        // 受控：外部 sizes 不改，组件不自行回写
        expect(flexBasis('panel-1')).toBe('30%')
        expect(flexBasis('panel-2')).toBe('70%')
    })

    it('writes lineSize into the --splitter-line-size variable on the root', () => {
        renderWithProvider(
            <Splitter data-testid="splitter" lineSize={2}>
                <Splitter.Panel>Panel 1</Splitter.Panel>
                <Splitter.Panel>Panel 2</Splitter.Panel>
            </Splitter>
        )

        // rem(2) → 0.125rem（再乘主题 --ui-scale）
        expect(screen.getByTestId('splitter').style.getPropertyValue('--splitter-line-size')).toContain(
            '0.125rem'
        )
    })

    it('keeps the stylesheet default line size when lineSize is omitted', () => {
        renderWithProvider(
            <Splitter data-testid="splitter">
                <Splitter.Panel>Panel 1</Splitter.Panel>
                <Splitter.Panel>Panel 2</Splitter.Panel>
            </Splitter>
        )

        expect(screen.getByTestId('splitter').style.getPropertyValue('--splitter-line-size')).toBe('')
    })
})
