import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { UIProvider } from '../../core'
import { Grid } from './Grid'

const renderGrid = (ui: React.ReactElement) => render(<UIProvider>{ui}</UIProvider>)

/**
 * 取出该列按断点生成的 CSS：Grid.Col 的响应式声明走 Box 同款通道
 * （随机类 + 一段 <style data-ui-styles="inline">），
 * 随机类名由 useId 决定，断言前统一替换成 .col 以便可读。
 */
function getColBreakpointCss(container: HTMLElement, index = 0) {
    const col = container.querySelectorAll<HTMLElement>('.ui-Grid-col')[index]
    const generatedClass = col.className.match(/__m__-[\w-]+/)?.[0]

    // 列自己的断点规则挂在它前面那个 <style> 上（与 Box 的结构一致：先 style 再元素），
    // 只取这一段，避免把 Grid 的 --grid-* 变量或其他列的规则混进断言
    const styleTag = col.previousElementSibling
    const css = styleTag?.tagName === 'STYLE' ? (styleTag.textContent ?? '') : ''

    return {
        col,
        /** 是否生成了断点用的随机类（非响应式用法必须为 false） */
        hasBreakpointClass: !!generatedClass,
        css: generatedClass ? css.replace(new RegExp(`\\.${generatedClass}`, 'g'), '.col') : css
    }
}

describe('Grid', () => {
    it('renders columns', () => {
        renderGrid(
            <Grid>
                <Grid.Col span={6}>A</Grid.Col>
                <Grid.Col span={6}>B</Grid.Col>
            </Grid>
        )

        expect(screen.getByText('A')).toBeInTheDocument()
        expect(screen.getByText('B')).toBeInTheDocument()
    })

    it('applies offset style', () => {
        const { container } = renderGrid(
            <Grid>
                <Grid.Col span={4} offset={2}>
                    Offset
                </Grid.Col>
            </Grid>
        )

        const col = container.querySelector('[class*="Grid-col"]')
        expect(col).toHaveStyle({ gridColumn: '3 / span 4' })
    })

    it('keeps non responsive output untouched (inline grid-column, no breakpoint class)', () => {
        const { container } = renderGrid(
            <Grid>
                <Grid.Col span={6}>A</Grid.Col>
                <Grid.Col span={4} offset={2} order={3}>
                    B
                </Grid.Col>
            </Grid>
        )

        const first = getColBreakpointCss(container, 0)
        expect(first.col.getAttribute('style')).toBe('grid-column: span 6;')
        expect(first.hasBreakpointClass).toBe(false)

        // 属性顺序（order 在前、grid-column 在后）也是既有 DOM 的一部分
        const second = getColBreakpointCss(container, 1)
        expect(second.col.getAttribute('style')).toBe('order: 3; grid-column: 3 / span 4;')
        expect(second.hasBreakpointClass).toBe(false)

        // 只有 Grid 自身下发 --grid-cols 的那一段 <style>，列不再额外生成
        expect(container.querySelectorAll('style[data-ui-styles="inline"]')).toHaveLength(1)
    })

    it('renders responsive span as breakpoint scoped rules instead of [object Object]', () => {
        const { container } = renderGrid(
            <Grid>
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>A</Grid.Col>
            </Grid>
        )

        expect(container.innerHTML).not.toContain('[object Object]')

        const { col, css, hasBreakpointClass } = getColBreakpointCss(container)
        expect(hasBreakpointClass).toBe(true)
        expect(css).toContain('.col{grid-column:span 12;}')
        expect(css).toContain('@media(min-width: 62em){.col{grid-column:span 6;}}')
        expect(css).toContain('@media(min-width: 75em){.col{grid-column:span 3;}}')
        // base 值不再写进内联样式，否则内联优先级会压掉所有断点规则
        expect(col.getAttribute('style')).toBe(null)
    })

    it('supports responsive offset and order', () => {
        const { container } = renderGrid(
            <Grid>
                <Grid.Col span={{ sm: 6 }} offset={{ base: 1, lg: 2 }} order={{ base: 2, xl: 1 }}>
                    A
                </Grid.Col>
            </Grid>
        )

        const { css } = getColBreakpointCss(container)
        expect(css).toContain('.col{grid-column:2 / span 1;order:2;}')
        expect(css).toContain('@media(min-width: 48em){.col{grid-column:2 / span 6;}}')
        expect(css).toContain('@media(min-width: 75em){.col{grid-column:3 / span 6;}}')
        expect(css).toContain('@media(min-width: 88em){.col{order:1;}}')
    })

    it('omits a responsive offset once it is revoked by a later breakpoint', () => {
        const { container } = renderGrid(
            <Grid grow>
                <Grid.Col span={3} offset={{ md: 2, xl: 0 }}>
                    A
                </Grid.Col>
            </Grid>
        )

        const { css } = getColBreakpointCss(container)
        expect(css).toContain('margin-inline-start:calc(')
        // xl 显式把 offset 收回 0：媒体查询不会自动清除更早断点的规则，必须写回初始值
        expect(css).toContain('@media(min-width: 88em){.col{margin-inline-start:0px;}}')
    })

    it('clamps span and offset against the column count of the same breakpoint', () => {
        const { container } = renderGrid(
            <Grid cols={{ base: 4, lg: 12 }}>
                {/* base 4 列下 4 合法，lg 12 列下 12 也合法：不能因为 base 小就误钳 */}
                <Grid.Col span={{ base: 4, lg: 12 }}>A</Grid.Col>
                {/* base 下 9 超出 4 列要裁到 4，lg 下 3 原样 */}
                <Grid.Col span={{ base: 9, lg: 3 }}>B</Grid.Col>
                {/* lg：offset 8 + span 6 越过 12 列，span 被裁到 12-8=4 */}
                <Grid.Col span={{ lg: 6 }} offset={{ lg: 8 }}>
                    C
                </Grid.Col>
            </Grid>
        )

        const a = getColBreakpointCss(container, 0)
        expect(a.css).toContain('.col{grid-column:span 4;}')
        expect(a.css).toContain('@media(min-width: 75em){.col{grid-column:span 12;}}')

        const b = getColBreakpointCss(container, 1)
        expect(b.css).toContain('.col{grid-column:span 4;}')
        expect(b.css).toContain('@media(min-width: 75em){.col{grid-column:span 3;}}')

        const c = getColBreakpointCss(container, 2)
        expect(c.css).toContain('.col{grid-column:span 1;}')
        expect(c.css).toContain('@media(min-width: 75em){.col{grid-column:9 / span 4;}}')
    })

    it('keeps grow behaviour responsive through flex properties', () => {
        const { container } = renderGrid(
            <Grid grow>
                <Grid.Col span={{ base: 12, md: 6 }}>A</Grid.Col>
            </Grid>
        )

        const { css } = getColBreakpointCss(container)
        expect(css).toContain('.col{flex-grow:12;flex-basis:calc(')
        expect(css).toContain('@media(min-width: 62em){.col{flex-grow:6;')
        // grow 时不能再产出 grid-column 声明（calc 里的 --grid-column-gap 变量名不算）
        expect(css).not.toMatch(/(^|[;{])grid-column:/)
    })

    it('degrades a responsive object whose breakpoints collapse to one value', () => {
        const { container } = renderGrid(
            <Grid>
                <Grid.Col span={{ base: 6, md: 6 }}>A</Grid.Col>
            </Grid>
        )

        const { col, css, hasBreakpointClass } = getColBreakpointCss(container)
        expect(hasBreakpointClass).toBe(false)
        expect(css).toBe('')
        expect(col.getAttribute('style')).toBe('grid-column: span 6;')
    })
})
