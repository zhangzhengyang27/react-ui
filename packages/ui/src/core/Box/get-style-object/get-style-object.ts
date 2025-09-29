import type { MantineTheme } from '../../MantineProvider'
import type { MantineStyleProp } from '../Box.types'

/**
 * 将 Mantine 样式属性转换为 React CSS 属性对象
 * @param {MantineStyleProp | undefined} style - 可以是数组、函数或普通样式对象
 * @param {MantineTheme} theme - Mantine 主题对象
 * @returns {React.CSSProperties} 转换后的 React CSS 属性对象
 */
export function getStyleObject(style: MantineStyleProp | undefined, theme: MantineTheme): React.CSSProperties {
    if (Array.isArray(style)) {
        return [...style].reduce<Record<string, any>>((acc, item) => ({ ...acc, ...getStyleObject(item, theme) }), {})
    }

    if (typeof style === 'function') {
        return style(theme)
    }

    if (style == null) {
        return {}
    }

    return style
}
