import { useState } from 'react'

/**
 * 定义非受控组件的状态管理选项接口
 * @template T 状态值的类型
 * @property {T} [value] 受控状态的值
 * @property {T} [defaultValue] 非受控状态的初始值
 * @property {T} [finalValue] 当未提供value和defaultValue时的最终默认值
 * @property {(value: T, ...payload: any[]) => void} [onChange] 受控状态变化时的回调函数
 */
export interface UseUncontrolledOptions<T> {
    value?: T
    defaultValue?: T
    finalValue?: T
    onChange?: (value: T, ...payload: any[]) => void
}

/**
 * 表示非受控组件的返回值类型
 * @template T 值的类型
 * @returns {Array} 包含三个元素的数组：
 *   [0] {T} 当前值
 *   [1] {(value: T, ...payload: any[]) => void} 更新状态的处理函数，将`value`和`payload`传递给`onChange`
 *   [2] {boolean} 是否为受控状态（true表示受控，false表示非受控）
 */
export type UseUncontrolledReturnValue<T> = [T, (value: T, ...payload: any[]) => void, boolean]

/**
 * 用于管理非受控组件的状态，支持受控与非受控模式的切换
 * @template T - 状态值的类型
 * @param {Object} options - 配置选项
 * @param {T} [options.value] - 受控状态值（优先级最高）
 * @param {T} [options.defaultValue] - 非受控模式的初始值
 * @param {T} options.finalValue - 当defaultValue未定义时的回退值
 * @param {(val: T, ...payload: any[]) => void} [options.onChange] - 状态变更回调
 * @returns {[T, (val: T, ...payload: any[]) => void, boolean]} 返回三元组：
 *   [0] 当前状态值
 *   [1] 状态更新函数
 *   [2] 是否为受控模式
 */
export function useUncontrolled<T>({
    value,
    defaultValue,
    finalValue,
    onChange = () => {}
}: UseUncontrolledOptions<T>): UseUncontrolledReturnValue<T> {
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue !== undefined ? defaultValue : finalValue)

    const handleUncontrolledChange = (val: T, ...payload: any[]) => {
        setUncontrolledValue(val)
        onChange?.(val, ...payload)
    }

    if (value !== undefined) {
        return [value as T, onChange, true]
    }

    return [uncontrolledValue as T, handleUncontrolledChange, false]
}
