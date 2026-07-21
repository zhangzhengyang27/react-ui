import { useRef, useState } from 'react'

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
 * - 此实现与 Mantine 上游 `useMap` 一致,属已知设计权衡。
 */
export function useMap<T, V>(initialState?: [T, V][]): Map<T, V> {
    const [map, setMap] = useState(() => new Map<T, V>(initialState))
    const mapRef = useRef(map)
    mapRef.current = map

    map.set = (...args) => {
        Map.prototype.set.apply(mapRef.current, args)
        setMap(new Map(mapRef.current))
        return mapRef.current
    }

    map.clear = () => {
        Map.prototype.clear.apply(mapRef.current)
        setMap(new Map(mapRef.current))
    }

    map.delete = (...args) => {
        const result = Map.prototype.delete.apply(mapRef.current, args)
        setMap(new Map(mapRef.current))
        return result
    }

    return map
}

export namespace useMap {
    export type ReturnValue<T, V> = Map<T, V>
}
