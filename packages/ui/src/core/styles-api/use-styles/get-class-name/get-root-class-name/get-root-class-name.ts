interface GetRootClassNameInput {
    rootSelector: string
    selector: string
    className: string | undefined
}

/**
 * 根据输入参数判断并返回根元素的类名
 * @param {GetRootClassNameInput} params - 输入参数对象
 * @param {string} params.rootSelector - 根元素选择器
 * @param {string} params.selector - 当前元素选择器
 * @param {string} params.className - 要应用的类名
 * @returns {string|undefined} 如果当前元素是根元素则返回类名，否则返回undefined
 */
export function getRootClassName({ rootSelector, selector, className }: GetRootClassNameInput) {
    return rootSelector === selector ? className : undefined
}
