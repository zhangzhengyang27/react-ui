import { CSSProperties, useMemo } from 'react'
import type { UIStyleProp } from '../../Box'
import { FactoryPayload } from '../../factory'
import {
    useUIClassNamesPrefix,
    useUIIsHeadless,
    useUITheme,
    useUIWithStaticClasses
} from '../../UIProvider'
import { PartialVarsResolver, VarsResolver } from '../create-vars-resolver/create-vars-resolver'
import { Attributes, ClassNames, ClassNamesArray, GetStylesApiOptions, Styles } from '../styles-api.types'
import { getClassName } from './get-class-name/get-class-name'
import { getStyle } from './get-style/get-style'
import { useStylesTransform } from './use-transformed-styles'

export interface UseStylesInput<Payload extends FactoryPayload> {
    name: string | (string | undefined)[]
    classes: Payload['stylesNames'] extends string ? Record<string, string> : never
    props: Payload['props']
    stylesCtx?: Payload['ctx']
    className?: string
    style?: UIStyleProp
    rootSelector?: Payload['stylesNames']
    unstyled?: boolean
    classNames?: ClassNames<Payload> | ClassNamesArray<Payload>
    styles?: Styles<Payload>
    vars?: PartialVarsResolver<Payload>
    varsResolver?: VarsResolver<Payload>
    attributes?: Attributes<Payload>
}

export type GetStylesApi<Payload extends FactoryPayload> = (
    selector: NonNullable<Payload['stylesNames']>,
    options?: GetStylesApiOptions
) => {
    className: string
    style: CSSProperties
}

/**
 * 根据提供的样式配置生成样式API
 * @template Payload 样式工厂的载荷类型
 * @param {object} options - 样式配置选项
 * @param {string|string[]} options.name - 主题名称或名称数组
 * @param {Record<string, string>} options.classes - 基础CSS类集合
 * @param {object} options.props - 组件属性
 * @param {object} [options.stylesCtx] - 样式上下文
 * @param {string} [options.className] - 附加的CSS类名
 * @param {React.CSSProperties} [options.style] - 内联样式对象
 * @param {NonNullable<Payload['stylesNames']>} [options.rootSelector='root'] - 根选择器名称
 * @param {boolean} [options.unstyled] - 是否禁用样式
 * @param {Record<string, string>} [options.classNames] - 自定义类名映射
 * @param {Record<string, React.CSSProperties>} [options.styles] - 自定义样式映射
 * @param {object} [options.vars] - CSS变量定义
 * @param {Function} [options.varsResolver] - CSS变量解析器
 * @param {Record<string, object>} [options.attributes] - 附加属性映射
 * @returns {GetStylesApi<Payload>} 返回一个函数，该函数接收选择器并返回对应的样式API对象
 */
export function useStyles<Payload extends FactoryPayload>({
    name,
    classes,
    props,
    stylesCtx,
    className,
    style,
    rootSelector = 'root' as NonNullable<Payload['stylesNames']>,
    unstyled,
    classNames,
    styles,
    vars,
    varsResolver,
    attributes
}: UseStylesInput<Payload>): GetStylesApi<Payload> {
    const theme = useUITheme()
    const classNamesPrefix = useUIClassNamesPrefix()
    const withStaticClasses = useUIWithStaticClasses()
    const headless = useUIIsHeadless()
    const themeName = useMemo(() => (Array.isArray(name) ? name : [name]).filter(n => n) as string[], [name])
    const { withStylesTransform, getTransformedStyles } = useStylesTransform({
        props,
        stylesCtx,
        themeName
    })

    // 同一次渲染内按选择器缓存解析结果：getStyles 每次都重跑 varsResolver / 主题 vars /
    // filterProps 与 8 个 className 辅助函数，而 DataTable 这类组件每行每格都会重复请求
    // 同一批选择器（tr、td……），虚拟滚动下等于每帧重复解析上百次。
    // 仅对不带 options 的调用生效——带 options 时结果依赖 options，不适合按选择器复用。
    const resolvedOncePerSelector = new Map<string, ReturnType<typeof computeStyles>>()

    function computeStyles(selector: string, options?: GetStylesApiOptions) {
        return {
            className: getClassName({
                theme,
                options,
                themeName,
                selector,
                classNamesPrefix,
                classNames,
                classes,
                unstyled,
                className,
                rootSelector,
                props,
                stylesCtx,
                withStaticClasses,
                headless,
                transformedStyles: getTransformedStyles([options?.styles, styles])
            }),

            style: getStyle({
                theme,
                themeName,
                selector,
                options,
                props,
                stylesCtx,
                rootSelector,
                styles,
                style,
                vars,
                varsResolver,
                headless,
                withStylesTransform
            }),

            ...attributes?.[selector as keyof typeof attributes]
        }
    }

    return (selector: string, options?: GetStylesApiOptions) => {
        if (options) {
            return computeStyles(selector, options)
        }

        const cached = resolvedOncePerSelector.get(selector)
        if (cached) {
            return cached
        }

        const computed = computeStyles(selector)
        resolvedOncePerSelector.set(selector, computed)
        return computed
    }
}
