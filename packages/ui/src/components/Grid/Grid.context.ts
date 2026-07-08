import { createSafeContext } from '../../core'

export interface GridContextValue {
    columns: number
}

export const [GridContextProvider, useGridContext] = createSafeContext<GridContextValue>(
    'Grid component was not found in the tree'
)
