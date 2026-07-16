/**
 * 生成带有指定前缀的随机ID字符串
 * @param {string} [prefix='ui-'] - 可选前缀，默认为'ui-'
 * @returns {string} 由前缀和随机字符串组成的ID
 */
export function randomId(prefix = 'ui-'): string {
    return `${prefix}${Math.random().toString(36).slice(2, 11)}`
}
