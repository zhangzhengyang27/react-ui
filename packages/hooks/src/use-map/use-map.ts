import { useCallback, useRef, useState } from 'react'

/**
 * 将 React state 与 Map 行为结合的 Hook。
 * 返回的 Map 支持 set / delete / clear，并会触发重新渲染。
 *
 * @param initialState 初始键值对数组
 * @returns 响应式 Map 实例
 *
 * @remarks
 * **⚠️ 实现细节警告（E1 决策）**:
 * - 返回的 Map 实例的 `set`/`clear`/`delete` 方法被覆盖为**实例自有属性**（own properties）
 *   以便在调用时触发 React 重渲染。
 * - 副作用：
 *   - `Object.keys(map)` 会返回 `['set', 'clear', 'delete']` 而非空数组
 *   - `structuredClone(map)` / `{...map}` / lodash `_.clone` 等浅拷贝会复制这些自有属性
 *   - `JSON.stringify(map)` 序列化时这些方法会出现在 `for...in` 中
 * - **不应直接序列化或克隆返回的 Map 实例**。若需克隆,先 `new Map(originalMap)` 复制为纯 Map。
 * - 此实现为响应式 Map 的参考实现,方法覆写属已知设计权衡。
 *
 * **性能说明**：方法覆写通过 `useCallback` 稳定化（不再每次渲染重新赋值），
 * 重渲染由独立的版本号 state 触发；`set` 内部始终操作同一个 Map 引用（`mapRef.current`），
 * 仅在 mutation 后通过版本号 + 1 触发渲染，避免每次都 `new Map()` 深拷贝整表。
 */
export function useMap<T, V>(initialState?: [T, V][]): Map<T, V> {
    const mapRef = useRef<Map<T, V> | null>(null)
    if (mapRef.current === null) {
        mapRef.current = new Map<T, V>(initialState)
    }
    const map = mapRef.current

    // 版本号驱动重渲染，避免每次 set 都 new Map 深拷贝
    const [, setVersion] = useState(0)
    const bump = useCallback(() => setVersion(v => v + 1), [])

    const set = useCallback(
        (...args: [T, V]) => {
            Map.prototype.set.apply(mapRef.current, args)
            bump()
            return mapRef.current
        },
        [bump]
    )

    const clear = useCallback(() => {
        Map.prototype.clear.apply(mapRef.current)
        bump()
    }, [bump])

    const del = useCallback(
        (...args: [T]) => {
            const result = Map.prototype.delete.apply(mapRef.current, args)
            bump()
            return result
        },
        [bump]
    )

    // 覆盖为实例自有属性（与上游 useMap 语义一致）
    map.set = set as Map<T, V>['set']
    map.clear = clear as Map<T, V>['clear']
    map.delete = del as Map<T, V>['delete']

    return map
}

export namespace useMap {
    export type ReturnValue<T, V> = Map<T, V>
}
