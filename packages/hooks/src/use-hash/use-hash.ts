import { useEffect, useState } from 'react'

export interface UseHashOptions {
    /** 是否在 effect 中读取初始 hash，默认 true，可避免 SSR 水合不一致 */
    getInitialValueInEffect?: boolean
}

export type UseHashReturnValue = [string, (value: string) => void]

/**
 * 监听并设置 URL hash。
 * @param options 配置项
 * @returns [当前 hash, 设置 hash 的函数]
 */
export function useHash(options: UseHashOptions = {}): UseHashReturnValue {
    const { getInitialValueInEffect = true } = options
    // SSR 安全：getInitialValueInEffect=false 时也必须在渲染期兜底 window 缺失的场景
    const [hash, setHash] = useState<string>(
        getInitialValueInEffect || typeof window === 'undefined' ? '' : window.location.hash || ''
    )

    const setHashValue = (value: string) => {
        const valueWithHash = value.startsWith('#') ? value : `#${value}`
        window.location.hash = valueWithHash
        setHash(valueWithHash)
    }

    // 函数式更新 + 空依赖：监听器只需绑定一次，且不再依赖闭包里的 hash（避免每次 hash 变化重绑）
    useEffect(() => {
        const handleHashChange = () => {
            const newHash = window.location.hash
            setHash(current => (current === newHash ? current : newHash))
        }

        window.addEventListener('hashchange', handleHashChange)
        return () => window.removeEventListener('hashchange', handleHashChange)
    }, [])

    useEffect(() => {
        if (getInitialValueInEffect) {
            setHash(window.location.hash)
        }
    }, [getInitialValueInEffect])

    return [hash, setHashValue]
}

export namespace useHash {
    export type Options = UseHashOptions
    export type ReturnValue = UseHashReturnValue
}
