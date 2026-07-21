import React, { useEffect, useRef, useState } from 'react'

interface ResizeObserverDimensions {
    width: number
    height: number
    contentWidth: number
    contentHeight: number
}

export function useDimensions<T extends HTMLElement | null>(
    elementRef: React.RefObject<T>
): ResizeObserverDimensions | null {
    const resizeObserverRef = useRef<ResizeObserver | null>(null)
    const [dimensions, setDimensions] = useState<ResizeObserverDimensions | null>(null)
    // 将 ref.current 镜像到 state:ref.current 的突变本身不触发渲染,无法作为 effect 依赖
    // 被可靠追踪;镜像到 state 后,元素挂载/替换(key 变化等)能正确触发 effect 重新 observe
    const [element, setElement] = useState<T>(elementRef.current)

    if (elementRef.current !== element) {
        setElement(elementRef.current)
    }

    useEffect(() => {
        if (!element) {
            return
        }

        resizeObserverRef.current = new ResizeObserver((entries) => {
            if (entries[0]) {
                const entry = entries[0]
                // 无需 flushSync:React 18/19 对 RO 回调中的更新自动批处理且在绘制前提交,
                // 测量级联运行在 layout effect 中,仍在同一帧内完成;
                // flushSync 会强制每次 RO 通知都同步渲染,徒增每帧开销
                setDimensions({
                    width: entry.borderBoxSize[0]?.inlineSize ?? entry.target.clientWidth,
                    height: entry.borderBoxSize[0]?.blockSize ?? entry.target.clientHeight,
                    contentWidth: entry.contentRect.width,
                    contentHeight: entry.contentRect.height
                })
            }
        })

        resizeObserverRef.current.observe(element)

        return () => {
            if (resizeObserverRef.current) {
                resizeObserverRef.current.disconnect()
                resizeObserverRef.current = null
            }
        }
    }, [element])

    return dimensions
}
