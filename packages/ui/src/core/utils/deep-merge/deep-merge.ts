/**
 * 检查给定值是否为普通对象（非数组、非null）
 * @param {unknown} item - 需要检查的值
 * @returns {boolean} 如果是普通对象则返回true，否则返回false
 */
function isObject(item: unknown): item is Record<string, unknown> {
    return Boolean(item) && typeof item === 'object' && !Array.isArray(item)
}

/** 深度 Partial：将对象的所有嵌套属性都变为可选 */
type DeepPartial<T> = T extends object ? { [K in keyof T]?: DeepPartial<T[K]> } : T

/**
 * 深度合并两个对象，递归处理嵌套对象属性。
 * 通过 WeakSet 检测循环引用，避免主题对象含环时栈溢出。
 * @param {T} target - 目标对象，将被合并到的基准对象
 * @param {DeepPartial<T> | undefined} source - 源对象，提供要合并的属性和值（支持深度 partial；undefined 表示无覆盖，返回 target 本身）
 * @returns {T} 合并后的新对象，保持目标对象的类型
 * @template T 泛型参数，限定为对象类型
 */
export function deepMerge<T extends object>(target: T, source?: DeepPartial<T>): T {
    if (source === undefined) {
        return target
    }
    const seen = new WeakSet<object>()
    return deepMergeInternal(target, source, seen)
}

function deepMergeInternal<T extends object>(target: T, source: DeepPartial<T>, seen: WeakSet<object>): T {
    // 循环引用检测：若 source 已被本次合并访问过，直接返回 target 的浅拷贝，中断递归
    if (isObject(source) && seen.has(source)) {
        return { ...target }
    }
    if (isObject(source)) {
        seen.add(source)
    }

    const result: Record<string, unknown> = { ...(target as Record<string, unknown>) }
    const _source: Record<string, unknown> = source as Record<string, unknown>

    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach(key => {
            if (isObject(_source[key])) {
                if (!(key in target) || !isObject(result[key])) {
                    result[key] = _source[key]
                } else {
                    result[key] = deepMergeInternal(result[key] as object, _source[key] as object, seen)
                }
            } else {
                result[key] = _source[key]
            }
        })
    }

    return result as T
}
