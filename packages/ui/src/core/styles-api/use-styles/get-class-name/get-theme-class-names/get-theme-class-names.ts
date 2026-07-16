import { UITheme } from '../../../../UIProvider'
import { resolveClassNames } from '../resolve-class-names/resolve-class-names'

interface GetThemeClassNamesOptions {
    theme: UITheme
    themeName: string[]
    selector: string
    props: Record<string, any>
    stylesCtx: Record<string, any> | undefined
}

/**
 * 根据主题名称获取对应的 CSS 类名
 * @param {GetThemeClassNamesOptions} options - 包含主题相关信息的选项对象
 * @param {string[]} options.themeName - 主题名称数组
 * @param {object} options.theme - 主题对象
 * @param {string} options.selector - 选择器名称
 * @param {object} options.props - 组件属性
 * @param {object} options.stylesCtx - 样式上下文
 * @returns {string[]} 解析后的 CSS 类名数组
 */
export function getThemeClassNames({ themeName, theme, selector, props, stylesCtx }: GetThemeClassNamesOptions) {
    return themeName.map(
        n =>
            resolveClassNames({
                theme,
                classNames: theme.components[n]?.classNames,
                props,
                stylesCtx
            })?.[selector]
    )
}
