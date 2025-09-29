import React from 'react'

/**
 * 获取React的useId钩子函数，如果不存在则返回undefined
 * @returns {string | undefined} 生成的唯一ID或undefined（当useId不可用时）
 */
const __useId: () => string | undefined = (React as any)['useId'.toString()] || (() => undefined)

/**
 * 生成一个带有 'mantine-' 前缀的 React ID
 * @returns {string} 格式化后的 ID 字符串，格式为 'mantine-{id}'，如果原始 ID 不存在则返回空字符串
 */
export function useReactId() {
    const id = __useId()
    return id ? `mantine-${id.replace(/:/g, '')}` : ''
}
