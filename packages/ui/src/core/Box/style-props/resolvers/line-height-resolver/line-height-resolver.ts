import type { MantineTheme } from '../../../../../core/MantineProvider'

const headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']

/**
 * 解析行高值，根据主题配置返回对应的CSS变量或原始值
 * @param {unknown} value - 需要解析的行高值，可以是字符串或其它类型
 * @param {MantineTheme} theme - Mantine主题对象，包含行高配置
 * @returns {string|unknown} 如果value是主题中定义的行高键名，返回对应的CSS变量；如果是标题类型，返回标题行高变量；否则返回原始值
 */
export function lineHeightResolver(value: unknown, theme: MantineTheme) {
    if (typeof value === 'string' && value in theme.lineHeights) {
        return `var(--ui-line-height-${value})`
    }

    if (typeof value === 'string' && headings.includes(value)) {
        return `var(--ui-${value}-line-height)`
    }

    return value
}
