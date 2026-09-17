import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { UIProvider } from '../../core'
import { Rating } from './Rating'

describe('Rating', () => {
    it('renders rating with default value', () => {
        render(
            <UIProvider>
                <Rating defaultValue={3} data-testid="rating" />
            </UIProvider>
        )

        expect(screen.getByTestId('rating')).toBeInTheDocument()
        expect(screen.getAllByRole('radio').length).toBe(5)
    })

    it('calls onChange when star is selected', () => {
        const onChange = vi.fn()
        render(
            <UIProvider>
                <Rating onChange={onChange} data-testid="rating" />
            </UIProvider>
        )

        const radios = screen.getAllByRole('radio')
        fireEvent.click(radios[3])
        expect(onChange).toHaveBeenCalledWith(4)
    })

    it('supports clearable rating by clicking the active star', () => {
        const onChange = vi.fn()
        render(
            <UIProvider>
                <Rating value={3} clearable onChange={onChange} data-testid="rating" />
            </UIProvider>
        )

        const radios = screen.getAllByRole('radio')
        // 第 3 颗星处于选中态，点击已选中的 radio 不触发 change，经 click 清零
        fireEvent.click(radios[2])
        expect(onChange).toHaveBeenCalledWith(0)
    })

    it('does not change value when readOnly', () => {
        const onChange = vi.fn()
        render(
            <UIProvider>
                <Rating readOnly onChange={onChange} data-testid="rating" />
            </UIProvider>
        )

        const radios = screen.getAllByRole('radio') as HTMLInputElement[]
        // 真 readonly：radio 保持启用（值随表单提交），仅拦截交互
        expect(radios[0]).not.toBeDisabled()
        expect(screen.getByTestId('rating')).toHaveAttribute('aria-readonly', 'true')
        fireEvent.click(radios[2])
        fireEvent.keyDown(radios[2], { key: 'ArrowRight' })
        expect(onChange).not.toHaveBeenCalled()
    })

    it('submits readonly value with the form', () => {
        render(
            <UIProvider>
                <form data-testid="form">
                    <Rating readOnly defaultValue={3} name="rating" />
                </form>
            </UIProvider>
        )

        expect(new FormData(screen.getByTestId('form') as HTMLFormElement).get('rating')).toBe('3')
    })

    it('marks the checked star radio for value 3', () => {
        render(
            <UIProvider>
                <Rating value={3} data-testid="rating" />
            </UIProvider>
        )

        const radios = screen.getAllByRole('radio') as HTMLInputElement[]
        expect(radios[2].checked).toBe(true)
        expect(radios[0].checked).toBe(false)
    })

    // jsdom 的 getBoundingClientRect 恒为零宽，手动 mock 星形 radio 的盒模型（input 铺满整星）
    const mockStarRect = (radio: HTMLInputElement) => {
        radio.getBoundingClientRect = () =>
            ({ left: 0, top: 0, right: 100, bottom: 20, width: 100, height: 20, x: 0, y: 0, toJSON: () => ({}) } as DOMRect)
    }

    it('submits fractional value when fractions=2 and clicking the left half of a star', () => {
        const onChange = vi.fn()
        render(
            <UIProvider>
                <Rating fractions={2} onChange={onChange} />
            </UIProvider>
        )

        const radios = screen.getAllByRole('radio') as HTMLInputElement[]
        mockStarRect(radios[1])
        // 第二颗星（宽 100）中点偏左：percent=0.5 → fraction=1 → 提交 1.5
        fireEvent.click(radios[1], { clientX: 50, detail: 1 })
        expect(onChange).toHaveBeenCalledWith(1.5)
    })

    it('keeps integer stepping for keyboard-synthesized activation (click detail=0)', () => {
        const onChange = vi.fn()
        render(
            <UIProvider>
                <Rating fractions={2} onChange={onChange} />
            </UIProvider>
        )

        const radios = screen.getAllByRole('radio') as HTMLInputElement[]
        // React 对 radio 的 onChange 由 click 派生（原生 change 事件不进 React 合成系统），
        // 键盘激活（空格）产生的 click 无指针坐标（detail=0），应退回整星提交而非半星换算；
        // 方向键的原生 roving 在浏览器侧同样经 onChange 处理器提交整星
        fireEvent.click(radios[1], { detail: 0 })
        expect(onChange).toHaveBeenCalledWith(2)
    })

    it('clears fractional value via clearable click on the same fraction', () => {
        const onChange = vi.fn()
        render(
            <UIProvider>
                <Rating fractions={2} defaultValue={1.5} clearable onChange={onChange} />
            </UIProvider>
        )

        const radios = screen.getAllByRole('radio') as HTMLInputElement[]
        mockStarRect(radios[1])
        // 当前值 1.5（第二颗星左半），点击同一分数位置应清零
        fireEvent.click(radios[1], { clientX: 50, detail: 1 })
        expect(onChange).toHaveBeenCalledWith(0)
    })

    it('updates fractional value when clicking the other half of the checked star', () => {
        const onChange = vi.fn()
        render(
            <UIProvider>
                <Rating fractions={2} defaultValue={1.5} onChange={onChange} />
            </UIProvider>
        )

        const radios = screen.getAllByRole('radio') as HTMLInputElement[]
        mockStarRect(radios[1])
        // 已勾选星（1.5）上点击右半：不触发 change，经 click 直接提交 2
        fireEvent.click(radios[1], { clientX: 75, detail: 1 })
        expect(onChange).toHaveBeenCalledWith(2)
    })
})
