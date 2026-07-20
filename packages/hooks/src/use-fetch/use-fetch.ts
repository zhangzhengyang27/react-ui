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

    /** 重新发起请求 */
    refetch: () => Promise<any>

    /** 中止当前请求 */
    abort: () => void
}

export type UseFetchUrl<T> = string | (() => Promise<T>)

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

        const request = typeof currentUrl === 'function'
            ? (currentUrl as () => Promise<T>)()
            : fetch(currentUrl, { ...currentOptions, signal: controller.current.signal })
                .then(res => {
                    if (!res.ok) {
                        throw new Error(`Request failed with status ${res.status}`)
                    }
                    return res.json()
                })

        return request
            .then(res => {
                setData(res)
                setLoading(false)
                setError(null)
                return res as T
            })
            .catch(err => {
                setLoading(false)

                if (err.name !== 'AbortError') {
                    setError(err)
                }

                return err
            })
    }, [])

    const abort = useCallback(() => {
        controller.current?.abort()
    }, [])

    useEffect(() => {
        if (autoInvoke) {
            refetch()
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
