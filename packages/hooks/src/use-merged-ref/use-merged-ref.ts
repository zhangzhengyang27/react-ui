import { LegacyRef, useCallback, type MutableRefObject, type RefCallback } from 'react'

type PossibleRef<T> = LegacyRef<T> | undefined

type RefCleanup = (() => void) | void

/**
 * 将一个 ref 赋值为给定值，支持函数 ref 与对象 ref。
 * 对齐 ui assignRef。字符串 ref 不被支持，会被忽略。
 */
export function assignRef<T>(ref: PossibleRef<T>, value: T): RefCleanup {
    if (typeof ref === 'function') {
        return ref(value) as RefCleanup
    } else if (typeof ref === 'object' && ref !== null && 'current' in ref) {
        ;(ref as MutableRefObject<T | null>).current = value
    }
}

/**
 * 合并多个 ref 为单个 ref callback。
 * 对齐 ui mergeRefs，支持 React 19 ref cleanup。
 */
export function mergeRefs<T>(...refs: PossibleRef<T>[]): RefCallback<T> {
    const cleanupMap = new Map<PossibleRef<T>, () => void>()

    return (node: T | null) => {
        refs.forEach(ref => {
            const cleanup = assignRef(ref, node)
            if (typeof cleanup === 'function') {
                cleanupMap.set(ref, cleanup)
            }
        })

        if (cleanupMap.size > 0) {
            return () => {
                refs.forEach(ref => {
                    const cleanup = cleanupMap.get(ref)
                    if (typeof cleanup === 'function') {
                        cleanup()
                    } else {
                        assignRef(ref, null)
                    }
                })
                cleanupMap.clear()
            }
        }
    }
}

/**
 * 合并多个 ref 的 hook。
 * 当传入的 refs 变化时返回新的 callback，使 React 能正确调用 cleanup 并重新绑定事件。
 */
export function useMergedRef<T>(...refs: PossibleRef<T>[]) {
    return useCallback(mergeRefs(...refs), refs)
}
