import { deepMerge } from '../../utils'
import type { MantineTheme, MantineThemeOverride } from '../theme.types'

/**
 * 无效主色调错误消息
 *
 * 当 `theme.primaryColor` 配置无效时抛出此错误。该值必须是 `theme.colors` 对象中定义的键名
 *
 * @see https://mantine.dev/theming/colors/#primary-color
 */
export const INVALID_PRIMARY_COLOR_ERROR =
    '[@mantine/core] MantineProvider: Invalid theme.primaryColor, it accepts only key of theme.colors, learn more – https://mantine.dev/theming/colors/#primary-color'

/**
 * 无效主色调深浅值错误消息
 *
 * 当 `theme.primaryShade` 配置无效时抛出此错误。该值必须是 0-9 的整数或包含 light/dark 模式深浅值的对象
 *
 * @example
 * // 有效值示例
 * primaryShade: 6
 * primaryShade: { light: 6, dark: 8 }
 */
export const INVALID_PRIMARY_SHADE_ERROR =
    '[@mantine/core] MantineProvider: Invalid theme.primaryShade, it accepts only 0-9 integers or an object { light: 0-9, dark: 0-9 }'

/**
 * 验证给定的色度值是否是有效的主色调值
 * @param {number} shade - 需要验证的色度值（0-9之间的整数）
 * @returns {boolean} 如果色度值在0-9范围内且为整数则返回true，否则返回false
 */
function isValidPrimaryShade(shade: number) {
    if (shade < 0 || shade > 9) {
        return false
    }

    return parseInt(shade.toString(), 10) === shade
}

/**
 * 验证 Mantine 主题对象是否符合规范
 * @param {MantineTheme} theme - 需要验证的 Mantine 主题对象
 * @throws {Error} 当主题的主颜色不在预设颜色列表中时抛出错误
 * @throws {Error} 当主题的主色调值无效时抛出错误
 * @asserts {theme is MantineTheme} 断言参数是有效的 Mantine 主题
 */
export function validateMantineTheme(theme: MantineTheme): asserts theme is MantineTheme {
    if (!(theme.primaryColor in theme.colors)) {
        throw new Error(INVALID_PRIMARY_COLOR_ERROR)
    }

    if (typeof theme.primaryShade === 'object') {
        if (!isValidPrimaryShade(theme.primaryShade.dark) || !isValidPrimaryShade(theme.primaryShade.light)) {
            throw new Error(INVALID_PRIMARY_SHADE_ERROR)
        }
    }

    if (typeof theme.primaryShade === 'number' && !isValidPrimaryShade(theme.primaryShade)) {
        throw new Error(INVALID_PRIMARY_SHADE_ERROR)
    }
}

/**
 * 合并两个 Mantine 主题对象，返回一个新的合并后的主题
 * @param {MantineTheme} currentTheme - 当前主题对象
 * @param {MantineThemeOverride} [themeOverride] - 可选的要覆盖的主题对象
 * @returns {MantineTheme} 合并后的新主题对象
 * @throws 如果合并后的主题无效会抛出错误
 */
export function mergeMantineTheme(currentTheme: MantineTheme, themeOverride?: MantineThemeOverride) {
    if (!themeOverride) {
        validateMantineTheme(currentTheme)
        return currentTheme
    }

    const result = deepMerge(currentTheme, themeOverride)

    if (themeOverride.fontFamily && !themeOverride.headings?.fontFamily) {
        result.headings.fontFamily = themeOverride.fontFamily
    }

    validateMantineTheme(result)
    return result
}
