import { useEffect, useRef, useState } from 'react'
import { useMergedRef } from '@react-ui/hooks'
import { useScrollAreaContext } from '../ScrollArea.context'
import type { ScrollAreaScrollbarAxisProps } from '../ScrollArea.types'
import { getThumbSize, isScrollingWithinScrollbarBounds, toInt } from '../utils'
import { Scrollbar } from './Scrollbar'

export const ScrollAreaScrollbarX = (props: ScrollAreaScrollbarAxisProps) => {
    const { sizes, onSizesChange, style, ref: forwardedRef, ...others } = props
    const ctx = useScrollAreaContext()
    const [computedStyle, setComputedStyle] = useState<CSSStyleDeclaration>()
    const ref = useRef<HTMLDivElement>(null)
    const composeRefs = useMergedRef(forwardedRef, ref, node => ctx.onScrollbarXChange(node))

    useEffect(() => {
        if (ref.current) {
            setComputedStyle(getComputedStyle(ref.current))
        }
    }, [ref])

    return (
        <Scrollbar
            data-orientation="horizontal"
            {...others}
            ref={composeRefs}
            sizes={sizes}
            style={{
                ...style,
                ['--sa-thumb-width' as any]: `${getThumbSize(sizes)}px`
            }}
            onThumbPointerDown={pointerPos => props.onThumbPointerDown(pointerPos.x)}
            onDragScroll={pointerPos => props.onDragScroll(pointerPos.x)}
            onWheelScroll={(event, maxScrollPos) => {
                if (ctx.viewport) {
                    const scrollPos = ctx.viewport.scrollLeft + event.deltaX
                    props.onWheelScroll(scrollPos)
                    if (isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos)) {
                        event.preventDefault()
                    }
                }
            }}
            onResize={() => {
                if (ref.current && ctx.viewport && computedStyle) {
                    onSizesChange({
                        content: ctx.viewport.scrollWidth,
                        viewport: ctx.viewport.offsetWidth,
                        scrollbar: {
                            size: ref.current.clientWidth,
                            paddingStart: toInt(computedStyle.paddingLeft),
                            paddingEnd: toInt(computedStyle.paddingRight)
                        }
                    })
                }
            }}
        />
    )
}

ScrollAreaScrollbarX.displayName = '@react-ui/ui/ScrollAreaScrollbarX'
