import { getSortedBreakpoints, keys, type StyleProp, type SystemPropData, type UITheme } from '../../core'

/**
 * Grid.Col 的 span / offset / order 共用的响应式入参类型
 * （与 Grid 自身的 cols/gutter 一致，走仓库既有的 StyleProp 约定）
 */
export type ResponsiveColProp = StyleProp<number>

/** 级联解析用的槽位：base 在最前，其后是 theme.breakpoints 按 min-width 升序的键 */
export const BASE_SLOT = 'base'

/**
 * 取响应式对象的 base 值（标量原样返回）。
 * Grid（取 base 列数）、GridVariables（下发 --grid-cols 的 base 值）与
 * GridCol 的非响应式分支共用：只写了 base 键的对象在语义上等价于标量。
 */
export function getBaseValue<Value>(value: StyleProp<Value> | undefined): Value | undefined {
    if (typeof value === 'object' && value !== null) {
        return (value as Partial<Record<string, Value>>)[BASE_SLOT]
    }

    return value
}

/**
 * 判断入参是否真的需要跨断点输出。
 * 语义与 core/Box/style-props/parse-style-props 内部的 hasResponsiveStyles 一致：
 * 标量、只有 base 键的对象都不算响应式（那类值直接走内联样式，DOM 与非响应式用法逐字节相同）。
 */
export function hasResponsiveValue(value: ResponsiveColProp | undefined): boolean {
    if (typeof value !== 'object' || value === null) {
        return false
    }

    const slots = keys(value)
    return !(slots.length === 1 && slots[0] === BASE_SLOT)
}

/**
 * 断点槽位表：['base', ...按 min-width 升序的 theme.breakpoints 键]
 * 自定义主题追加的乱序断点同样按数值升序，保证生成的媒体查询级联顺序正确
 */
export function getColBreakpointSlots(theme: UITheme): string[] {
    const breakpoints = getSortedBreakpoints(keys(theme.breakpoints), theme.breakpoints)
        .map(breakpoint => breakpoint.value)
        .filter(breakpoint => breakpoint !== BASE_SLOT)

    return [BASE_SLOT, ...breakpoints]
}

/**
 * 把 StyleProp 摊平成与 slots 一一对应的值数组。
 * 采用 CSS min-width 级联语义：某断点未显式声明时，继承上一个已声明 slot 的值，
 * 这样每个断点拿到的 span/offset/cols 才是「该视口下真正生效」的组合，钳位才有意义。
 */
function cascadeToSlots(value: ResponsiveColProp | undefined, slots: string[]): (number | undefined)[] {
    const scalar = typeof value === 'number' ? value : undefined
    const record = typeof value === 'object' && value !== null
        ? (value as Partial<Record<string, number>>)
        : undefined

    let carried: number | undefined

    return slots.map(slot => {
        const declared = record ? record[slot] : scalar
        if (declared !== undefined) {
            carried = declared
        }
        return carried
    })
}

/**
 * 声明在某断点消失时必须显式写回的初始值。
 * 媒体查询只覆盖不清除：offset 只在 md 给出时，若不在 lg 写回 0，
 * md 的偏移会一直生效到最宽视口。
 */
const RESET_VALUES: Record<string, string | number> = {
    order: 0,
    marginInlineStart: '0px'
}

export interface ResponsiveColDeclarations {
    /** 该断点下生效的 CSS 声明；值为 undefined 表示该断点不产生声明 */
    [property: string]: string | number | undefined
}

interface ResolveOptions {
    span: ResponsiveColProp | undefined
    offset: ResponsiveColProp | undefined
    order: ResponsiveColProp | undefined
    /** Grid 的 cols，可能本身是响应式对象 */
    cols: ResponsiveColProp | undefined
    grow: boolean
    /** 兜底列数：cols 的 base 值（无 Grid 上下文时为 12） */
    columns: number
}

/**
 * 逐断点解析 Grid.Col 的最终 CSS 声明。
 *
 * 关键点是「钳位必须在每个断点上各做一遍」：span 的合法区间取决于同一视口下的列数，
 * 例如 cols={{ base: 4, lg: 12 }} + span={{ base: 4, lg: 12 }}，
 * 若统一按 base 的 4 列钳位，lg 下本已合法的 span 12 会被误压成 4。
 * 同理 offset+span 的裁剪也按断点各自计算。
 *
 * grow 模式下根容器是 flex（见 Grid.module.css），flex-grow 只能吃数字，
 * 因此输出 flexGrow/flexBasis/marginInlineStart；列数交给 --grid-cols 变量
 * （由 GridVariables 按断点下发），calc 里的列数随断点自动变化。
 */
