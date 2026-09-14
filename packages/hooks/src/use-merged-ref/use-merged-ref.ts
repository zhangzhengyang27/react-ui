import React, { LegacyRef, useCallback, useRef, type MutableRefObject, type RefCallback } from 'react'

// React 19 introduced official ref cleanup support; returning a cleanup function in React 18 logs a dev warning.
const SUPPORTS_REF_CLEANUP = typeof React !== 'undefined' && React.version?.startsWith('19.') === true

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
            if (SUPPORTS_REF_CLEANUP && typeof cleanup === 'function') {
                cleanupMap.set(ref, cleanup)
            }
        })

        if (SUPPORTS_REF_CLEANUP && cleanupMap.size > 0) {
            return () => {
                refs.forEach(ref => {
                    const cleanup = cleanupMap.get(ref)
                    if (typeof cleanup === 'function') {
                        cleanup()
                    } else if (typeof ref === 'object' && ref !== null && 'current' in ref) {
                        assignRef(ref, null)
                    } else if (typeof ref === 'function') {
                        // 该函数 ref 未返回 cleanup：React 19 不再自动调用 ref(null)，
                        // 这里补齐 18 语义，避免函数 ref 滞留已分离节点
                        ;(ref as (value: T | null) => void)(null)
                    }
                })
                cleanupMap.clear()
            }
        }
    }
}

/**
 * 合并多个 ref 的 hook。
 * 返回稳定的 callback，避免传入的 refs  identity 变化时 React 反复调用旧/新 ref 触发 setState 循环。
 * 通过 ref 访问最新的 refs，支持 React 19 ref cleanup。
 */
export function useMergedRef<T>(...refs: PossibleRef<T>[]) {
    const refsRef = useRef(refs)
    refsRef.current = refs

    return useCallback((node: T | null) => {
        const cleanupMap = new Map<PossibleRef<T>, () => void>()

        refsRef.current.forEach(ref => {
            const cleanup = assignRef(ref, node)
            if (SUPPORTS_REF_CLEANUP && typeof cleanup === 'function') {
                cleanupMap.set(ref, cleanup)
            }
        })

        if (!SUPPORTS_REF_CLEANUP) {
            return
        }

        return () => {
            refsRef.current.forEach(ref => {
                const cleanup = cleanupMap.get(ref)
                if (typeof cleanup === 'function') {
                    cleanup()
                } else if (typeof ref === 'object' && ref !== null && 'current' in ref) {
                    // Only null out object refs during cleanup; calling function refs
                    // (especially React dispatchSetState used as ref) with null during
                    // commit/deletion can schedule state updates and trigger infinite loops.
                    assignRef(ref, null)
                } else if (typeof ref === 'function') {
                    // 未返回 cleanup 的函数 ref：补齐 null 调用，避免滞留已分离节点
                    ;(ref as (value: T | null) => void)(null)
                }
            })
            cleanupMap.clear()
        }
    }, []) // stable callback
}
