import { useCallback, useRef, useState } from 'react'

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
 *
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
 *
 * @remarks
 * **⚠️ 双 onChange 陷阱（重要）**:
 *
 * 非受控模式下，`handleUncontrolledChange` 内部会调用 `setUncontrolledValue(val)` 后
 * **再调用 `onChange(val, ...payload)`**。因此：
 *
 * - **正确用法**: 组件将 `onChange` 传给 `useUncontrolled`，然后**只调用返回的 setter**（[1]）。
 *   setter 是 onChange 的唯一出口。
 *
 * ```ts
 * // ✅ 正确：把 onChange 交给 useUncontrolled，调 setter 即可
 * const [value, setValue, controlled] = useUncontrolled({
 *     value,
 *     defaultValue,
 *     onChange: handleChange  // ← 不要在组件内再调一次
 * })
 * // 事件处理中只调 setValue
 * const handleInternal = (next) => setValue(next)
 * ```
 *
 * - **错误用法**: 组件既向 `useUncontrolled` 传 `onChange`，又在事件处理中**显式调用 `onChange`**。
 *   这会导致 onChange 被触发两次（一次 setter 内部，一次外部显式调用）。
 *
 * ```ts
 * // ❌ 错误：双触发
 * const [value, setValue] = useUncontrolled({
 *     value,
 *     defaultValue,
 *     onChange: handleChange  // ← 这里会被 setter 内部调用
 * })
 * const handleInternal = (next) => {
 *     setValue(next)
 *     handleChange(next)  // ← 这里又调一次 → 双触发
 * }
 * ```
 *
 * **历史背景**: react-ui 组件层审计（9347c9fd）发现 5 处组件因同时向 useUncontrolled 传 onChange
 * 又在 setter 调用点附近显式调 onChange 而触发双次 onChange 的事件。修复方式统一为：
 * 不向 useUncontrolled 传 onChange，由组件显式调用 onChange 作为唯一出口；
 * **前提是所有 setter 调用点都受 `value === undefined` 守卫**（受控模式永不调 setter）。
 *
 * 返回的 setter 是**稳定引用**（useCallback）：受控模式下不更新内部状态、仅转发最新 onChange；
 * 非受控模式下更新内部状态并转发最新 onChange。下游可以放心把 setter 放进依赖数组。
 */
export function useUncontrolled<T>({
    value,
    defaultValue,
    finalValue,
    onChange = () => {}
}: UseUncontrolledOptions<T>): UseUncontrolledReturnValue<T> {
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue !== undefined ? defaultValue : finalValue)

    // setter 必须是稳定引用：若每次渲染重建，下游以其为依赖的 useCallback/useMemo 会
    // 每帧失效（Combobox contextValue、use-splitter 的 ref 回调缓存等大面积击穿）。
    // onChange 经 ref 转发最新值，避免稳定 setter 闭包固化过期回调
    const onChangeRef = useRef(onChange)
    onChangeRef.current = onChange
    const valueRef = useRef(value)
    valueRef.current = value

    const handleChange = useCallback((val: T, ...payload: any[]) => {
        if (valueRef.current !== undefined) {
            // 受控模式：不更新内部状态，仅转发 onChange（与既有受控语义一致）
            onChangeRef.current?.(val, ...payload)
            return
        }
        setUncontrolledValue(val)
        onChangeRef.current?.(val, ...payload)
    }, [])

    if (value !== undefined) {
        return [value as T, handleChange, true]
    }

    return [uncontrolledValue as T, handleChange, false]
}
