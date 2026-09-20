import { createSafeContext, type FloatingPosition } from '../../core'
import type { PopoverTransitionProps } from '../Popover/Popover'

export interface ComboboxOptionData {
    value: string
    label: string
    disabled?: boolean
    group?: string
    /** 选项实例唯一键，注册时由 Combobox 写入；重复 value 的选项靠它区分注册条目 */
    key?: string
    /** 选项 DOM 节点，用于把注册表顺序对齐到视觉顺序（键盘导航依赖一致顺序） */
    node?: HTMLElement | null
}

export interface ComboboxContextValue {
    opened: boolean
    setOpened: (value: boolean) => void
    x: number | undefined
    y: number | undefined
    targetRef: (node: HTMLElement | null) => void
    dropdownRef: (node: HTMLElement | null) => void
    targetId: string
    dropdownId: string
    /** useCombobox store 的列表 id，store 的 DOM 查询依赖它；经 store prop 注入 */
    listId?: string | null
    activeIndex: number
    setActiveIndex: (index: number) => void
    selectedValues: string[]
    /** selectedValues 的 Set 视图（由 Combobox memo）：选项选中态判定 O(1)，避免逐选项 includes 的 O(n×m) */
    selectedValuesSet: Set<string>
    onOptionSelect: (value: string) => void
    registerOption: (key: string, data: ComboboxOptionData) => void
    unregisterOption: (key: string) => void
    options: ComboboxOptionData[]
    /** key → 注册表索引的 Map（由 Combobox memo）：选项用它 O(1) 查自身 index，避免逐实例 findIndex 的 O(n²) */
    optionIndexMap: Map<string, number>
    searchValue: string
    setSearchValue: (value: string) => void
    onTargetKeyDown: (event: React.KeyboardEvent<HTMLElement>) => void
    onTargetClick: () => void
    /** 目标失焦处理：焦点离开目标与下拉时关闭下拉（closeOnBlur） */
    onTargetBlur: (event: React.FocusEvent<HTMLElement>) => void
    disabled?: boolean

    // ── 下拉层（Combobox.Dropdown）浮层配置：由 Combobox 根组件下发 ──

    /** 传递给下拉层 Transition 的属性；未传时下拉层沿用 fade / 150ms */
    transitionProps: PopoverTransitionProps | undefined
    /** 下拉关闭后是否保留在 DOM 中（隐藏而非卸载） */
    keepMounted: boolean | undefined
    /** 是否渲染指向触发元素的箭头 */
    withArrow: boolean | undefined
    /** 箭头尺寸（px） */
    arrowSize: number
    /** 箭头与下拉层边缘的间距（px），同时作为 floating-ui arrow 中间件的 padding */
    arrowOffset: number
    /** 箭头元素 ref：floating-ui arrow 中间件与 Combobox.Dropdown 渲染的箭头共用 */
    arrowRef: React.RefObject<HTMLDivElement | null>
    /** arrow 中间件算出的箭头坐标（浮层内相对偏移） */
    arrowX: number | undefined
    arrowY: number | undefined
    /** floating-ui 计算后的实际 placement（含 flip 结果）：箭头朝向依赖它 */
    placement: FloatingPosition
    /** floatingHeight prop 解析出的下拉层高度上限（px）：'viewport' 取 floating-ui 实测可用高度，
     *  数字直接采用；未启用 floatingHeight 时为 undefined（面板不限高、DOM 与改动前一致） */
    floatingHeight: number | undefined
}

export const [ComboboxContextProvider, useComboboxContext] = createSafeContext<ComboboxContextValue>(
    'Combobox component was not found in the tree'
)
