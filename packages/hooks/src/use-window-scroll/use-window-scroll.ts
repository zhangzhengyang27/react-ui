import { useEffect, useState } from 'react'
import { useWindowEvent } from '../use-window-event/use-window-event'

export interface UseWindowScrollPosition {
    x: number
    y: number
}

export type UseWindowScrollTo = (position: Partial<UseWindowScrollPosition>) => void
export type UseWindowScrollReturnValue = [UseWindowScrollPosition, UseWindowScrollTo]

function getScrollPosition(): UseWindowScrollPosition {
    return typeof window !== 'undefined'
        ? { x: window.scrollX, y: window.scrollY }
        : { x: 0, y: 0 }
}

function scrollTo({ x, y }: Partial<UseWindowScrollPosition>) {
    if (typeof window !== 'undefined') {
        const scrollOptions: ScrollToOptions = { behavior: 'smooth' }

        if (typeof x === 'number') {
            scrollOptions.left = x
        }

        if (typeof y === 'number') {
            scrollOptions.top = y
        }

        window.scrollTo(scrollOptions)
    }
}

export function useWindowScroll(): UseWindowScrollReturnValue {
    const [position, setPosition] = useState<UseWindowScrollPosition>({ x: 0, y: 0 })

    // 位置没变就不换引用：scroll/resize 事件频率可达 60~120 次/秒，
    // 之前每次都新建 {x, y}，无条件让所有消费组件重渲染
    const syncPosition = () => {
        const next = getScrollPosition()
        setPosition(prev => (prev.x === next.x && prev.y === next.y ? prev : next))
    }

    useWindowEvent('scroll', syncPosition, { passive: true })
    useWindowEvent('resize', syncPosition, { passive: true })

    useEffect(() => {
        syncPosition()
    }, [])

    return [position, scrollTo] as const
}

export namespace useWindowScroll {
    export type Position = UseWindowScrollPosition
    export type ScrollTo = UseWindowScrollTo
    export type ReturnValue = UseWindowScrollReturnValue
}
