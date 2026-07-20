import React, { useMemo } from 'react'

import { UIThemeOverrides } from '../types/theme.types'
import { deepMerge } from '../utils/deep-merge/deep-merge'

import { DEFAULT_THEME } from './default-theme'
import { ThemeContext } from './ThemeContext'
import { useSafeTheme } from './useProvideTheme'

export interface ThemeProviderProps {
    inherit?: boolean
    theme?: UIThemeOverrides
    children?: React.ReactNode
}

export function ThemeProvider({ theme, children, inherit = true }: ThemeProviderProps) {
    const parentTheme = useSafeTheme()
    const mergedTheme = useMemo(
        () => deepMerge(inherit ? parentTheme : DEFAULT_THEME, theme),
        [theme, parentTheme, inherit]
    )

    return <ThemeContext.Provider value={mergedTheme}>{children}</ThemeContext.Provider>
}

ThemeProvider.displayName = '@react-ui/ui/ThemeProvider'
