import { useContext } from 'react'

import { DEFAULT_THEME } from './default-theme'
import { ThemeContext } from './ThemeContext'

export const useSafeTheme = () => useContext(ThemeContext) || DEFAULT_THEME

export const useTheme = () => {
    const ctx = useContext(ThemeContext)
    if (!ctx) {
        throw new Error(
            '@xiaoye-react/ui: Provider was not found in component tree, make sure you have it in your app'
        )
    }

    return ctx
}
