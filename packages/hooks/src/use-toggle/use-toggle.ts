import { useReducer } from 'react'

type UseToggleAction<T> = (value?: React.SetStateAction<T>) => void
export type UseToggleReturnValue<T> = [T, UseToggleAction<T>]

export function useToggle<T = boolean>(
    options: readonly T[] = [false, true] as any
): UseToggleReturnValue<T> {
    const [[option], toggle] = useReducer(
        (state: T[], action: React.SetStateAction<T>) => {
            // toggle() 无参数时旋转到下一个值（action 为 undefined，indexOf 返回 -1）
            // toggle(value) 时旋转到把 value 顶到首位；值未匹配则保持当前状态不变
            const value = action instanceof Function ? action(state[0]) : action
            const index = state.indexOf(value)

            // 值未匹配（含无参调用 action=undefined 的情况）时，旋转到下一个值
            // 之前的 Math.abs(state.indexOf(value)) 对未匹配值返回 1 也是旋转，
            // 但对显式传入未匹配值会错误旋转——改为仅无参/函数调用时旋转，显式值未匹配则不变
            if (index === -1) {
                // 无参 toggle() 或 action 是函数返回未匹配值：旋转到下一个
                if (action === undefined || action instanceof Function) {
                    return state.slice(1).concat(state.slice(0, 1))
                }
                // 显式传入未匹配值：保持当前状态
                return state
            }

            return state.slice(index).concat(state.slice(0, index))
        },
        options as T[]
    )

    return [option, toggle as UseToggleAction<T>]
}

export namespace useToggle {
    export type ReturnValue<T> = UseToggleReturnValue<T>
}
