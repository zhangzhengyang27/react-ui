import { GetStylesApiOptions } from '../../../styles-api.types'
import { resolveClassNames, ResolveClassNamesInput } from '../resolve-class-names/resolve-class-names'

interface GetOptionsClassNamesInput extends Omit<ResolveClassNamesInput, 'classNames'> {
    selector: string
    options: GetStylesApiOptions | undefined
}

/**
 * 根据输入参数解析并返回选项的类名
 * @param {GetOptionsClassNamesInput} params - 输入参数对象
 * @param {string} params.selector - 选择器名称
 * @param {object} params.stylesCtx - 样式上下文对象
 * @param {object} params.options - 选项配置对象
 * @param {object} params.props - 组件属性对象
 * @param {object} params.theme - 主题对象
 * @returns {string} 解析后的类名字符串
 */
export function getOptionsClassNames({ selector, stylesCtx, options, props, theme }: GetOptionsClassNamesInput) {
    return resolveClassNames({
        theme,
        classNames: options?.classNames,
        props: options?.props || props,
        stylesCtx
    })[selector]
}
