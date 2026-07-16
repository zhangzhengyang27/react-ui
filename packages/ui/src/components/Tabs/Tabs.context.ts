import { createSafeContext, GetStylesApi, UIColor, UIRadius } from '../../core'
import type { TabsFactory } from './Tabs'

export interface TabsContext {
    activeValue: string | undefined
    activateTab: (value: string) => void
    getStyles: GetStylesApi<TabsFactory>
    unstyled: boolean | undefined
    variant: string | undefined
    color: UIColor | undefined
    radius: UIRadius | undefined
    orientation: 'horizontal' | 'vertical'
    keepMounted: boolean
}

export const [TabsProvider, useTabsContext] = createSafeContext<TabsContext>('Tabs component was not found in the tree')
