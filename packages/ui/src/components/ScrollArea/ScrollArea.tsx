import { useCallback, useRef, useState } from 'react'
import { useIsomorphicEffect, useMergedRef } from '@react-ui/hooks'
import {
    Box,
    BoxProps,
    createVarsResolver,
    ElementProps,
    factory,
    Factory,
    rem,
    StylesApiProps,
    useProps,
    useStyles
} from '../../core'
import classes from './ScrollArea.module.css'
import { ScrollAreaCorner } from './ScrollAreaCorner/ScrollAreaCorner'
import { ScrollAreaRoot } from './ScrollAreaRoot/ScrollAreaRoot'
import { ScrollAreaScrollbar } from './ScrollAreaScrollbar/ScrollAreaScrollbar'
import { ScrollAreaThumb } from './ScrollAreaThumb/ScrollAreaThumb'
import { ScrollAreaViewport } from './ScrollAreaViewport/ScrollAreaViewport'

export type ScrollAreaStylesNames = 'root' | 'viewport' | 'scrollbar' | 'thumb' | 'corner' | 'content'

export type ScrollAreaCssVariables = {
    root: '--scrollarea-scrollbar-size'
}

export interface ScrollAreaProps extends BoxProps, StylesApiProps<ScrollAreaFactory>, ElementProps<'div'> {
    /** Scrollbar size, any valid CSS value for width/height, numbers are converted to rem, default value is 12px (0.75rem) */
    scrollbarSize?: number | string

    /**
     * Defines scrollbars behavior
     * - `'always'` – scrollbars always visible, even when content doesn't overflow
     * - `'never'` – scrollbars always hidden
     * @default 'always'
     * */
    type?: 'always' | 'never'

    /**
     * Axis at which scrollbars must be rendered
     * - `'x'` - horizontal scrollbar only
     * - `'y'` - vertical scrollbar only
     * - `'xy'` - both scrollbars
     * - `false` - no scrollbars rendered (content remains scrollable via mouse/touch)
     * @default 'xy'
     */
    scrollbars?: 'x' | 'y' | 'xy' | false

    /**
     * Determines whether scrollbars should be offset with padding on given axis
     * - `true` - adds padding to offset both scrollbars
     * - `'x'` - adds padding to offset horizontal scrollbar
     * - `'y'` - adds padding to offset vertical scrollbar
     * @default false
     */
    offsetScrollbars?: boolean | 'x' | 'y'

    /** Assigns viewport element (scrollable container) ref */
    viewportRef?: React.Ref<HTMLDivElement>

    /** Props passed down to the viewport element */
    viewportProps?: React.ComponentProps<'div'>

    /** Called with current position (`x` and `y` coordinates) when viewport is scrolled */
    onScrollPositionChange?: (position: { x: number; y: number }) => void

    /** Called when scrollarea is scrolled to the bottom (within 0.8px tolerance for sub-pixel rendering) */
    onBottomReached?: () => void

    /** Called when scrollarea is scrolled all the way to the top */
    onTopReached?: () => void

    /** Called when scrollarea is scrolled to the left (within 0.8px tolerance for sub-pixel rendering) */
    onLeftReached?: () => void

    /** Called when scrollarea is scrolled to the right (within 0.8px tolerance for sub-pixel rendering) */
    onRightReached?: () => void

    /** Defines `overscroll-behavior` of the viewport */
    overscrollBehavior?: React.CSSProperties['overscrollBehavior']

    /** Initial scroll position set on mount */
    startScrollPosition?: { x?: number; y?: number }
}

export type ScrollAreaFactory = Factory<{
    props: ScrollAreaProps
    ref: HTMLDivElement
    stylesNames: ScrollAreaStylesNames
    vars: ScrollAreaCssVariables
}>

const defaultProps = {
    type: 'always' as const,
    scrollbars: 'xy' as const
} satisfies Partial<ScrollAreaProps>

const varsResolver = createVarsResolver<ScrollAreaFactory>((_, { scrollbarSize, overscrollBehavior, scrollbars }) => {
    let overrideOverscrollBehavior = overscrollBehavior

    if (overscrollBehavior && scrollbars) {
        if (scrollbars === 'x') {
            overrideOverscrollBehavior = `${overscrollBehavior} auto`
        } else if (scrollbars === 'y') {
            overrideOverscrollBehavior = `auto ${overscrollBehavior}`
        }
    }

    return {
        root: {
            '--scrollarea-scrollbar-size': rem(scrollbarSize),
            '--scrollarea-over-scroll-behavior': overrideOverscrollBehavior
        }
    }
})

