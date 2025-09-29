type FilterPropsRes<T extends Record<string, any>> = {
    [Key in keyof T]-?: T[Key] extends undefined ? never : T[Key]
}

/**
 * 过滤掉对象中值为 undefined 的属性，返回一个新对象
 * @template T - 原始对象的类型
 * @param {T} props - 包含可能为 undefined 值的原始对象
 * @returns {FilterPropsRes<T>} 过滤后的新对象，不包含 undefined 值的属性
 */
export function filterProps<T extends Record<string, any>>(props: T) {
    return Object.keys(props).reduce<FilterPropsRes<T>>((acc, key: keyof T) => {
        if (props[key] !== undefined) {
            acc[key] = props[key]
        }
        return acc
    }, {} as FilterPropsRes<T>)
}
