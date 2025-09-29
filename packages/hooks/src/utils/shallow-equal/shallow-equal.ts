/**
 * 浅比较两个对象是否相等（只比较第一层属性）
 * @param {any} a - 第一个比较对象
 * @param {any} b - 第二个比较对象
 * @returns {boolean} 如果两个对象浅层相等则返回true，否则返回false
 * @description 比较规则：
 * 1. 严格相等(===)直接返回true
 * 2. 两个NaN值视为相等
 * 3. 非对象类型直接返回false
 * 4. 比较对象自身可枚举属性的数量和值
 */
export function shallowEqual(a: any, b: any) {
    if (a === b) {
        return true
    }

    if (Number.isNaN(a) && Number.isNaN(b)) {
        return true
    }

    if (!(a instanceof Object) || !(b instanceof Object)) {
        return false
    }

    const keys = Object.keys(a)
    const { length } = keys

    if (length !== Object.keys(b).length) {
        return false
    }

    for (let i = 0; i < length; i += 1) {
        const key = keys[i]

        if (!(key in b)) {
            return false
        }

        if (a[key] !== b[key] && !(Number.isNaN(a[key]) && Number.isNaN(b[key]))) {
            return false
        }
    }

    return true
}
