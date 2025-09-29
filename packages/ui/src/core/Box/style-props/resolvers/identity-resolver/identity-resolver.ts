/**
 * 返回传入的原始值，不做任何转换
 * @param {unknown} value - 任意类型的输入值
 * @returns {unknown} 与输入值相同的输出值
 */
export function identityResolver(value: unknown) {
    return value
}
