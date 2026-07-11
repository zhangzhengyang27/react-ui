import { useCallback, useEffect, useState } from 'react'

export interface UseMouseOptions {
    /** 鼠标离开目标元素时是否将坐标重置为 0，默认 false */
    resetOnExit?: boolean
}

export interface UseMouseReturnValue<T extends HTMLElement = any> {
    /** 需要绑定到目标元素的 ref callback */
    ref: React.RefCallback<T | null>

    /** 鼠标相对于目标元素左侧的 X 坐标（或页面 X 坐标） */
    x: number

    /** 鼠标相对于目标元素顶部的 Y 坐标（或页面 Y 坐标） */
    y: number
}

export interface UseMousePositionReturnValue {
    x: number
    y: number
}

/**
 * 监听目标元素内的鼠标位置，返回相对于元素的坐标。
 * 若未绑定元素，则返回相对于页面的坐标。
 * @param options 配置项
 * @returns 包含 ref 与 x/y 坐标的对象
 */
export function useMouse<T extends HTMLElement = any>(
    options: UseMouseOptions = {}
): UseMouseReturnValue<T> {
    const { resetOnExit = false } = options
    const [position, setPosition] = useState({ x: 0, y: 0 })

    const refCallback: React.RefCallback<T | null> = useCallback(
        node => {
            const setMousePosition = (event: MouseEvent) => {
                if (node) {
                    const rect = node.getBoundingClientRect()
                    setPosition({
                        x: Math.max(0, Math.round(event.clientX - rect.left)),
                        y: Math.max(0, Math.round(event.clientY - rect.top))
                    })
                } else {
                    setPosition({ x: event.clientX, y: event.clientY })
                }
            }

            const resetMousePosition = () => setPosition({ x: 0, y: 0 })

            node?.addEventListener('mousemove', setMousePosition)
            if (resetOnExit) {
                node?.addEventListener('mouseleave', resetMousePosition)
            }

            return () => {
                node?.removeEventListener('mousemove', setMousePosition)
                if (resetOnExit) {
                    node?.removeEventListener('mouseleave', resetMousePosition)
                }
            }
        },
        [resetOnExit]
    )

    return { ref: refCallback, ...position }
}

/**
 * 监听整个文档的鼠标位置。
 * @returns 包含 x/y 坐标的对象
 */
export function useMousePosition(): UseMousePositionReturnValue {
    const [position, setPosition] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const setMousePosition = (event: MouseEvent) => {
            setPosition({ x: event.clientX, y: event.clientY })
        }

        document.addEventListener('mousemove', setMousePosition)

        return () => {
            document.removeEventListener('mousemove', setMousePosition)
        }
    }, [])

    return position
}

export namespace useMouse {
    export type Options = UseMouseOptions
    export type ReturnValue<T extends HTMLElement = any> = UseMouseReturnValue<T>
}

export namespace useMousePosition {
    export type ReturnValue = UseMousePositionReturnValue
}
