import { useState } from 'react'

export interface UseQueueOptions<T> {
    /** 初始值数组 */
    initialValues?: T[]

    /** 状态区最大长度 */
    limit: number
}

export interface UseQueueReturnValue<T> {
    /** 超过 limit 后被暂存的队列项 */
    queue: T[]

    /** 当前状态区中的项 */
    state: T[]

    /** 添加一项或多项 */
    add: (...items: T[]) => void

    /** 通过函数更新当前所有项 */
    update: (fn: (state: T[]) => T[]) => void

    /** 清空等待队列 */
    cleanQueue: () => void
}

/**
 * 固定长度的队列 Hook，超出限制的数据进入 queue 等待区。
 * @param options 配置项
 * @returns 队列状态与操作函数
 */
export function useQueue<T>({ initialValues = [], limit }: UseQueueOptions<T>): UseQueueReturnValue<T> {
    const [state, setState] = useState({
        state: initialValues.slice(0, limit),
        queue: initialValues.slice(limit)
    })

    const add = (...items: T[]) =>
        setState(current => {
            const results = [...current.state, ...current.queue, ...items]
            return {
                state: results.slice(0, limit),
                queue: results.slice(limit)
            }
        })

    const update = (fn: (state: T[]) => T[]) =>
        setState(current => {
            const results = fn([...current.state, ...current.queue])
            return {
                state: results.slice(0, limit),
                queue: results.slice(limit)
            }
        })

    const cleanQueue = () => setState(current => ({ state: current.state, queue: [] }))

    return {
        state: state.state,
        queue: state.queue,
        add,
        update,
        cleanQueue
    }
}

export namespace useQueue {
    export type Options<T> = UseQueueOptions<T>
    export type ReturnValue<T> = UseQueueReturnValue<T>
}
