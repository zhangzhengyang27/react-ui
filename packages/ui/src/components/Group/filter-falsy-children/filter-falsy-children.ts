import { Children, ReactElement, ReactNode } from 'react'

/**
 * 过滤掉 falsy 子节点（null/undefined/false/true），保留有效元素与文本。
 * 对齐 ui filterFalsyChildren。
 */
export function filterFalsyChildren(children: ReactNode) {
    return Children.toArray(children).filter(child => {
        const item = child as ReactNode | boolean
        return item !== null && item !== undefined && item !== false && item !== true
    }) as ReactElement[]
}
