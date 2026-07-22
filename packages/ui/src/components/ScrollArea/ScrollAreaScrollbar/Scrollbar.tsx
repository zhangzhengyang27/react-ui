import { useEffect, useRef, useState } from 'react'
import { useMergedRef } from '@xiaoye-react/hooks'
import { useScrollAreaContext } from '../ScrollArea.context'
import type { Sizes } from '../ScrollArea.types'
import { useResizeObserver } from '../use-resize-observer'
import { composeEventHandlers } from '../utils'
import { ScrollbarContextValue, ScrollbarProvider } from './Scrollbar.context'

export interface ScrollbarPrivateProps {
    sizes: Sizes
    hasThumb: boolean
    onThumbChange: ScrollbarContextValue['onThumbChange']
    onThumbPointerUp: ScrollbarContextValue['onThumbPointerUp']
    onThumbPointerDown: ScrollbarContextValue['onThumbPointerDown']
    onThumbPositionChange: ScrollbarContextValue['onThumbPositionChange']
    onWheelScroll: (event: WheelEvent, maxScrollPos: number) => void
    onDragScroll: (pointerPos: { x: number; y: number }) => void
    onResize: () => void
}

interface ScrollbarProps extends ScrollbarPrivateProps, Omit<React.ComponentProps<'div'>, 'onResize'> {
    forceMount?: true
}

export function Scrollbar(props: ScrollbarProps) {
    const {
        sizes,
        hasThumb,
        onThumbChange,
        onThumbPointerUp,
        onThumbPointerDown,
        onThumbPositionChange,
        onWheelScroll,
        onDragScroll,
        onResize,
        forceMount,
        ref,
        ...scrollbarProps
    } = props
    const context = useScrollAreaContext()
    const [scrollbar, setScrollbar] = useState<HTMLDivElement | null>(null)
    const composeRefs = useMergedRef(ref, setScrollbar)
    const rectRef = useRef<DOMRect | null>(null)
    const prevWebkitUserSelectRef = useRef('')
    const { viewport } = context
    const maxScrollPos = sizes.content - sizes.viewport

    const handleThumbPositionChangeRef = useRef(onThumbPositionChange)
    const handleWheelScrollRef = useRef(onWheelScroll)
    const handleResizeRef = useRef(onResize)

    // 在 render 阶段同步最新回调到 ref,供异步事件回调(wheel/resize)引用
    // 避免无依赖 useEffect 每帧执行带来的性能损耗
    handleThumbPositionChangeRef.current = onThumbPositionChange
    handleWheelScrollRef.current = onWheelScroll
    handleResizeRef.current = onResize

    const handleDragScroll = (event: React.PointerEvent<HTMLElement>) => {
        if (rectRef.current) {
            const x = event.clientX - rectRef.current.left
            const y = event.clientY - rectRef.current.top
            onDragScroll({ x, y })
        }
    }

    useEffect(() => {
        const handleWheel = (event: WheelEvent) => {
            const element = event.target as HTMLElement
            const isScrollbarWheel = scrollbar?.contains(element)
            if (isScrollbarWheel) {
                handleWheelScrollRef.current(event, maxScrollPos)
            }
        }
        document.addEventListener('wheel', handleWheel, { passive: false })
        return () => document.removeEventListener('wheel', handleWheel, { passive: false } as any)
    }, [viewport, scrollbar, maxScrollPos])

    // 拖拽滚动条期间组件卸载时 onLostPointerCapture 不会触发,
    // 在卸载清理中恢复 body 的 user-select,避免 'none' 永久残留(rectRef 非空即拖拽进行中)
    useEffect(() => {
        return () => {
            if (rectRef.current !== null) {
                document.body.style.webkitUserSelect = prevWebkitUserSelectRef.current
            }
        }
    }, [])

    useEffect(() => {
        handleThumbPositionChangeRef.current()
    }, [sizes])

    useResizeObserver(scrollbar, () => {
        window.requestAnimationFrame(() => {
            handleResizeRef.current()
        })
    })
    useResizeObserver(context.content, () => {
        window.requestAnimationFrame(() => {
            handleResizeRef.current()
        })
    })

    return (
        <ScrollbarProvider
            value={{
                scrollbar,
                hasThumb,
                onThumbChange,
                onThumbPointerUp,
                onThumbPositionChange,
                onThumbPointerDown
            }}
        >
            <div
                {...scrollbarProps}
                ref={composeRefs}
                data-react-ui-scrollbar
                style={{ position: 'absolute', ...scrollbarProps.style }}
                onPointerDown={composeEventHandlers(props.onPointerDown, event => {
                    event.preventDefault()

                    const mainPointer = 0
                    if (event.button === mainPointer) {
                        const element = event.target as HTMLElement
                        element.setPointerCapture(event.pointerId)
                        rectRef.current = scrollbar!.getBoundingClientRect()
                        prevWebkitUserSelectRef.current = document.body.style.webkitUserSelect
                        document.body.style.webkitUserSelect = 'none'
                        handleDragScroll(event)
                    }
                })}
                onPointerMove={composeEventHandlers(props.onPointerMove, handleDragScroll)}
                onPointerUp={composeEventHandlers(props.onPointerUp, event => {
                    const element = event.target as HTMLElement
                    if (element.hasPointerCapture(event.pointerId)) {
                        event.preventDefault()
                        element.releasePointerCapture(event.pointerId)
                    }
                })}
                onLostPointerCapture={() => {
                    document.body.style.webkitUserSelect = prevWebkitUserSelectRef.current
                    rectRef.current = null
                }}
            />
        </ScrollbarProvider>
    )
}

Scrollbar.displayName = '@xiaoye-react/ui/ScrollAreaScrollbarContainer'
