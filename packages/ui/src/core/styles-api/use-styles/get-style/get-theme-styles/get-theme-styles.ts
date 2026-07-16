import { UITheme } from '../../../../UIProvider'
import { resolveStyles } from '../resolve-styles/resolve-styles'

interface GetThemeStylesOptions {
    theme: UITheme
    themeName: string[]
    props: Record<string, any>
    stylesCtx: Record<string, any> | undefined
    selector: string
}

/**
 * 根据主题名称获取对应的样式对象
 * @param {GetThemeStylesOptions} options - 包含主题和样式相关参数的对象
 * @param {object} options.theme - 主题对象
 * @param {string[]} options.themeName - 主题名称数组
 * @param {object} options.props - 组件属性
 * @param {object} options.stylesCtx - 样式上下文
 * @param {string} options.selector - 样式选择器
 * @returns {object} 合并后的样式对象
 */
export function getThemeStyles({ theme, themeName, props, stylesCtx, selector }: GetThemeStylesOptions) {
    return themeName
        .map(
            n =>
                resolveStyles({
                    theme,
                    styles: theme.components[n]?.styles,
                    props,
                    stylesCtx
                })[selector]
        )
        .reduce((acc, val) => ({ ...acc, ...val }), {})
}
