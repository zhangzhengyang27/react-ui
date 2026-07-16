import type { UITheme } from '../../UIProvider'
import type { UIStyleProp } from '../Box.types'

/**
 * 将 UI 样式属性转换为 React CSS 属性对象
 * @param {UIStyleProp | undefined} style - 可以是数组、函数或普通样式对象
 * @param {UITheme} theme - UI 主题对象
 * @returns {React.CSSProperties} 转换后的 React CSS 属性对象
 */
export function getStyleObject(style: UIStyleProp | undefined, theme: UITheme): React.CSSProperties {
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
