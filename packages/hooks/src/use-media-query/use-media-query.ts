import { useEffect, useState } from 'react'

export interface UseMediaQueryOptions {
    getInitialValueInEffect: boolean
}

type MediaQueryCallback = (event: { matches: boolean; media: string }) => void

/**
 * 订阅一条 MediaQueryList 的变化，返回解绑函数。
 * 导出给 useMatches 这类"一次订阅多条查询"的场景复用，避免 Safari 老版本的
 * addListener 兜底逻辑抄第二份。
 * */
export function attachMediaListener(query: MediaQueryList, callback: MediaQueryCallback) {
    try {
        query.addEventListener('change', callback)
        return () => query.removeEventListener('change', callback)
    } catch (e) {
        query.addListener(callback)
        return () => query.removeListener(callback)
    }
}

/**
 * 根据查询条件和初始值确定布尔返回值
 * @param {string} query - 用于媒体查询的字符串
 * @param {boolean} [initialValue] - 可选的初始布尔值
 * @returns {boolean} 如果initialValue是布尔值则返回它，否则返回媒体查询结果或false
 */
function getInitialValue(query: string, initialValue?: boolean) {
    if (typeof initialValue === 'boolean') {
        return initialValue
    }

    if (typeof window !== 'undefined' && 'matchMedia' in window) {
        return window.matchMedia(query).matches
    }

    return false
}

/**
 * 检测浏览器是否匹配指定的媒体查询
 * @param {string} query - 要检测的媒体查询字符串
 * @param {boolean} [initialValue] - 初始匹配值（可选）
 * @param {Object} [options] - 配置选项
 * @param {boolean} [options.getInitialValueInEffect=true] - 是否在effect中获取初始值
 * @returns {boolean} 当前是否匹配媒体查询
 * @throws 在Safari iframe中可能会抛出兼容性错误
 */
export function useMediaQuery(
    query: string,
    initialValue?: boolean,
    { getInitialValueInEffect }: UseMediaQueryOptions = {
        getInitialValueInEffect: true
    }
): boolean {
    const [matches, setMatches] = useState(getInitialValueInEffect ? initialValue : getInitialValue(query))
    useEffect(() => {
        try {
            const mediaQuery = window.matchMedia(query)
            setMatches(mediaQuery.matches)
            return attachMediaListener(mediaQuery, event => setMatches(event.matches))
        } catch (e) {
            // Safari iframe compatibility issue
            return undefined
        }
    }, [query])

    return matches || false
}
