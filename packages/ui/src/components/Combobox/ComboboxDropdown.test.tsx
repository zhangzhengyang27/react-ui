import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { UIProvider } from '../../core'
import classes from './Combobox.module.css'
import { Combobox } from './Combobox'
import type { ComboboxProps } from './Combobox'

// 下拉层渲染在 Portal 里，挂在 document.body 下，只能从 document 查询
const getDropdown = () => document.querySelector<HTMLElement>('[role="listbox"]')

afterEach(() => {
    vi.restoreAllMocks()
})

/** jsdom 里所有几何量都是 0，floating-ui 的 size 中间件测不出可用高度；
 *  按 1024x768 视口、目标 (0,100,200x32)、面板 200x400 给出真实矩形 */
function stubFloatingGeometry() {
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (this: HTMLElement) {
        const isTarget = this.tagName === 'BUTTON'
        const y = isTarget ? 100 : 136
        const height = isTarget ? 32 : 400
        return {
            x: 0,
            y,
            width: 200,
            height,
            top: y,
            left: 0,
            right: 200,
            bottom: y + height
        } as DOMRect
    })
    vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(200)
    vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(1024)
    vi.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockReturnValue(768)
    vi.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockImplementation(function (this: HTMLElement) {
        return this.tagName === 'BUTTON' ? 32 : 400
    })
}

const renderCombobox = (props: Partial<ComboboxProps> = {}) =>
    render(
        <UIProvider>
            <Combobox {...props}>
                <Combobox.Target>
                    <button type="button">target</button>
                </Combobox.Target>
                <Combobox.Dropdown>
                    <Combobox.Options>
                        <Combobox.Option value="apple">Apple</Combobox.Option>
                    </Combobox.Options>
                </Combobox.Dropdown>
            </Combobox>
        </UIProvider>
    )

