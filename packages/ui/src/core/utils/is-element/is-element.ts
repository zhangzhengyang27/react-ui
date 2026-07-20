import { Fragment, isValidElement } from 'react'

/**
 * 检查给定值是否为有效的React元素
 * @param {any} value - 需要检查的值
 * @returns {boolean} 如果值是React元素(非数组、非null、非Fragment)则返回true，否则返回false
 */
export function isElement(value: any): value is React.ReactElement {
    if (Array.isArray(value) || value === null) {
        return false
    }

    if (isValidElement(value)) {
        return value.type !== Fragment
    }

    return false
}
