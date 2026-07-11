import { createContext, useContext } from 'react'

export interface SubMenuContextValue {
    opened: boolean
    close: () => void
    open: () => void
    parentContext: SubMenuContextValue | null
}

export const SubMenuContext = createContext<SubMenuContextValue | null>(null)

export function useSubMenuContext(): SubMenuContextValue {
    const ctx = useContext(SubMenuContext)
    if (!ctx) {
        throw new Error('Menu.Sub component was not found in tree')
    }
    return ctx
}
