import { useMantineStylesTransform, useMantineTheme } from '../../MantineProvider'

interface UseTransformedStylesInput {
    props: Record<string, any>
    stylesCtx: Record<string, any> | undefined
    themeName: string[]
}

/**
 * 根据给定的样式转换函数对样式进行转换处理
 * @param {UseTransformedStylesInput} params - 转换参数对象
 * @param {object} params.props - 组件属性
 * @param {object} params.stylesCtx - 样式上下文
 * @param {string[]} params.themeName - 主题名称数组
 * @returns {object} 包含转换后样式和转换标志的对象
 * @property {function} getTransformedStyles - 获取转换后的样式函数
 * @property {boolean} withStylesTransform - 是否应用了样式转换
 */
export function useStylesTransform({ props, stylesCtx, themeName }: UseTransformedStylesInput) {
    const theme = useMantineTheme()
    const stylesTransform = useMantineStylesTransform()?.()

    const getTransformedStyles = (styles: any[]) => {
        if (!stylesTransform) {
            return []
        }

        const transformedStyles = styles.map(style => stylesTransform(style, { props, theme, ctx: stylesCtx }))

        return [
            ...transformedStyles,
            ...themeName.map(n => stylesTransform(theme.components[n]?.styles, { props, theme, ctx: stylesCtx }))
        ].filter(Boolean) as Record<string, string>[]
    }

    return {
        getTransformedStyles,
        withStylesTransform: !!stylesTransform
    }
}
