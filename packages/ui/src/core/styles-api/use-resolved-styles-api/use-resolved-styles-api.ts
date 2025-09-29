import { FactoryPayload } from '../../factory'
import { useMantineTheme } from '../../MantineProvider'
import { ClassNames, Styles } from '../styles-api.types'
import { resolveClassNames } from '../use-styles/get-class-name/resolve-class-names/resolve-class-names'
import { resolveStyles } from '../use-styles/get-style/resolve-styles/resolve-styles'

/**
 * 定义用于解析样式API的输入参数接口
 * @template Payload 扩展自FactoryPayload的泛型类型
 * @param classNames 可选的类名对象，类型为ClassNames<Payload>
 * @param styles 可选的样式对象，类型为Styles<Payload>
 * @param props 包含任意属性的props对象
 * @param stylesCtx 可选的样式上下文对象
 */
export interface UseResolvedStylesApiInput<Payload extends FactoryPayload> {
    classNames: ClassNames<Payload> | undefined
    styles: Styles<Payload> | undefined
    props: Record<string, any>
    stylesCtx?: Record<string, any>
}

/**
 * 解析并返回样式API相关的类名和样式对象
 * @template Payload 工厂负载类型
 * @param {Object} params - 输入参数对象
 * @param {Object} params.classNames - 需要解析的类名对象
 * @param {Object} params.styles - 需要解析的样式对象
 * @param {Object} params.props - 组件属性
 * @param {Object} [params.stylesCtx] - 样式上下文
 * @returns {Object} 包含解析后类名和样式的对象
 * @property {Object} resolvedClassNames - 解析后的类名对象
 * @property {Object} resolvedStyles - 解析后的样式对象
 */
export function useResolvedStylesApi<Payload extends FactoryPayload>({
    classNames,
    styles,
    props,
    stylesCtx
}: UseResolvedStylesApiInput<Payload>) {
    const theme = useMantineTheme()

    return {
        resolvedClassNames: resolveClassNames({
            theme,
            classNames,
            props,
            stylesCtx: stylesCtx || undefined
        }),

        resolvedStyles: resolveStyles({
            theme,
            styles,
            props,
            stylesCtx: stylesCtx || undefined
        })
    }
}
