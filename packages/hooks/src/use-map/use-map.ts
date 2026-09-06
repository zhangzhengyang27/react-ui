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
 * 方法覆写通过 `useCallback` 稳定化；每次 mutation 生成新 Map 实例驱动重渲染，
 * 保证 `map` 引用随内容变更而变化（useEffect/memo 等依赖引用相等性的消费方才能正确感知更新）。
 */
export function useMap<T, V>(initialState?: [T, V][]): Map<T, V> {
    // 每次变更生成新 Map 并作为返回值：保证 map 引用随变更变化，
    // 依赖引用相等性的 useEffect / memo 消费方才能正确感知更新（与 Mantine 上游契约一致）
    const [map, setMap] = useState(() => new Map<T, V>(initialState))
    const mapRef = useRef(map)
    mapRef.current = map

    const set = useCallback((...args: [T, V]) => {
        Map.prototype.set.apply(mapRef.current, args)
        // 同步推进 ref：同一事件批次内连续 mutation 基于最新实例，且每次都产出新引用
        const next = new Map(mapRef.current!)
        mapRef.current = next
        setMap(next)
        return next
    }, [])

    const clear = useCallback(() => {
        Map.prototype.clear.apply(mapRef.current)
        const next = new Map(mapRef.current!)
        mapRef.current = next
        setMap(next)
    }, [])

    const del = useCallback((...args: [T]) => {
        const result = Map.prototype.delete.apply(mapRef.current, args)
        const next = new Map(mapRef.current!)
        mapRef.current = next
        setMap(next)
        return result
    }, [])

    // 覆盖为实例自有属性（与上游 useMap 语义一致）
    map.set = set as Map<T, V>['set']
    map.clear = clear as Map<T, V>['clear']
    map.delete = del as Map<T, V>['delete']

    return map
}

export namespace useMap {
    export type ReturnValue<T, V> = Map<T, V>
}
