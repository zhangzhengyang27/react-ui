import type { MantineTheme } from '../../../core/MantineProvider'
import type { CssVarsProp, MantineStyleProp } from '../Box.types'

interface GetBoxStyleOptions {
    theme: MantineTheme
    styleProps: React.CSSProperties
    style?: MantineStyleProp
    vars?: CssVarsProp
}

/**
 * 合并多种样式定义为一个标准的React CSS属性对象
 * @param {MantineStyleProp | CssVarsProp | undefined} styles - 需要合并的样式，可以是数组、函数或对象
 * @param {MantineTheme} theme - Mantine主题对象，用于解析函数类型的样式
 * @returns {React.CSSProperties} 合并后的CSS样式对象
 */
function mergeStyles(styles: MantineStyleProp | CssVarsProp | undefined, theme: MantineTheme): React.CSSProperties {
    if (Array.isArray(styles)) {
        return [...styles].reduce<Record<string, any>>((acc, item) => ({ ...acc, ...mergeStyles(item, theme) }), {})
    }

    if (typeof styles === 'function') {
        return styles(theme)
    }

    if (styles == null) {
        return {}
    }

    return styles
}

/**
 * 合并主题样式、自定义样式和变量样式，生成最终的CSS属性对象
 * @param {GetBoxStyleOptions} options - 样式配置选项
 * @param {React.CSSProperties} [options.theme] - 主题基础样式
 * @param {React.CSSProperties} [options.style] - 自定义样式
 * @param {React.CSSProperties} [options.vars] - CSS变量样式
 * @param {React.CSSProperties} [options.styleProps] - 内联样式属性
 * @returns {React.CSSProperties} 合并后的CSS样式对象
 */
export function getBoxStyle({ theme, style, vars, styleProps }: GetBoxStyleOptions): React.CSSProperties {
    const _style = mergeStyles(style, theme)
    const _vars = mergeStyles(vars, theme)
    return { ..._style, ..._vars, ...styleProps }
}
