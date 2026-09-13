import { useCallback, useRef, useState } from 'react'
import { useDirection } from '../../../core'
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
    const { dir } = useDirection()
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
            // RTL 下原生 scrollLeft 为负值，必须传入 dir 让工具函数用 [-max, 0] 区间钳位
            const offset = getThumbOffsetFromScroll(scrollPos, sizes, dir)
            thumbRef.current.style.transform = `translate3d(${offset}px, 0, 0)`
        }
    }, [context.viewport, sizes, dir])

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

    // 竖向滚动与方向无关，固定 ltr 语义；横向按当前 dir 计算映射区间
    const getScrollPositionY = (pointerPos: number) =>
        getScrollPositionFromPointer(pointerPos, pointerOffsetRef.current, sizes)

    const getScrollPositionX = (pointerPos: number) =>
        getScrollPositionFromPointer(pointerPos, pointerOffsetRef.current, sizes, dir)

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
                        context.viewport.scrollLeft = getScrollPositionX(pointerPos)
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
                        context.viewport.scrollTop = getScrollPositionY(pointerPos)
                    }
                }}
            />
        )
    }

    return null
}

ScrollAreaScrollbarVisible.displayName = '@xiaoye-react/ui/ScrollAreaScrollbarVisible'
