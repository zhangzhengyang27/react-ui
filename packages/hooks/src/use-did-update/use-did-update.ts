import { DependencyList, EffectCallback, useEffect, useRef } from 'react'

/**
 * 在依赖变化时执行副作用，跳过首次渲染（与 componentDidUpdate 语义一致）。
 * 对齐 mantine useDidUpdate。
 *
 * @param fn - 副作用函数，可返回清理函数
 * @param dependencies - 依赖列表
 */
export function useDidUpdate(fn: EffectCallback, dependencies?: DependencyList) {
    const mounted = useRef(false)

    useEffect(
        () => () => {
            mounted.current = false
        },
        []
    )

    useEffect(() => {
        if (mounted.current) {
            return fn()
        }

        mounted.current = true
        return undefined
    }, dependencies)
}
