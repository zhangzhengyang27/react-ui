import { LegacyRef, useRef, type MutableRefObject, type RefCallback } from 'react'

type PossibleRef<T> = LegacyRef<T> | undefined

type RefCleanup = (() => void) | void

/**
 * 将一个 ref 赋值为给定值，支持函数 ref 与对象 ref。
 * 对齐 mantine assignRef。字符串 ref 不被支持，会被忽略。
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
 * 对齐 mantine mergeRefs，支持 React 19 ref cleanup。
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
 * 合并多个 ref 的 hook，返回稳定的 callback。
 * 使用 useRef 持有最新的 refs 数组，避免 useCallback 依赖数组每次渲染都变化，
 * 从而保证返回的 callback 引用稳定（React 19 中 ref callback 不稳定会触发 cleanup 循环）。
 */
export function useMergedRef<T>(...refs: PossibleRef<T>[]) {
    const refsRef = useRef(refs)
    refsRef.current = refs

    const callback = useRef<RefCallback<T> | null>(null)
    if (callback.current === null) {
        callback.current = (node: T | null) => {
            refsRef.current.forEach(ref => {
                assignRef(ref, node)
            })
        }
    }
    return callback.current
}
