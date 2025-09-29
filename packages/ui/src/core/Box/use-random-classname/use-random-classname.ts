import { useId } from 'react'

/**
 * 生成一个带有随机ID的CSS类名
 * @returns {string} 格式为"__m__-{随机ID}"的类名字符串，其中随机ID由useId生成并移除了特殊字符
 */
export function useRandomClassName() {
    const id = useId().replace(/[:«»]/g, '')
    return `__m__-${id}`
}