export const ScrollArea = factory<ScrollAreaFactory>(_props => {
    const props = useProps('ScrollArea', defaultProps, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        scrollbarSize,
        vars,
        type,
        viewportProps,
        viewportRef,
        onScrollPositionChange,
        children,
        offsetScrollbars,
        scrollbars,
        onBottomReached,
        onTopReached,
        onLeftReached,
        onRightReached,
        overscrollBehavior,
        startScrollPosition,
        attributes,
        ...others
    } = props

    // Refs to track previous boundary states
    const prevAtTopRef = useRef(true)
    const prevAtBottomRef = useRef(false)
    const prevAtLeftRef = useRef(true)
    const prevAtRightRef = useRef(false)

    const getStyles = useStyles<ScrollAreaFactory>({
        name: 'ScrollArea',
        props,
        classes,
        className,
        style,
        classNames,
        styles,
        unstyled,
        attributes,
        vars,
        varsResolver
    })

    const localViewportRef = useRef<HTMLDivElement>(null)
    const [viewportElement, setViewportElement] = useState<HTMLDivElement | null>(null)
    const viewportCallbackRef = useCallback((node: HTMLDivElement | null) => {
        setViewportElement(current => (current === node ? current : node))
    }, [])
    const combinedViewportRef = useMergedRef(viewportRef, localViewportRef, viewportCallbackRef)

    useIsomorphicEffect(() => {
        if (startScrollPosition && localViewportRef.current) {
            localViewportRef.current.scrollTo({
                left: startScrollPosition.x ?? 0,
                top: startScrollPosition.y ?? 0
            })
        }
    }, [])

    const rootProps = getStyles('root')

    return (
        <ScrollAreaRoot getStyles={getStyles} type={type} scrollbars={scrollbars} {...rootProps} {...others}>
            <ScrollAreaViewport
                {...viewportProps}
                {...getStyles('viewport', { style: viewportProps?.style })}
                ref={combinedViewportRef}
                data-offset-scrollbars={offsetScrollbars === true ? 'xy' : offsetScrollbars || undefined}
                data-scrollbars={scrollbars || undefined}
                onScroll={e => {
                    viewportProps?.onScroll?.(e)
                    onScrollPositionChange?.({
                        x: e.currentTarget.scrollLeft,
                        y: e.currentTarget.scrollTop
                    })
                    const { scrollTop, scrollHeight, clientHeight, scrollLeft, scrollWidth, clientWidth } =
                        e.currentTarget

                    // Vertical boundaries
                    const isAtBottom = scrollTop - (scrollHeight - clientHeight) >= -0.8
                    const isAtTop = scrollTop === 0

                    if (isAtBottom && !prevAtBottomRef.current) {
                        onBottomReached?.()
                    }
                    if (isAtTop && !prevAtTopRef.current) {
                        onTopReached?.()
                    }

                    prevAtBottomRef.current = isAtBottom
                    prevAtTopRef.current = isAtTop

                    // Horizontal boundaries
                    const isAtRight = scrollLeft - (scrollWidth - clientWidth) >= -0.8
                    const isAtLeft = scrollLeft === 0

                    if (isAtRight && !prevAtRightRef.current) {
                        onRightReached?.()
                    }
                    if (isAtLeft && !prevAtLeftRef.current) {
                        onLeftReached?.()
                    }

                    prevAtRightRef.current = isAtRight
                    prevAtLeftRef.current = isAtLeft
                }}
            >
                {children}
            </ScrollAreaViewport>

            {type !== 'never' && (scrollbars === 'xy' || scrollbars === 'x') && (
                <ScrollAreaScrollbar {...getStyles('scrollbar')} orientation="horizontal" forceMount>
                    <ScrollAreaThumb {...getStyles('thumb')} />
                </ScrollAreaScrollbar>
            )}

            {type !== 'never' && (scrollbars === 'xy' || scrollbars === 'y') && (
                <ScrollAreaScrollbar {...getStyles('scrollbar')} orientation="vertical" forceMount>
                    <ScrollAreaThumb {...getStyles('thumb')} />
                </ScrollAreaScrollbar>
            )}

            <ScrollAreaCorner {...getStyles('corner')} data-hidden={type === 'never' || undefined} />
        </ScrollAreaRoot>
    )
})

ScrollArea.classes = classes
;(ScrollArea as any).varsResolver = varsResolver
ScrollArea.displayName = '@react-ui/ui/ScrollArea'

export namespace ScrollArea {
    export type Props = ScrollAreaProps
    export type StylesNames = ScrollAreaStylesNames
    export type CssVariables = ScrollAreaCssVariables
    export type Factory = ScrollAreaFactory
}
