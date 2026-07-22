import { useEffect, useRef } from 'react'
import { useMergedRef } from '@xiaoye-react/hooks'
import { useScrollAreaContext } from '../ScrollArea.context'
import { useScrollbarContext } from '../ScrollAreaScrollbar/Scrollbar.context'
import { composeEventHandlers } from '../utils'

interface ThumbProps extends React.ComponentProps<'div'> {}

export function Thumb(props: ThumbProps) {
    const { style, ref: forwardedRef, ...others } = props
    const scrollAreaContext = useScrollAreaContext()
    const scrollbarContext = useScrollbarContext()
    const { onThumbPositionChange } = scrollbarContext
    const composedRef = useMergedRef(forwardedRef, scrollbarContext.onThumbChange)

    useEffect(() => {
        const { viewport } = scrollAreaContext
        if (viewport) {
            const handleScroll = () => {
                onThumbPositionChange()
            }
            onThumbPositionChange()
            viewport.addEventListener('scroll', handleScroll)
            return () => viewport.removeEventListener('scroll', handleScroll)
        }

        return undefined
    }, [scrollAreaContext.viewport, onThumbPositionChange])

    return (
        <div
            data-state={scrollbarContext.hasThumb ? 'visible' : 'hidden'}
            {...others}
            ref={composedRef}
            style={{
                width: 'var(--sa-thumb-width)',
                height: 'var(--sa-thumb-height)',
                ...style
            }}
            onPointerDownCapture={composeEventHandlers(props.onPointerDownCapture, event => {
                const thumb = event.target as HTMLElement
                const thumbRect = thumb.getBoundingClientRect()
                const x = event.clientX - thumbRect.left
                const y = event.clientY - thumbRect.top
                scrollbarContext.onThumbPointerDown({ x, y })
            })}
            onPointerUp={composeEventHandlers(props.onPointerUp, scrollbarContext.onThumbPointerUp)}
        />
    )
}

Thumb.displayName = '@xiaoye-react/ui/ScrollAreaThumbInner'

interface ScrollAreaThumbProps extends ThumbProps {
    forceMount?: true
}

export function ScrollAreaThumb(props: ScrollAreaThumbProps) {
    const { forceMount, ...thumbProps } = props
    const scrollbarContext = useScrollbarContext()

    if (forceMount || scrollbarContext.hasThumb) {
        return <Thumb {...thumbProps} />
    }

    return null
}

ScrollAreaThumb.displayName = '@xiaoye-react/ui/ScrollAreaThumb'
