import { useRef, useState } from 'react'

/**
 * 将 React state 与 Map 行为结合的 Hook。
 * 返回的 Map 支持 set / delete / clear，并会触发重新渲染。
 * @param initialState 初始键值对数组
 * @returns 响应式 Map 实例
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
