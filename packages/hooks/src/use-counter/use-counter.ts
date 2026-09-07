import { useCallback, useState } from 'react'
import { clamp } from '../utils'

const DEFAULT_OPTIONS = {
    min: -Infinity,
    max: Infinity
}

export interface UseCounterOptions {
    min?: number
    max?: number
}

export interface UseCounterHandlers {
    increment: () => void
    decrement: () => void
    set: (value: number) => void
    reset: () => void
}

export type UseCounterReturnValue = [number, UseCounterHandlers]

/**
 * 自定义计数器 Hook，提供计数功能及操作方法
 * @param {number} [initialValue=0] - 计数器的初始值
 * @param {UseCounterHandlers} [options] - 计数器配置选项，包含最小/最大值限制
 * @returns {[number, UseCounterHandlers]} 包含当前计数值和操作方法的元组
 * @property {Function} increment - 增加计数值（不超过最大值）
 * @property {Function} decrement - 减少计数值（不小于最小值）
 * @property {Function} set - 直接设置计数值（在最小/最大范围内）
 * @property {Function} reset - 重置计数器到初始值
 */
export function useCounter(initialValue = 0, options?: UseCounterHandlers): [number, UseCounterHandlers] {
    const { min, max } = { ...DEFAULT_OPTIONS, ...options }
    const [count, setCount] = useState<number>(clamp(initialValue, min, max))

    const increment = useCallback(() => setCount(current => clamp(current + 1, min, max)), [min, max])

    const decrement = useCallback(() => setCount(current => clamp(current - 1, min, max)), [min, max])

    const set = useCallback((value: number) => setCount(clamp(value, min, max)), [min, max])

    const reset = useCallback(() => setCount(clamp(initialValue, min, max)), [initialValue, min, max])

    return [count, { increment, decrement, set, reset }]
}
