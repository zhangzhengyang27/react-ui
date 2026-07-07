import React from 'react'

import '../ThemeProvider/global.css'

import { UIThemeOverrides } from '../types/theme.types'
import { MantineProvider } from '../MantineProvider/MantineProvider'

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
    return <MantineProvider theme={theme}>{children}</MantineProvider>
}

Provider.displayName = '@react/ui/Provider'
