interface GetSelectorClassNameInput {
    selector: string
    classes: Record<string, string>
    unstyled: boolean | undefined
}

/** Returns class for given selector from library styles (`*.module.css`) */
/**
 * 根据选择器获取对应的样式类名
 * @param {GetSelectorClassNameInput} params - 输入参数对象
 * @param {string} params.selector - 样式选择器名称
 * @param {Record<string, string>} params.classes - 样式类名映射表
 * @param {boolean} [params.unstyled] - 是否禁用样式
 * @returns {string|undefined} 返回对应的样式类名，如果禁用样式则返回undefined
 */
export function getSelectorClassName({ selector, classes, unstyled }: GetSelectorClassNameInput) {
    return unstyled ? undefined : classes[selector]
}
