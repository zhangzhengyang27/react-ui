import { createSafeContext, type GetStylesApi } from '../../core'
import type { DrawerFactory } from './Drawer'

export interface DrawerContextValue {
    getStyles: GetStylesApi<DrawerFactory>
    scrollAreaComponent?: React.FC<any>
    radius?: any
}

export const [DrawerProvider, useDrawerContext] = createSafeContext<DrawerContextValue>(
    'Drawer component was not found in tree'
)
