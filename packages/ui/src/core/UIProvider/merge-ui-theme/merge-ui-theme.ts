import { deepMerge } from '../../utils'
import type { UITheme, UIThemeOverride } from '../theme.types'

/**
 * 无效主色调错误消息
 *
 * 当 `theme.primaryColor` 配置无效时抛出此错误。该值必须是 `theme.colors` 对象中定义的键名
 *
 * @see https://react-ui.dev/theming/colors/#primary-color
 */
export const INVALID_PRIMARY_COLOR_ERROR =
    '[@xiaoye-react/ui] UIProvider: Invalid theme.primaryColor, it accepts only key of theme.colors, learn more – https://react-ui.dev/theming/colors/#primary-color'

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
    '[@xiaoye-react/ui] UIProvider: Invalid theme.primaryShade, it accepts only 0-9 integers or an object { light: 0-9, dark: 0-9 }'

/**
 * 验证给定的色度值是否是有效的主色调值
 * @param {number} shade - 需要验证的色度值（0-9之间的整数）
 * @returns {boolean} 如果色度值在0-9范围内且为整数则返回true，否则返回false
 */
function isValidPrimaryShade(shade: number) {
    // PartialDeep 允许显式 undefined/null 传入（deepMerge 会透传覆盖），
    // 与 0 比较均为 false 拦不住，随后 shade.toString() 会抛裸 TypeError
    if (typeof shade !== 'number' || Number.isNaN(shade)) {
        return false
    }

    if (shade < 0 || shade > 9) {
        return false
    }

    return parseInt(shade.toString(), 10) === shade
}

/**
 * 验证 UI 主题对象是否符合规范
 * @param {UITheme} theme - 需要验证的 UI 主题对象
 * @throws {Error} 当主题的主颜色不在预设颜色列表中时抛出错误
 * @throws {Error} 当主题的主色调值无效时抛出错误
 * @asserts {theme is UITheme} 断言参数是有效的 UI 主题
 */
export function validateUITheme(theme: UITheme): asserts theme is UITheme {
    if (!Object.hasOwn(theme.colors, theme.primaryColor)) {
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
 * 合并两个 UI 主题对象，返回一个新的合并后的主题
 * @param {UITheme} currentTheme - 当前主题对象
 * @param {UIThemeOverride} [themeOverride] - 可选的要覆盖的主题对象
 * @returns {UITheme} 合并后的新主题对象
 * @throws 如果合并后的主题无效会抛出错误
 */
export function mergeUITheme(currentTheme: UITheme, themeOverride?: UIThemeOverride) {
    if (!themeOverride) {
        validateUITheme(currentTheme)
        return currentTheme
    }

    const result = deepMerge(currentTheme, themeOverride)

    // deepMerge 会把显式 undefined 当普通叶子值覆盖掉默认值，配置器类
    // （theme={{ primaryShade: maybeUndefined }}）会让 theme.primaryShade 变 undefined，
    // 随后 getPrimaryShade 读 .light 抛裸 TypeError 整页崩；显式 undefined 按未配置处理。
    if (result.primaryShade == null) {
        result.primaryShade = currentTheme.primaryShade
    }

    if (themeOverride.fontFamily && !themeOverride.headings?.fontFamily) {
        result.headings = { ...result.headings, fontFamily: themeOverride.fontFamily }
    }

    validateUITheme(result)
    return result
}