describe('Combobox.Dropdown', () => {
    it('默认（不传新属性）DOM 不变：只有一个子节点、无箭头、面板坐标与内联样式照旧', () => {
        renderCombobox({ opened: true })
        const dropdown = getDropdown()

        expect(dropdown).not.toBeNull()
        // 没有 withArrow 时 FloatingArrow 返回 null：children 之外不追加任何节点
        expect(dropdown!.firstElementChild).toBe(dropdown!.lastElementChild)
        expect(dropdown!.childElementCount).toBe(1)
        expect(dropdown!.getAttribute('aria-orientation')).toBe('vertical')
        expect(dropdown!.getAttribute('data-ui-stop-propagation')).toBe('true')
        // 定位行为保持原样：absolute + floating-ui 坐标 + zIndex 300
        expect(dropdown!.style.position).toBe('absolute')
        expect(dropdown!.style.zIndex).toBe('300')
        // 坐标由 floating-ui 决定（jsdom 首帧为 0，微任务里回填），只断言未被浮层自身样式覆盖
        expect(dropdown!.style.top).toMatch(/^[-\d.]+px$/)
        expect(dropdown!.style.left).toMatch(/^[-\d.]+px$/)
        // 过渡默认值仍是 fade / 150ms / ease（未配置 transitionProps 时零变化）
        expect(dropdown!.style.transitionDuration).toBe('150ms')
        expect(dropdown!.style.transitionProperty).toBe('opacity')
        expect(dropdown!.style.transitionTimingFunction).toBe('ease')
        // floatingHeight 未启用：既没有限高也没有注入 CSS 变量
        expect(dropdown!.style.maxHeight).toBe('')
        expect(dropdown!.getAttribute('style')).not.toContain('--combobox-floating-options-max-height')
    })

    it('默认关闭时下拉层从 DOM 卸载（keepMounted 默认 false）', () => {
        renderCombobox()
        expect(getDropdown()).toBeNull()
    })

    it('withArrow 渲染出跟随目标的箭头元素', () => {
        renderCombobox({ opened: true, withArrow: true })
        const dropdown = getDropdown()!

        expect(dropdown.childElementCount).toBe(2)
        const arrow = dropdown.lastElementChild as HTMLElement
        expect(arrow.getAttribute('role')).toBe('presentation')
        expect(arrow.className).toContain(classes.arrow)
        expect(arrow.style.transform).toBe('rotate(45deg)')
        // 默认 arrowSize 7 → 边长 7px、bottom-start 时凸出面板半个尺寸
        expect(arrow.style.width).toBe('7px')
        expect(arrow.style.height).toBe('7px')
        expect(arrow.style.top).toBe('-3.5px')
    })

    it('arrowSize / arrowOffset 决定箭头尺寸与边缘间距', () => {
        renderCombobox({ opened: true, withArrow: true, arrowSize: 12, arrowOffset: 20 })
        const arrow = getDropdown()!.lastElementChild as HTMLElement

        expect(arrow.style.width).toBe('12px')
        expect(arrow.style.top).toBe('-6px')
        // arrowPosition 固定为 'side'：side-start 时沿面板左缘按 arrowOffset 定位
        expect(arrow.style.left).toBe('20px')
    })

    it('transitionProps 透传给下拉层 Transition', () => {
        renderCombobox({
            opened: true,
            transitionProps: { transition: 'pop', duration: 300, timingFunction: 'linear' }
        })
        const dropdown = getDropdown()!

        expect(dropdown.style.transitionDuration).toBe('300ms')
        expect(dropdown.style.transitionProperty).toBe('transform, opacity')
        expect(dropdown.style.transitionTimingFunction).toBe('linear')
        expect(dropdown.style.transform).toContain('scale')
    })

    it('transitionProps 的 onEntered/onExited 由下拉层过渡触发', () => {
        const onEntered = vi.fn()
        const onExited = vi.fn()
        renderCombobox({ transitionProps: { duration: 0, onEntered, onExited } })
        const target = screen.getByRole('button', { name: 'target' })

        fireEvent.click(target)
        expect(onEntered).toHaveBeenCalledTimes(1)

        fireEvent.keyDown(target, { key: 'Escape' })
        expect(onExited).toHaveBeenCalledTimes(1)
        expect(getDropdown()).toBeNull()
    })

    it('keepMounted 时关闭的下拉层留在 DOM 中但不可见', () => {
        renderCombobox({ keepMounted: true })
        const dropdown = getDropdown()

        expect(dropdown).not.toBeNull()
        expect(dropdown).not.toBeVisible()
    })

    it('keepMounted 时打开的下拉层可见', () => {
        renderCombobox({ keepMounted: true, opened: true })
        expect(getDropdown()).toBeVisible()
    })

    it('floatingHeight 为数字时给面板限高并暴露 CSS 变量', () => {
        renderCombobox({ opened: true, floatingHeight: 120 })
        const dropdown = getDropdown()!

        expect(dropdown.style.maxHeight).toBe('120px')
        expect(dropdown.getAttribute('style')).toContain('--combobox-floating-options-max-height: 120px')
    })

    it("floatingHeight='viewport' 时套用 floating-ui 实测的可用高度", async () => {
        stubFloatingGeometry()
        renderCombobox({ opened: true, floatingHeight: 'viewport' })
        const dropdown = getDropdown()!

        // size 中间件在异步链路里回写测量值，等待它落到面板上
        await waitFor(() => {
            expect(Number.parseInt(dropdown.style.maxHeight, 10)).toBeGreaterThan(0)
        })
        const cap = Number.parseInt(dropdown.style.maxHeight, 10)
        // 可用高度是视口内实测值：小于视口、且与暴露给内部 ScrollArea 的变量一致
        expect(cap).toBeLessThanOrEqual(window.innerHeight)
        expect(dropdown.getAttribute('style')).toContain(`--combobox-floating-options-max-height: ${cap}px`)
    })
})
