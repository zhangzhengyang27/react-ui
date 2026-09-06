import { useCallback, useRef, useState } from 'react'

/**
 * 将 React state 与 Set 行为结合的 Hook。
 * 返回的 Set 支持 add / delete / clear，并会触发重新渲染。
 *
 * @param values 初始值数组
 * @returns 响应式 Set 实例
 *
 * @remarks
 * **⚠️ 实现细节警告（E1 决策）**:
 * - 返回的 Set 实例的 `add`/`clear`/`delete` 方法被覆盖为**实例自有属性**（own properties）
 *   以便在调用时触发 React 重渲染。
 * - 副作用：
 *   - `Object.keys(set)` 会返回 `['add', 'clear', 'delete']` 而非空数组
 *   - `structuredClone(set)` / `{...set}` / lodash `_.clone` 等浅拷贝会复制这些自有属性
 *   - `JSON.stringify(set)` 序列化时这些方法会出现在 `for...in` 中
 * - **不应直接序列化或克隆返回的 Set 实例**。若需克隆,先 `new Set(originalSet)` 复制为纯 Set。
 * - 此实现为响应式 Set 的参考实现,方法覆写属已知设计权衡。
 *
 * **性能说明**：方法覆写通过 `useCallback` 稳定化（不再每次渲染重新赋值），
 * 重渲染由独立的版本号 state 触发；`add` 内部始终操作同一个 Set 引用（`setRef.current`），
 * 仅在 mutation 后通过版本号 + 1 触发渲染，避免每次都 `new Set()` 深拷贝整表。
 */
export function useSet<T>(values?: T[]): Set<T> {
    const setRef = useRef<Set<T> | null>(null)
    if (setRef.current === null) {
        setRef.current = new Set(values)
    }
    const set = setRef.current

    const [, setVersion] = useState(0)
    const bump = useCallback(() => setVersion(v => v + 1), [])

    const add = useCallback(
        (...args: [T]) => {
            const result = Set.prototype.add.apply(setRef.current, args)
            bump()
            return result
        },
        [bump]
    )

    const clear = useCallback(() => {
        Set.prototype.clear.apply(setRef.current)
        bump()
    }, [bump])

    const del = useCallback(
        (...args: [T]) => {
            const result = Set.prototype.delete.apply(setRef.current, args)
            bump()
            return result
        },
        [bump]
    )

    set.add = add as Set<T>['add']
    set.clear = clear as Set<T>['clear']
    set.delete = del as Set<T>['delete']

    return set
}

export namespace useSet {
    export type ReturnValue<T> = Set<T>
}
