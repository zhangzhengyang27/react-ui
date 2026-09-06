/**
 * 检查给定值是否为普通对象（原型为 Object.prototype 或 null，且非数组）
 * Date/RegExp/File 等异型对象不算普通对象，作为叶子值处理，避免被递归腐蚀成 {}
 * @param {unknown} item - 需要检查的值
 * @returns {boolean} 如果是普通对象则返回true，否则返回false
 */
function isPlainObject(item: unknown): item is Record<string, unknown> {
    if (item === null || typeof item !== 'object' || Array.isArray(item)) {
        return false
    }
    const proto = Object.getPrototypeOf(item)
    return proto === Object.prototype || proto === null
}

/** 深度 Partial：将对象的所有嵌套属性都变为可选 */
type DeepPartial<T> = T extends object ? { [K in keyof T]?: DeepPartial<T[K]> } : T

/**
 * 深度合并两个对象，递归处理嵌套对象属性。
 * 通过 WeakSet 路径记法检测循环引用（进入递归前登记、返回后注销），
 * 同一对象的多次非循环引用（DAG）不会被误判为环。
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
    // 循环引用检测：若 source 已在当前合并路径上，直接返回 target 的浅拷贝，中断递归
    if (isPlainObject(source) && seen.has(source)) {
        return { ...target }
    }

    const result: Record<string, unknown> = { ...(target as Record<string, unknown>) }
    const _source: Record<string, unknown> = source as Record<string, unknown>

    if (isPlainObject(target) && isPlainObject(source)) {
        seen.add(source)
        Object.keys(_source).forEach(key => {
            if (isPlainObject(_source[key])) {
                if (!isPlainObject(result[key])) {
                    result[key] = _source[key]
                } else {
                    result[key] = deepMergeInternal(result[key] as object, _source[key] as object, seen)
                }
            } else {
                // 数组做浅拷贝，避免合并结果与 source 共享引用
                result[key] = Array.isArray(_source[key]) ? [...(_source[key] as unknown[])] : _source[key]
            }
        })
        seen.delete(source)
    }

    return result as T
}
