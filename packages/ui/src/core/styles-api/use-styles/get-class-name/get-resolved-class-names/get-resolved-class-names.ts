import { resolveClassNames, ResolveClassNamesInput } from '../resolve-class-names/resolve-class-names'

interface GetResolvedClassNamesOptions extends ResolveClassNamesInput {
    selector: string
}

/**
 * 根据提供的选项解析并返回指定选择器对应的类名
 * @param {GetResolvedClassNamesOptions} options - 包含解析类名所需参数的选项对象
 * @param {string} options.selector - 要获取的类名选择器
 * @param {object} options.stylesCtx - 样式上下文对象
 * @param {object} options.theme - 主题对象
 * @param {object} options.classNames - 类名映射对象
 * @param {object} options.props - 组件属性对象
 * @returns {string} 解析后的类名字符串
 */
export function getResolvedClassNames({ selector, stylesCtx, theme, classNames, props }: GetResolvedClassNamesOptions) {
    return resolveClassNames({ theme, classNames, props, stylesCtx })[selector]
}
