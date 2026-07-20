/**
 * 检查给定值是否为普通对象（非数组、非null）
 * @param {unknown} item - 需要检查的值
 * @returns {boolean} 如果是普通对象则返回true，否则返回false
 */
function isObject(item: unknown) {
    return item && typeof item === 'object' && !Array.isArray(item)
}

/**
 * 深度合并两个对象，递归处理嵌套对象属性
 * @param {T} target - 目标对象，将被合并到的基准对象
 * @param {any} source - 源对象，提供要合并的属性和值
 * @returns {T} 合并后的新对象，保持目标对象的类型
 * @template T 泛型参数，限定为对象类型
 */
export function deepMerge<T extends object>(target: T, source: any): T {
    const result: Record<string, any> = { ...target }
    const _source: Record<string, any> = source

    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach(key => {
            if (isObject(_source[key])) {
                if (!(key in target) || !isObject(result[key])) {
                    result[key] = _source[key]
                } else {
                    result[key] = deepMerge(result[key], _source[key])
                }
            } else {
                result[key] = _source[key]
            }
        })
    }

    return result as T
}
