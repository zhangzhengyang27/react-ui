import { useMediaQuery, UseMediaQueryOptions } from '../use-media-query/use-media-query'

export type UseColorSchemeValue = 'dark' | 'light'

/**
 * 根据用户系统偏好获取当前颜色方案
 * @param {UseColorSchemeValue} [initialValue] - 初始颜色方案值（可选）
 * @param {UseMediaQueryOptions} [options] - 媒体查询选项（可选）
 * @returns {UseColorSchemeValue} 当前颜色方案值（'dark' 或 'light'）
 */
export function useColorScheme(
    initialValue?: UseColorSchemeValue,
    options?: UseMediaQueryOptions
): UseColorSchemeValue {
    return useMediaQuery('(prefers-color-scheme: dark)', initialValue === 'dark', options) ? 'dark' : 'light'
}
