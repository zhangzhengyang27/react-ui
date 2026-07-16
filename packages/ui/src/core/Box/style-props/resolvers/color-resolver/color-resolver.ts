import { parseThemeColor, type UITheme } from '../../../../../core/UIProvider'

/**
 * 解析颜色值并返回对应的CSS变量或颜色值
 * @param {unknown} color - 需要解析的颜色值，可以是字符串、主题颜色名或其他格式
 * @param {UITheme} theme - UI主题对象，用于解析主题颜色
 * @returns {string} 解析后的CSS变量字符串或颜色值
 * @throws {Error} 如果颜色值无法解析可能会抛出错误
 */
export function colorResolver(color: unknown, theme: UITheme) {
    const parsedColor = parseThemeColor({ color, theme })

    if (parsedColor.color === 'dimmed') {
        return 'var(--ui-color-dimmed)'
    }

    if (parsedColor.color === 'bright') {
        return 'var(--ui-color-bright)'
    }

    return parsedColor.variable ? `var(${parsedColor.variable})` : parsedColor.color
}

/**
 * 解析并返回文本颜色值
 * @param {unknown} color - 颜色值，可以是主题颜色名称或具体颜色值
 * @param {UITheme} theme - UI主题对象
 * @returns {string} 解析后的颜色值，如果是主题颜色则返回对应的CSS变量，否则返回解析后的颜色值
 */
export function textColorResolver(color: unknown, theme: UITheme) {
    const parsedColor = parseThemeColor({ color, theme })

    if (parsedColor.isThemeColor && parsedColor.shade === undefined) {
        return `var(--ui-color-${parsedColor.color}-text)`
    }
    return colorResolver(color, theme)
}
