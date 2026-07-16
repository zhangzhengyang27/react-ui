import type { UIColor, UIColorScheme, UITheme } from '../../theme.types'
import { isVirtualColor } from '../../UICssVariables/virtual-color/virtual-color'
import { getPrimaryShade } from '../get-primary-shade/get-primary-shade'
import { parseThemeColor } from '../parse-theme-color/parse-theme-color'

interface GetContrastColorInput {
    color: string | null | undefined
    theme: UITheme
    autoContrast?: boolean | undefined | null
    colorScheme?: UIColorScheme
}

export function getContrastColor({ color, theme, autoContrast, colorScheme }: GetContrastColorInput) {
    const _autoContrast = typeof autoContrast === 'boolean' ? autoContrast : theme.autoContrast

    if (!_autoContrast) {
        return 'var(--ui-color-white)'
    }

    const parsed = parseThemeColor({ color: color || theme.primaryColor, theme, colorScheme })
    return parsed.isLight ? 'var(--ui-color-black)' : 'var(--ui-color-white)'
}

export function getVirtualColorContrast(
    value: { light: UIColor; dark: UIColor },
    theme: UITheme,
    colorScheme: 'light' | 'dark'
) {
    return getContrastColor({
        color: colorScheme === 'dark' ? value.dark : value.light,
        theme,
        colorScheme,
        autoContrast: true
    })
}

export function getPrimaryContrastColor(theme: UITheme, colorScheme: 'light' | 'dark') {
    const primaryColor = theme.colors[theme.primaryColor]

    if (isVirtualColor(primaryColor)) {
        if (!theme.autoContrast) {
            return 'var(--ui-color-white)'
        }

        return getVirtualColorContrast(primaryColor, theme, colorScheme)
    }

    return getContrastColor({
        color: primaryColor[getPrimaryShade(theme, colorScheme)],
        theme,
        autoContrast: null
    })
}
