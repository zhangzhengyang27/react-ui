import { useCallback, useEffect, useRef, useState } from 'react'

export interface UseFetchOptions extends RequestInit {
    /** 是否在挂载时自动发起请求，默认 true */
    autoInvoke?: boolean
}

export interface UseFetchReturnValue<T> {
    /** 请求返回的数据 */
    data: T | null

    /** 是否正在加载 */
    loading: boolean

    /** 请求错误 */
    error: Error | null

    /** 重新发起请求，失败时 reject（AbortError 也会 reject，调用方需在 catch 中过滤） */
    refetch: () => Promise<T>

    /** 中止当前请求 */
    abort: () => void
}

export type UseFetchUrl<T> = string | ((signal: AbortSignal) => Promise<T>)

/**
 * 基于 fetch 的数据获取 Hook，支持自动请求、重新请求与中止。
 * @param url 请求地址或返回 Promise 的函数
 * @param options fetch 配置项
 * @returns 数据、加载状态、错误与操作函数
 */
export function useFetch<T>(
    url: UseFetchUrl<T>,
    { autoInvoke = true, ...options }: UseFetchOptions = {}
): UseFetchReturnValue<T> {
    const [data, setData] = useState<T | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)
    const controller = useRef<AbortController | null>(null)

    // 把 url 和 options 存到 ref，避免作为依赖项导致无限循环。
    // 原因：options 默认值 {} 在每次渲染都创建新对象，若作为 useCallback 依赖，
    // refetch 引用每次变化 → useEffect 反复触发 → setState → 重渲染 → 死循环。
    const urlRef = useRef(url)
    urlRef.current = url
    const optionsRef = useRef(options)
    optionsRef.current = options

    const refetch = useCallback(() => {
        if (controller.current) {
            controller.current.abort()
        }

        controller.current = new AbortController()
        setLoading(true)

        const currentUrl = urlRef.current
        const currentOptions = optionsRef.current
        const currentController = controller.current

        const request = typeof currentUrl === 'function'
            ? // 函数型 url 同样透传 signal,与 fetch 路径共享中止协作
              // (不消费 signal 的函数运行时兼容,仅丢失协作中止能力,由下方 aborted 守卫兜底)
              (currentUrl as (signal: AbortSignal) => Promise<T>)(currentController.signal)
            : fetch(currentUrl, { ...currentOptions, signal: currentController.signal })
                .then(res => {
                    if (!res.ok) {
                        throw new Error(`Request failed with status ${res.status}`)
                    }
                    return res.json()
                })

        return request
            .then(res => {
                // 请求完成后若已被中止/取代(函数型未消费 signal 时不会自行 reject),
                // 转成 AbortError 走统一 catch:不复位 loading、不写 data、不误报 error
                if (currentController.signal.aborted) {
                    const abortError = new Error('The operation was aborted')
                    abortError.name = 'AbortError'
                    throw abortError
                }
                setData(res)
                setLoading(false)
                setError(null)
                return res as T
            })
            .catch(err => {
                // 已被新 refetch 取代的旧请求不回写任何状态,由新请求全权负责 loading/error
                if (currentController !== controller.current) {
                    throw err
                }

                setLoading(false)

                if (err.name !== 'AbortError') {
                    setError(err)
                }

                // 重新抛出错误，让调用方的 .catch 处理；
                // 之前返回 err 会让 .then 收到 Error 对象，无法区分成功与失败
                throw err
            })
    }, [])

    const abort = useCallback(() => {
        controller.current?.abort()
    }, [])

    useEffect(() => {
        if (autoInvoke) {
            // autoInvoke 路径静默捕获 rejection：错误已存入 error state，
            // 不应作为 unhandled rejection 冒泡；手动调 refetch() 的消费者需自行 .catch
            refetch().catch(() => {})
        }

        return () => {
            controller.current?.abort()
        }
    }, [refetch, autoInvoke])

    return { data, loading, error, refetch, abort }
}

export namespace useFetch {
    export type Options = UseFetchOptions
    export type ReturnValue<T> = UseFetchReturnValue<T>
}
