import { createSafeContext, type GetStylesApi } from '../../core'
import type { DrawerFactory } from './Drawer'

export type ScrollAreaComponent = React.FC<any> | 'div' | null

export interface DrawerContextValue {
    getStyles: GetStylesApi<DrawerFactory>
    scrollAreaComponent?: ScrollAreaComponent
    radius?: any
}

export const [DrawerProvider, useDrawerContext] = createSafeContext<DrawerContextValue>(
    'Drawer component was not found in tree'
)
