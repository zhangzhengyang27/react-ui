import React from 'react'

import '../ThemeProvider/global.css'

import { UIThemeOverrides } from '../types/theme.types'
import { MantineProvider } from '../MantineProvider/MantineProvider'
import type { MantineColorScheme } from '../MantineProvider/theme.types'

export interface ProviderProps {
    /**
     * The theme overrides to apply.
     */
    theme?: UIThemeOverrides
    /**
     * The color scheme to enforce in this Provider scope.
     */
    colorScheme?: MantineColorScheme
    /**
     * The children to render.
     */
    children?: React.ReactNode
}

export const Provider: React.FC<ProviderProps> = ({ theme, colorScheme, children }) => {
    return (
        <MantineProvider theme={theme} colorScheme={colorScheme}>
            {children}
        </MantineProvider>
    )
}

Provider.displayName = '@react/ui/Provider'
