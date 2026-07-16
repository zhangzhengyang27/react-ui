import { useMediaQuery, UseMediaQueryOptions } from '../use-media-query/use-media-query'

/**
 * 检测用户是否开启了「减少动态效果」系统偏好（prefers-reduced-motion: reduce）。
 * 对齐 ui useReducedMotion。
 *
 * @param initialValue - SSR 或首次渲染前的初始值
 * @param options - 透传给 useMediaQuery 的选项
 * @returns 是否匹配 reduced-motion
 */
export function useReducedMotion(initialValue?: boolean, options?: UseMediaQueryOptions) {
    return useMediaQuery('(prefers-reduced-motion: reduce)', initialValue, options)
}
