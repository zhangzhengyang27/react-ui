import { createContext, useContext } from 'react'
import { UISpacing } from '../../core'

export interface AppShellContextValue {
    padding?: UISpacing
    headerHeight?: React.CSSProperties['height']
    footerHeight?: React.CSSProperties['height']
    navbarWidth?: React.CSSProperties['width']
    asideWidth?: React.CSSProperties['width']
    navbarCollapsed?: boolean
    asideCollapsed?: boolean
}

export const AppShellContext = createContext<AppShellContextValue>({})

export function useAppShellContext() {
    return useContext(AppShellContext)
}
