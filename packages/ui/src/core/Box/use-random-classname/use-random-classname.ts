import { useId } from 'react'

/**
 * 生成一个带有随机ID的CSS类名
 * @returns {string} 格式为"__m__-{随机ID}"的类名字符串，其中随机ID由useId生成并移除了特殊字符
 */
export function useRandomClassName() {
    // useId 的输出格式（如 ':r0:'、'«r0»'）由 React 内部实现决定，
    // 用白名单方式清洗，确保任何格式下都能生成合法的 CSS 类名
    const id = useId().replace(/[^a-zA-Z0-9_-]/g, '')
    return `__m__-${id}`
}
