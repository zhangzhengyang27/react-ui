/**
 * 将字符串的首字母转换为小写
 * @param {string} value - 需要转换的字符串
 * @returns {string} 首字母小写后的字符串，如果输入不是字符串则返回空字符串
 */
export function lowerFirst(value: string) {
    return typeof value !== 'string' ? '' : value.charAt(0).toLowerCase() + value.slice(1)
}
