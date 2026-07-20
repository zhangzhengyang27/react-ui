import { useMergedRef } from '@react-ui/hooks'
import { Box, BoxProps, ElementProps } from '../../../core'
import { useScrollAreaContext } from '../ScrollArea.context'

export interface ScrollAreaViewportProps extends BoxProps, ElementProps<'div'> {
    ref?: React.Ref<HTMLDivElement>
}

export function ScrollAreaViewport({ children, style, ref, onWheel, ...others }: ScrollAreaViewportProps) {
    const ctx = useScrollAreaContext()
    const rootRef = useMergedRef(ref, ctx.onViewportChange)

    const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
        onWheel?.(event)

        if (ctx.scrollbarXEnabled && ctx.viewport && event.shiftKey) {
            const { scrollTop, scrollHeight, clientHeight, scrollWidth, clientWidth } = ctx.viewport
            const isAtTop = scrollTop < 1
            const isAtBottom = scrollTop >= scrollHeight - clientHeight - 1
            const canScrollHorizontally = scrollWidth > clientWidth

            if (canScrollHorizontally && (isAtTop || isAtBottom)) {
                event.stopPropagation()
            }
        }
    }

    return (
        <Box
            {...others}
            ref={rootRef}
            onWheel={handleWheel}
            data-scrollarea-viewport
            style={{
                overflowX: ctx.scrollbarXEnabled ? 'scroll' : 'hidden',
                overflowY: ctx.scrollbarYEnabled ? 'scroll' : 'hidden',
                ...style
            }}
        >
            <div {...ctx.getStyles('content')} ref={useMergedRef(ctx.onContentChange)}>
                {children}
            </div>
        </Box>
    )
}

ScrollAreaViewport.displayName = '@react-ui/ui/ScrollAreaViewport'
