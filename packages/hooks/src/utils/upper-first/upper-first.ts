/**
 * 将字符串的首字母转换为大写
 * @param {string} value - 需要转换的字符串
 * @returns {string} 首字母大写的字符串，如果输入不是字符串则返回空字符串
 */
export function upperFirst(value: string) {
    return typeof value !== 'string' ? '' : value.charAt(0).toUpperCase() + value.slice(1)
}
