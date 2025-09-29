/**
 * 将键名转换为带有 'data-' 前缀的格式
 * @param {string} key - 需要转换的键名
 * @returns {string} 转换后的键名（确保以 'data-' 开头）
 */
function transformModKey(key: string) {
    return key.startsWith('data-') ? key : `data-${key}`
}

/**
 * 转换对象属性为修饰符格式，过滤掉无效值
 * @param {Record<string, any>} props - 包含原始属性的对象
 * @returns {Record<string, any>} 转换后的修饰符对象，仅包含有效值
 */
export function getMod(props: Record<string, any>) {
    return Object.keys(props).reduce<Record<string, any>>((acc, key) => {
        const value = props[key]

        if (value === undefined || value === '' || value === false || value === null) {
            return acc
        }

        acc[transformModKey(key)] = props[key]
        return acc
    }, {})
}

/**
 * 根据输入的修饰符生成对应的数据属性对象
 * @param {any} [mod] - 可选的修饰符，可以是字符串、数组或对象
 * @returns {Record<string, any> | null} 生成的数据属性对象，如果输入为空则返回null
 * @description
 * - 当mod为字符串时，返回格式为 { 'data-${mod}': true } 的对象
 * - 当mod为数组时，递归处理每个元素并合并结果
 * - 当mod为对象时，调用getMod函数处理
 */
export function getBoxMod(mod?: any): Record<string, any> | null {
    if (!mod) {
        return null
    }

    if (typeof mod === 'string') {
        return { [transformModKey(mod)]: true }
    }

    if (Array.isArray(mod)) {
        return [...mod].reduce<Record<`data-${string}`, any>>((acc, value) => ({ ...acc, ...getBoxMod(value) }), {})
    }

    return getMod(mod)
}
