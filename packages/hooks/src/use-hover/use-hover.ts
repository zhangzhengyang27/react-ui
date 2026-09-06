import { useCallback, useRef, useState } from 'react'

export interface UseHoverReturnValue<T extends HTMLElement = any> {
    /** 当前是否处于悬停状态 */
    hovered: boolean

    /** 需要绑定到目标元素的 ref callback */
    ref: React.RefCallback<T | null>
}

/**
 * 监听目标元素的 mouseenter/mouseleave 事件，返回悬停状态与 ref。
 * @returns 包含 hovered 状态与 ref callback 的对象
 */
export function useHover<T extends HTMLElement = any>(): UseHoverReturnValue<T> {
    const [hovered, setHovered] = useState(false)
    const previousNode = useRef<HTMLElement | null>(null)

    const handleMouseEnter = useCallback(() => {
        setHovered(true)
    }, [])

    const handleMouseLeave = useCallback(() => {
        setHovered(false)
    }, [])

    const ref: React.RefCallback<T | null> = useCallback(
        node => {
            if (previousNode.current) {
                previousNode.current.removeEventListener('mouseenter', handleMouseEnter)
                previousNode.current.removeEventListener('mouseleave', handleMouseLeave)
            }

            if (node) {
                node.addEventListener('mouseenter', handleMouseEnter)
                node.addEventListener('mouseleave', handleMouseLeave)
            }

            previousNode.current = node

            // React 19 ref cleanup：移除监听并重置状态，避免目标节点被 GC 前监听器残留
            return () => {
                node?.removeEventListener('mouseenter', handleMouseEnter)
                node?.removeEventListener('mouseleave', handleMouseLeave)
                previousNode.current = null
                setHovered(false)
            }
        },
        [handleMouseEnter, handleMouseLeave]
    )

    return { ref, hovered }
}

export namespace useHover {
    export type ReturnValue<T extends HTMLElement = any> = UseHoverReturnValue<T>
}
