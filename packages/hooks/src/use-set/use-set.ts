import { useRef, useState } from 'react'

/**
 * 将 React state 与 Set 行为结合的 Hook。
 * 返回的 Set 支持 add / delete / clear，并会触发重新渲染。
 * @param values 初始值数组
 * @returns 响应式 Set 实例
 */
export function useSet<T>(values?: T[]): Set<T> {
    const [set, setSet] = useState(() => new Set(values))
    const setRef = useRef(set)
    setRef.current = set

    set.add = (...args) => {
        const result = Set.prototype.add.apply(setRef.current, args)
        setSet(new Set(setRef.current))
        return result
    }

    set.clear = () => {
        Set.prototype.clear.apply(setRef.current)
        setSet(new Set(setRef.current))
    }

    set.delete = (...args) => {
        const result = Set.prototype.delete.apply(setRef.current, args)
        setSet(new Set(setRef.current))
        return result
    }

    return set
}

export namespace useSet {
    export type ReturnValue<T> = Set<T>
}
