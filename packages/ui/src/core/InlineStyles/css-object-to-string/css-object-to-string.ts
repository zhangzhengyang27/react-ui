import { camelToKebabCase, keys } from '../../utils'

/**
 * 将 React CSSProperties 对象转换为 CSS 字符串
 * @param {React.CSSProperties} css - React 样式对象
 * @returns {string} 转换后的 CSS 样式字符串
 */
export function cssObjectToString(css: React.CSSProperties) {
    return keys(css)
        .reduce(
            (acc: string, rule: keyof React.CSSProperties) =>
                css[rule] !== undefined ? `${acc}${camelToKebabCase(rule)}:${css[rule]};` : acc,
            ''
        )
        .trim()
}
