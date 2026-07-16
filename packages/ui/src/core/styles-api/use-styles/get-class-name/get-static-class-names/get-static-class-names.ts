interface GetStaticClassNamesInput {
    themeName: string[]
    selector: string
    classNamesPrefix: string
    withStaticClass?: boolean
}

/** Returns static component classes, for example, `.ui-Input-wrapper` */
/**
 * 根据输入参数生成静态类名数组
 * @param {Object} params - 输入参数对象
 * @param {string[]} params.themeName - 主题名称数组
 * @param {string} params.classNamesPrefix - 类名前缀
 * @param {string} params.selector - 选择器名称
 * @param {boolean} [params.withStaticClass=true] - 是否生成静态类名
 * @returns {string[]} 生成的静态类名数组，如果withStaticClass为false则返回空数组
 */
export function getStaticClassNames({
    themeName,
    classNamesPrefix,
    selector,
    withStaticClass
}: GetStaticClassNamesInput) {
    if (withStaticClass === false) {
        return []
    }

    return themeName.map(n => `${classNamesPrefix}-${n}-${selector}`)
}
