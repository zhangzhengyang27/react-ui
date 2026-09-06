import { useCallback, useMemo, useState } from 'react'

export interface UseStateHistoryHandlers<T> {
    set: (value: T) => void
    back: (steps?: number) => void
    forward: (steps?: number) => void
    reset: () => void
}

export interface UseStateHistoryValue<T> {
    history: T[]
    current: number
}

export type UseStateHistoryReturnValue<T> = [T, UseStateHistoryHandlers<T>, UseStateHistoryValue<T>]

export interface UseStateHistoryOptions {
    /** 历史栈最大长度，超出后丢弃最旧的记录，防止长时间运行内存无限增长。默认 Infinity（不限制）。 */
    limit?: number
}

export function useStateHistory<T>(
    initialValue: T,
    options: UseStateHistoryOptions = {}
): UseStateHistoryReturnValue<T> {
    // limit 最小为 1：0 会把历史清空并使 current 变成 -1，state 取值 undefined
    const { limit = Infinity } = options
    const maxEntries = limit >= 1 ? limit : 1

    const [state, setState] = useState<UseStateHistoryValue<T>>({
        history: [initialValue],
        current: 0
    })

    const set = useCallback(
        (val: T) =>
            setState(currentState => {
                let nextState = [...currentState.history.slice(0, currentState.current + 1), val]
                // 超限时从头部丢弃最旧记录，保持 current 索引仍指向最新值
                if (maxEntries !== Infinity && nextState.length > maxEntries) {
                    nextState = nextState.slice(nextState.length - maxEntries)
                }
                return {
                    history: nextState,
                    current: nextState.length - 1
                }
            }),
        [maxEntries]
    )

    const back = useCallback(
        (steps = 1) =>
            setState(currentState => ({
                history: currentState.history,
                current: Math.max(0, currentState.current - steps)
            })),
        []
    )

    const forward = useCallback(
        (steps = 1) =>
            setState(currentState => ({
                history: currentState.history,
                current: Math.min(currentState.history.length - 1, currentState.current + steps)
            })),
        []
    )

    const reset = useCallback(() => {
        setState({ history: [initialValue], current: 0 })
    }, [initialValue])

    const handlers = useMemo(() => ({ back, forward, reset, set }), [back, forward, reset, set])

    return [state.history[state.current], handlers, state]
}

export namespace useStateHistory {
    export type Handlers<T> = UseStateHistoryHandlers<T>
    export type Value<T> = UseStateHistoryValue<T>
    export type Options = UseStateHistoryOptions
    export type ReturnValue<T> = UseStateHistoryReturnValue<T>
}
