import { LegacyRef, Ref, useCallback, type MutableRefObject, type RefCallback } from 'react'

type PossibleRef<T> = LegacyRef<T> | undefined

/**
 * 将一个 ref 赋值为给定值，支持函数 ref 与对象 ref。
 * 对齐 mantine assignRef。字符串 ref 不被支持，会被忽略。
 */
export function assignRef<T>(ref: PossibleRef<T>, value: T) {
    if (typeof ref === 'function') {
        ref(value)
    } else if (typeof ref === 'object' && ref !== null && 'current' in ref) {
        ;(ref as MutableRefObject<T | null>).current = value
    }
}

/**
 * 合并多个 ref 为单个 ref callback。
 * 对齐 mantine mergeRefs。
 */
export function mergeRefs<T>(...refs: PossibleRef<T>[]): RefCallback<T> {
    return (node: T | null) => {
        refs.forEach(ref => {
            assignRef(ref, node)
        })
    }
}

/**
 * 合并多个 ref 的 hook，返回稳定的 callback。
 * 对齐 mantine useMergedRef。
 */
export function useMergedRef<T>(...refs: PossibleRef<T>[]) {
    return useCallback(mergeRefs(...refs), refs)
}
