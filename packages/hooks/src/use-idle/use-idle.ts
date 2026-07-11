import { useEffect, useRef, useState } from 'react'

export interface UseIdleOptions {
    /** 监听的事件列表，默认包含常见交互事件 */
    events?: (keyof DocumentEventMap)[]

    /** 初始状态是否为空闲，默认 true */
    initialState?: boolean
}

const DEFAULT_OPTIONS: Required<UseIdleOptions> = {
    events: ['keydown', 'mousemove', 'touchmove', 'click', 'scroll', 'wheel'],
    initialState: true
}

/**
 * 检测用户是否在指定时间内没有交互。
 * @param timeout 空闲超时时间（毫秒）
 * @param options 配置项
 * @returns 是否处于空闲状态
 */
export function useIdle(timeout: number, options?: UseIdleOptions): boolean {
    const { events, initialState } = { ...DEFAULT_OPTIONS, ...options }
    const [idle, setIdle] = useState(initialState)
    const timer = useRef<number | null>(null)

    useEffect(() => {
        const handleEvents = () => {
            setIdle(false)

            if (timer.current) {
                window.clearTimeout(timer.current)
            }

            timer.current = window.setTimeout(() => {
                setIdle(true)
            }, timeout)
        }

        events.forEach(event => document.addEventListener(event, handleEvents))

        timer.current = window.setTimeout(() => {
            setIdle(true)
        }, timeout)

        return () => {
            events.forEach(event => document.removeEventListener(event, handleEvents))
            if (timer.current) {
                window.clearTimeout(timer.current)
            }
            timer.current = null
        }
    }, [timeout, events])

    return idle
}

export namespace useIdle {
    export type Options = UseIdleOptions
}
