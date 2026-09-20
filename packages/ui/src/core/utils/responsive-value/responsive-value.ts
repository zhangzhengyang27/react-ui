import type { StyleProp } from '../../Box'
import type { UITheme } from '../../UIProvider'
import { getSortedBreakpoints } from '../get-sorted-breakpoints/get-sorted-breakpoints'
import { keys } from '../keys/keys'

/**
 * 响应式 style prop 的断点解析原语（Grid.Col 的 span/offset/order、
 * AppShell 的 header/footer/navbar/aside 尺寸等共用同一套语义）。
 *
 * 这些组件把「按断点分级」的入参在 JS 侧解析成逐槽位的最终值，再交给
 * Box 已在用的响应式通道（parseStyleProps + InlineStyles + useRandomClassName）
 * 落地，而不是生成工具类或只下发一个 CSS 变量：派生/钳位后的结果无法由
 * 单个变量表达，且 `var()` 解析为 undefined 会让整条声明在 computed-value
 * 阶段失效。
 */

/** 级联解析用的槽位：base 在最前，其后是 theme.breakpoints 按 min-width 升序的键 */
export const BASE_SLOT = 'base'

/**
 * 判断入参是否真的需要跨断点输出。
 * 语义与 core/Box/style-props/parse-style-props 内部的 hasResponsiveStyles 一致：
 * 标量、只有 base 键的对象都不算响应式（那类值直接走内联输出，DOM 与标量用法逐字节相同）。
 */
export function hasResponsiveValue(value: StyleProp<unknown> | undefined): boolean {
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
export function getBreakpointSlots(theme: UITheme): string[] {
    const breakpoints = getSortedBreakpoints(keys(theme.breakpoints), theme.breakpoints)
        .map(breakpoint => breakpoint.value)
        .filter(breakpoint => breakpoint !== BASE_SLOT)

    return [BASE_SLOT, ...breakpoints]
}

/**
 * 把 StyleProp 摊平成与 slots 一一对应的值数组。
 * 采用 CSS min-width 级联语义：某断点未显式声明时，继承上一个已声明 slot 的值，
 * 这样每个槽位拿到的才是「该视口下真正生效」的组合（逐断点钳位/折叠判断都依赖这点）。
 */
export function cascadeValueToSlots<Value>(
    value: StyleProp<Value> | undefined,
    slots: string[]
): (Value | undefined)[] {
    // StyleProp 的「对象 or 标量」判定对泛型 Value 无法自动收窄（Value 本身可能是对象），
    // 与 parse-style-props 内部一样显式断言两条分支各自的形状
    const isRecord = typeof value === 'object' && value !== null
    const record = isRecord ? (value as Partial<Record<string, Value>>) : undefined
    const scalar = isRecord ? undefined : (value as Value | undefined)

    let carried: Value | undefined

    return slots.map(slot => {
        const declared = record ? record[slot] : scalar
        if (declared !== undefined) {
            carried = declared
        }
        return carried
    })
}

/**
 * 把「逐槽位生效值」折叠成 StyleProp 形状：只保留相对上一条已落地规则发生变化的槽位。
 * 未变化的槽位交给 min-width 媒体查询的天然级联继承，避免生成冗余规则。
 *
 * 入参必须是 cascadeValueToSlots 的结果：级联后只可能出现「前缀为 undefined」
 * （没有任何断点声明过该值），不会出现「声明过又变回 undefined」，
 * 因此这里无需像 Grid.Col 那样为被后续断点撤销的属性写回 RESET_VALUES。
 */
export function keepChangedSlots<Value>(
    slots: string[],
    values: (Value | undefined)[]
): Partial<Record<string, Value>> {
    const draft: Record<string, Value> = {}
    let carried: Value | undefined
    let hasCarried = false

    slots.forEach((slot, index) => {
        const current = values[index]

        if (current === undefined || (hasCarried && current === carried)) {
            return
        }

        draft[slot] = current
        carried = current
        hasCarried = true
    })

    return draft
}
