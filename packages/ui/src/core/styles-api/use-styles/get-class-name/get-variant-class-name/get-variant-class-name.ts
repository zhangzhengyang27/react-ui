import { GetStylesApiOptions } from '../../../styles-api.types'

interface GetVariantClassNameInput {
    options: GetStylesApiOptions | undefined
    classes: Record<string, string>
    selector: string
    unstyled: boolean | undefined
}

/**
 * 根据输入参数获取变体类名
 * @param {GetVariantClassNameInput} params - 输入参数对象
 * @param {Object} params.options - 包含变体选项的对象
 * @param {Object} params.classes - 类名映射对象
 * @param {string} params.selector - 选择器前缀
 * @param {boolean} params.unstyled - 是否不使用样式
 * @returns {string|undefined} 生成的变体类名，若无变体或unstyled为true则返回undefined
 */
export function getVariantClassName({ options, classes, selector, unstyled }: GetVariantClassNameInput) {
    return options?.variant && !unstyled ? classes[`${selector}--${options.variant}`] : undefined
}
