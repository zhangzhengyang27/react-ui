import { useCallback, useRef, useState } from 'react'
import { useScrollAreaContext } from '../ScrollArea.context'
import type { ScrollAreaScrollbarAxisPrivateProps, ScrollAreaScrollbarAxisProps, Sizes } from '../ScrollArea.types'
import { getScrollPositionFromPointer, getThumbOffsetFromScroll, getThumbRatio } from '../utils'
import { ScrollAreaScrollbarX } from './ScrollbarX'
import { ScrollAreaScrollbarY } from './ScrollbarY'

export interface ScrollAreaScrollbarVisibleProps
    extends Omit<ScrollAreaScrollbarAxisProps, keyof ScrollAreaScrollbarAxisPrivateProps> {
    orientation?: 'horizontal' | 'vertical'
    forceMount?: true
}

export function ScrollAreaScrollbarVisible(props: ScrollAreaScrollbarVisibleProps) {
    const { orientation = 'vertical', forceMount, ...scrollbarProps } = props
    const context = useScrollAreaContext()
    const thumbRef = useRef<HTMLDivElement | null>(null)
    const pointerOffsetRef = useRef(0)
    const [sizes, setSizes] = useState<Sizes>({
        content: 0,
        viewport: 0,
        scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 }
    })

    const thumbRatio = getThumbRatio(sizes.viewport, sizes.content)

    // useCallback 稳定化:Thumb 内 scroll 监听的 useEffect 依赖 onThumbPositionChange,
    // 内联箭头会导致父组件每次渲染都重绑 viewport 的 scroll 监听;
    // 依赖 sizes 是必要的,sizes 变化时本就需要按新尺寸重算 thumb 位置
    const handleThumbPositionChangeX = useCallback(() => {
        if (context.viewport && thumbRef.current) {
            const scrollPos = context.viewport.scrollLeft
            const offset = getThumbOffsetFromScroll(scrollPos, sizes)
            thumbRef.current.style.transform = `translate3d(${offset}px, 0, 0)`
        }
    }, [context.viewport, sizes])

    const handleThumbPositionChangeY = useCallback(() => {
        if (context.viewport && thumbRef.current) {
            const scrollPos = context.viewport.scrollTop
            const offset = getThumbOffsetFromScroll(scrollPos, sizes)
            if (sizes.scrollbar.size === 0) {
                thumbRef.current.style.setProperty('--thumb-opacity', '0')
            } else {
                thumbRef.current.style.setProperty('--thumb-opacity', '1')
            }
            thumbRef.current.style.transform = `translate3d(0, ${offset}px, 0)`
        }
    }, [context.viewport, sizes])

    const commonProps: Omit<
        ScrollAreaScrollbarAxisPrivateProps,
        'onThumbPositionChange' | 'onDragScroll' | 'onWheelScroll'
    > = {
        ...scrollbarProps,
        sizes,
        onSizesChange: setSizes,
        hasThumb: Boolean(thumbRatio > 0 && thumbRatio < 1),
        onThumbChange: thumb => {
            thumbRef.current = thumb
        },
        onThumbPointerUp: () => {
            pointerOffsetRef.current = 0
        },
        onThumbPointerDown: pointerPos => {
            pointerOffsetRef.current = pointerPos
        }
    }

    const getScrollPosition = (pointerPos: number) =>
        getScrollPositionFromPointer(pointerPos, pointerOffsetRef.current, sizes)

    if (orientation === 'horizontal') {
        return (
            <ScrollAreaScrollbarX
                {...commonProps}
                forceMount={forceMount}
                onThumbPositionChange={handleThumbPositionChangeX}
                onWheelScroll={scrollPos => {
                    if (context.viewport) {
                        context.viewport.scrollLeft = scrollPos
                    }
                }}
                onDragScroll={pointerPos => {
                    if (context.viewport) {
                        context.viewport.scrollLeft = getScrollPosition(pointerPos)
                    }
                }}
            />
        )
    }

    if (orientation === 'vertical') {
        return (
            <ScrollAreaScrollbarY
                {...commonProps}
                forceMount={forceMount}
                onThumbPositionChange={handleThumbPositionChangeY}
                onWheelScroll={scrollPos => {
                    if (context.viewport) {
                        context.viewport.scrollTop = scrollPos
                    }
                }}
                onDragScroll={pointerPos => {
                    if (context.viewport) {
                        context.viewport.scrollTop = getScrollPosition(pointerPos)
                    }
                }}
            />
        )
    }

    return null
}

ScrollAreaScrollbarVisible.displayName = '@react-ui/ui/ScrollAreaScrollbarVisible'
