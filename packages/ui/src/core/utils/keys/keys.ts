/**
 * 获取对象的所有键名数组
 * @template T - 对象类型
 * @template K - 对象键类型
 * @param {T} object - 要获取键名的对象
 * @returns {K[]} 对象键名组成的数组
 */
export function keys<T extends object, K extends keyof T>(object: T): K[] {
    return Object.keys(object) as K[]
}
