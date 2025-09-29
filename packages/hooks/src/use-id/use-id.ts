import { useState } from 'react'
import { useIsomorphicEffect } from '../use-isomorphic-effect/use-isomorphic-effect'
import { randomId } from '../utils'
import { useReactId } from './use-react-id'

/**
 * 生成唯一的ID，优先使用静态ID，其次使用React生成的ID，最后使用随机UUID
 * @param {string} [staticId] - 可选的静态ID，如果提供则直接返回该值
 * @returns {string} 生成的唯一ID
 * @remarks
 * - 在服务端渲染时返回React生成的ID
 * - 在浏览器环境下返回随机生成的UUID
 */
export function useId(staticId?: string) {
    const reactId = useReactId()
    const [uuid, setUuid] = useState(reactId)

    useIsomorphicEffect(() => {
        setUuid(randomId())
    }, [])

    if (typeof staticId === 'string') {
        return staticId
    }

    if (typeof window === 'undefined') {
        return reactId
    }

    return uuid
}