export function getResponsiveColDeclarations(
    { span, offset, order, cols, grow, columns }: ResolveOptions,
    slots: string[]
): ResponsiveColDeclarations[] {
    const spanSeries = cascadeToSlots(span, slots)
    const offsetSeries = cascadeToSlots(offset, slots)
    const orderSeries = cascadeToSlots(order, slots)
    const colsSeries = cascadeToSlots(cols, slots)

    const unit = `(100% - (var(--grid-cols, ${columns}) - 1) * var(--grid-column-gap, 0px)) / var(--grid-cols, ${columns})`

    return slots.map((_, index) => {
        const breakpointColumns = colsSeries[index] ?? columns
        // offset 钳位到 [0, columns-1]：负值会让 grid-column 起点非法被浏览器丢弃，
        // ≥columns 则即使 span 已收敛仍会创建隐式列横向溢出
        const breakpointOffset = Math.max(0, Math.min(offsetSeries[index] ?? 0, breakpointColumns - 1))
        const breakpointSpan = spanSeries[index] ?? 1
        const breakpointOrder = orderSeries[index]

        if (grow) {
            return {
                flexGrow: breakpointSpan,
                flexBasis: `calc(${unit} * ${breakpointSpan})`,
                marginInlineStart: breakpointOffset > 0 ? `calc(${unit} * ${breakpointOffset})` : undefined,
                order: breakpointOrder
            }
        }

        // span 收敛到 [1, columns]：超出会创建隐式列导致横向溢出；
        // offset+span 超界时裁掉 span（span 0 会让整条 grid-column 声明非法被丢弃）
        const clampedSpan = Math.max(1, Math.min(breakpointSpan, breakpointColumns - breakpointOffset))

        return {
            gridColumn:
                breakpointOffset > 0
                    ? `${breakpointOffset + 1} / span ${clampedSpan}`
                    : `span ${clampedSpan}`,
            order: breakpointOrder
        }
    })
}

/**
 * 把逐断点的声明压成 StyleProp 形状：只保留「相对上一个断点发生变化」的槽位。
 * 未变化的断点交给 min-width 媒体查询的天然级联继承，避免生成冗余规则。
 */
export function collapseColDeclarations(
    slots: string[],
    declarations: ResponsiveColDeclarations[]
): Record<string, StyleProp<string | number>> {
    const draft: Record<string, Record<string, string | number>> = {}
    let previous: ResponsiveColDeclarations = {}

    slots.forEach((slot, index) => {
        const current = declarations[index]
        const properties = Array.from(new Set([...keys(previous), ...keys(current)]))

        properties.forEach(property => {
            const next = current[property]
            const carried = previous[property]

            if (next === carried) {
                return
            }

            const value = next === undefined ? RESET_VALUES[property] : next
            if (value === undefined) {
                return
            }

            draft[property] = { ...(draft[property] ?? {}), [slot]: value }
        })

        previous = current
    })

    return keys(draft).reduce<Record<string, StyleProp<string | number>>>((acc, property) => {
        acc[property] = draft[property]
        return acc
    }, {})
}

/**
 * 一站式：解析 + 逐断点钳位 + 折叠成 parseStyleProps 可直接消费的 StyleProp 形状。
 */
export function getResponsiveColStyleProps(
    options: ResolveOptions,
    theme: UITheme
): Record<string, StyleProp<string | number>> {
    const slots = getColBreakpointSlots(theme)
    return collapseColDeclarations(slots, getResponsiveColDeclarations(options, slots))
}

/**
 * Grid.Col 响应式声明交给 parseStyleProps 时的属性映射。
 * 值已在此模块内解析/钳位完成，故全部用 identity（原样）解析器，
 * 复用 core 的断点拆分与 sortMediaQueries 排序，不再自己拼媒体查询。
 */
export const GRID_COL_STYLE_PROPS_DATA: Record<string, SystemPropData> = {
    gridColumn: { type: 'identity', property: 'gridColumn' },
    order: { type: 'identity', property: 'order' },
    flexGrow: { type: 'identity', property: 'flexGrow' },
    flexBasis: { type: 'identity', property: 'flexBasis' },
    marginInlineStart: { type: 'identity', property: 'marginInlineStart' }
}
