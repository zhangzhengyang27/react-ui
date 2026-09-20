import { createSafeContext, type StyleProp } from '../../core'

export interface GridContextValue {
    /** cols 的 base 值：非响应式用法沿用它，行为与既有实现一致 */
    columns: number

    /**
     * Grid 传入的原始 cols，可能是响应式对象。
     * Grid.Col 需要它才能在每个断点上按「该断点实际列数」钳位 span/offset
     */
    cols: StyleProp<number>

    /** 是否开启 grow（根容器切换为 flex 布局，列按 span 比例分配 basis/grow） */
    grow: boolean
}

export const [GridContextProvider, useGridContext] = createSafeContext<GridContextValue>(
    'Grid component was not found in the tree'
)
