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
    const [hash, setHash] = useState<string>(getInitialValueInEffect ? '' : window.location.hash || '')

    const setHashValue = (value: string) => {
        const valueWithHash = value.startsWith('#') ? value : `#${value}`
        window.location.hash = valueWithHash
        setHash(valueWithHash)
    }

    useEffect(() => {
        const handleHashChange = () => {
            const newHash = window.location.hash
            if (hash !== newHash) {
                setHash(newHash)
            }
        }

        window.addEventListener('hashchange', handleHashChange)
        return () => window.removeEventListener('hashchange', handleHashChange)
    }, [hash])

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
