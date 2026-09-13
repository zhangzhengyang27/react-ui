import { createSafeContext } from '../../core'

export interface GridContextValue {
    columns: number
    /** 是否开启 grow（根容器切换为 flex 布局，列按 span 比例分配 basis/grow） */
    grow: boolean
}

export const [GridContextProvider, useGridContext] = createSafeContext<GridContextValue>(
    'Grid component was not found in the tree'
)
