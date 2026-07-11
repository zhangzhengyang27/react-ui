import { createContext, useContext } from 'react'

export interface MenuCheckboxGroupContextValue {
    values: string[]
    onChange: (value: string) => void
}

export const MenuCheckboxGroupContext = createContext<MenuCheckboxGroupContextValue | null>(null)

export function useMenuCheckboxGroupContext(): MenuCheckboxGroupContextValue | null {
    return useContext(MenuCheckboxGroupContext)
}
