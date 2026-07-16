import type { UITheme } from '../../theme.types'
import { parseThemeColor } from '../parse-theme-color/parse-theme-color'

/**
 * 根据主题获取颜色值
 * @param {string | undefined | null} color - 可选的颜色值，如果未提供则使用主题的主色
 * @param {UITheme} theme - UI主题对象
 * @returns {string} 解析后的颜色值，可能是CSS变量或直接的颜色值
 */
export function getThemeColor(color: string | undefined | null, theme: UITheme) {
    const parsed = parseThemeColor({ color: color || theme.primaryColor, theme })
    return parsed.variable ? `var(${parsed.variable})` : color!
}
