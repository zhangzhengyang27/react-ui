import {
    BASE_SLOT,
    cascadeValueToSlots,
    getBreakpointSlots,
    hasResponsiveValue,
    keepChangedSlots,
    keys,
    rem,
    type CssVariable,
    type StyleProp,
    type SystemPropData,
    type UITheme
} from '../../core'

/**
 * header/footer 的 height 与 navbar/aside 的 width：
 * 接受标量（数字按 rem 换算、字符串原样）或按 theme.breakpoints 分级的对象，
 * 语法与仓库的 style props 一致（如 `{ base: 200, md: 300, lg: 400 }`）。
 */
export type AppShellSizeProp = StyleProp<number | string>

/**
 * navbar/aside 的 collapsed：接受布尔或按断点分级的对象。
 * 走 min-width 级联语义——未在 base 声明即等同默认值 false，
 * 因此「窄屏折叠、宽屏展开」写作 `{ base: true, lg: false }`。
 */
export type AppShellCollapsedProp = StyleProp<boolean>

export type AppShellSectionName = 'header' | 'navbar' | 'aside' | 'footer'

/** AppShell 各 section 的配置（结构上即 AppShellProps 的 section 字段子集） */
export interface AppShellSections {
    header?: { height?: AppShellSizeProp }
    footer?: { height?: AppShellSizeProp }
    navbar?: { width?: AppShellSizeProp; collapsed?: AppShellCollapsedProp }
    aside?: { width?: AppShellSizeProp; collapsed?: AppShellCollapsedProp }
}

export interface AppShellResolvedSizes {
    /** 内联到根元素 style 的 CSS 变量：非响应式用法（与改动前逐字节相同） */
    vars: Record<CssVariable, string | undefined>
    /** 需按断点下发的变量：已折叠为「仅相对上一档变化的槽位」，交给 parseStyleProps */
    responsive: Record<string, StyleProp<string>>
    /** 各 section 在 base 槽位的生效尺寸，供 context / mod 使用（对象值不会漏进 DOM） */
    base: Partial<Record<AppShellSectionName, string>>
    /** 各 section 是否在全部断点折叠（决定 data-collapsed 与 with-* mod） */
    collapsedEverywhere: { navbar: boolean; aside: boolean }
}

// 数字尺寸（如 navbar.width: 220）必须带单位进 CSS 变量：
// 无单位值替换进 grid-template 的轨道列表会让整条声明在计算值阶段失效，布局塌陷
const toCssSize = (value: string | number | undefined): string | undefined =>
    typeof value === 'number' ? rem(value) : value

/** 折叠态在该槽位落地的轨道尺寸（与 CSS 里 var() 的兜底值一致） */
const COLLAPSED_SIZE = '0px'

/**
 * 下发顺序即根元素 style 上变量的顺序，也是改动前 varsResolver 的书写顺序，
 * 调整顺序会改变既有 DOM（快照/文档类名表依赖它）。
 */
const SECTIONS: { name: AppShellSectionName; variable: CssVariable; collapsible: boolean }[] = [
    { name: 'header', variable: '--app-shell-header-height', collapsible: false },
    { name: 'footer', variable: '--app-shell-footer-height', collapsible: false },
    { name: 'navbar', variable: '--app-shell-navbar-width', collapsible: true },
    { name: 'aside', variable: '--app-shell-aside-width', collapsible: true }
]

const getSizeProp = (sections: AppShellSections, name: AppShellSectionName): AppShellSizeProp | undefined =>
    name === 'header' || name === 'footer' ? sections[name]?.height : sections[name]?.width

const getCollapsedProp = (sections: AppShellSections, name: AppShellSectionName): AppShellCollapsedProp | undefined =>
    name === 'navbar' || name === 'aside' ? sections[name]?.collapsed : undefined

/**
 * 逐断点解析四个 section 的轨道尺寸。
 *
 * 实现方式与 Grid.Col 同源（见 components/Grid/GridCol.tsx 的说明）：JS 侧算完每个断点
 * 真正生效的值，再交给仓库既有的响应式通道（parseStyleProps + InlineStyles + 随机类），
 * 因为内联 CSS 变量优先级压过任何类规则——把 base 值留在 varsResolver 里，
 * 媒体查询就永远命中不了高断点的尺寸。
 *
 * collapsed 与尺寸在同一槽位上合成：折叠的断点必须落 0px，展开的断点必须落回该断点
 * 声明的宽度。二者都按 min-width 级联展开后再配对，所以
 * 「base 折叠、lg 展开」不会让 lg 的轨道残留 base 的 0px，也不会让折叠态被某个
 * 高断点的宽度声明复活（那是会残留在最宽视口的幽灵轨道）。
 */
export function getAppShellSizes(sections: AppShellSections, theme: UITheme): AppShellResolvedSizes {
    const slots = getBreakpointSlots(theme)
    const vars: Record<CssVariable, string | undefined> = {}
    const responsive: Record<string, StyleProp<string>> = {}
    const base: Partial<Record<AppShellSectionName, string>> = {}
    const collapsedEverywhere = { navbar: false, aside: false }

    SECTIONS.forEach(({ name, variable, collapsible }) => {
        const size = getSizeProp(sections, name)
        const collapsed = collapsible ? getCollapsedProp(sections, name) : undefined

        const sizeSeries = cascadeValueToSlots(size, slots)
        const collapsedSeries = cascadeValueToSlots(collapsed, slots)
        const effective: (string | undefined)[] = slots.map((_, index) =>
            collapsedSeries[index] ? COLLAPSED_SIZE : toCssSize(sizeSeries[index])
        )

        base[name] = effective[0]

        if (name === 'navbar' || name === 'aside') {
            collapsedEverywhere[name] = collapsedSeries.every(value => value === true)
        }

        // 标量与只写了 base 的对象：走内联变量，DOM 与改动前完全一致
        if (!hasResponsiveValue(size) && !hasResponsiveValue(collapsed)) {
            vars[variable] = effective[0]
            return
        }

        const changed = keepChangedSlots(slots, effective)

        // 对象里没有任何已知断点键：等同于没配置，什么都不下发
        if (keys(changed).length === 0) {
            return
        }

        // 逐断点算下来其实各处同值（例如 collapsed: true 配响应式 width）：退回内联变量，
        // 既不生成 <style>/随机类，也保证折叠态不会被任何断点的宽度声明复活
        if (!hasResponsiveValue(changed)) {
            vars[variable] = changed[BASE_SLOT]
            return
        }

        responsive[variable] = changed
    })

    return { vars, responsive, base, collapsedEverywhere }
}

/**
 * section 尺寸变量交给 parseStyleProps 时的属性映射。
 * 值已在 getAppShellSizes 内解析/合成完毕，故全部用 identity（原样）解析器，
 * 复用 core 的断点拆分与 sortMediaQueries 排序，不再自己拼媒体查询。
 */
export const APP_SHELL_SIZE_STYLE_PROPS_DATA: Record<string, SystemPropData> = SECTIONS.reduce<
    Record<string, SystemPropData>
>((acc, { variable }) => {
    acc[variable] = { type: 'identity', property: variable }
    return acc
}, {})
