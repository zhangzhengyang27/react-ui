import type { MantineTheme } from '../../../../MantineProvider'
import type { _Styles } from '../get-style'

export interface ResolveStylesInput {
    theme: MantineTheme
    styles: _Styles | _Styles[]
    props: Record<string, any>
    stylesCtx: Record<string, any> | undefined
}

/**
 * 解析并合并样式对象或样式函数
 * @param {ResolveStylesInput} params - 样式解析的输入参数
 * @param {Theme} params.theme - 主题对象
 * @param {StyleType} params.styles - 样式对象或样式函数数组
 * @param {object} params.props - 组件属性
 * @param {object} [params.stylesCtx] - 样式上下文
 * @returns {Record<string, any>} 合并后的样式对象
 */
export function resolveStyles({ theme, styles, props, stylesCtx }: ResolveStylesInput) {
    const arrayStyles = Array.isArray(styles) ? styles : [styles]

    return arrayStyles.reduce<Record<string, any>>((acc, style) => {
        if (typeof style === 'function') {
            return { ...acc, ...style(theme, props, stylesCtx) }
        }

        return { ...acc, ...style }
    }, {})
}
