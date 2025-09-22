import React from 'react'

import '../ThemeProvider/global.css'

import { ThemeProvider } from '../ThemeProvider/ThemeProvider'
import { UIThemeOverrides } from '../types/theme.types'

import { Context } from './context'

export interface ProviderProps {
    /**
     * The theme overrides to apply.
     */
    theme?: UIThemeOverrides
    /**
     * The children to render.
     */
    children?: React.ReactNode
}

export const Provider: React.FC<ProviderProps> = ({ theme, children }) => {
    return (
        <Context.Provider value={{}}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </Context.Provider>
    )
}

Provider.displayName = '@react/ui/Provider'
