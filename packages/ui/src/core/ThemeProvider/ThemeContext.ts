import { createContext } from 'react'

import { UITheme } from '../types/theme.types'

export const ThemeContext = createContext<UITheme | null>(null)
