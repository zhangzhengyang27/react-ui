import type { UIColorScheme, UITheme } from '../../theme.types'

/**
 * 根据主题和配色方案获取主色调的阴影值
 * @param {UITheme} theme - UI主题对象，包含primaryShade配置
 * @param {UIColorScheme} colorScheme - 当前配色方案('light'或'dark')
 * @returns {number} 对应配色方案下的主色调阴影值
 */
export function getPrimaryShade(theme: UITheme, colorScheme: UIColorScheme) {
    if (typeof theme.primaryShade === 'number') {
        return theme.primaryShade
    }

    if (colorScheme === 'dark') {
        return theme.primaryShade.dark
    }

    return theme.primaryShade.light
}
