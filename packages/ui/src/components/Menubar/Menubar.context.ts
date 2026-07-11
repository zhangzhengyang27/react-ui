import { createSafeContext, GetStylesApi } from '../../core'
import type { FloatingPosition } from '../../core'
import type { MenubarFactory } from './Menubar'

export interface MenubarContextValue {
    getStyles: GetStylesApi<MenubarFactory>
    id: string
    openIndex: number | null
    setOpenIndex: (index: number | null) => void
    openMenu: (index: number, source: 'click' | 'hover') => void
    closeMenu: () => void
    scheduleClose: () => void
    cancelClose: () => void
    getOpenSource: () => 'click' | 'hover' | null
    getPreviousOpenIndex: () => number | null
    activeIndex: number
    setActiveIndex: (index: number) => void
    trigger: 'click' | 'hover'
    loop: boolean
    position: FloatingPosition
    unstyled: boolean | undefined
    getMenuIndex: (id: string) => number
    getTargets: () => HTMLButtonElement[]
    getEnabledIndexes: () => number[]
    getAdjacentIndex: (current: number, direction: 1 | -1) => number
    focusTarget: (index: number) => void
    focusMenuItem: (index: number, position: 'first' | 'last') => void
    registerTarget: (index: number, id: string, node: HTMLButtonElement | null) => void
}

export const [MenubarContextProvider, useMenubarContext] = createSafeContext<MenubarContextValue>(
    'Menubar component was not found in the tree'
)

export interface MenubarMenuContextValue {
    id: string
    index: number
    opened: boolean
}

export const [MenubarMenuContextProvider, useMenubarMenuContext] =
    createSafeContext<MenubarMenuContextValue>('Menubar.Menu component was not found in the tree')
