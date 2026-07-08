import { createSafeContext, GetStylesApi } from '../../core'
import type { TableFactory } from './Table'

interface TableContext {
    getStyles: GetStylesApi<TableFactory>
    unstyled: boolean | undefined
}

export const [TableProvider, useTableContext] = createSafeContext<TableContext>(
    'Table component was not found in the tree'
)
