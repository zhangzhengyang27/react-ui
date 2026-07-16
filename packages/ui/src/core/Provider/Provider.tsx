import React from 'react'

import '../ThemeProvider/global.css'

import { UIThemeOverrides } from '../types/theme.types'
import { UIProvider } from '../UIProvider/UIProvider'
import type { UIColorScheme } from '../UIProvider/theme.types'

export interface ProviderProps {
    /**
     * The theme overrides to apply.
     */
    theme?: UIThemeOverrides
    /**
     * The color scheme to enforce in this Provider scope.
     */
    colorScheme?: UIColorScheme
    /**
     * The children to render.
     */
    children?: React.ReactNode
}

export const Provider: React.FC<ProviderProps> = ({ theme, colorScheme, children }) => {
    return (
        <UIProvider theme={theme} colorScheme={colorScheme}>
            {children}
        </UIProvider>
    )
}

Provider.displayName = '@react/ui/Provider'
