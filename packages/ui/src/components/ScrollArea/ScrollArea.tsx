import { useCallback, useEffect, useRef, useState } from 'react'
import { useIsomorphicEffect, useMergedRef } from '@xiaoye-react/hooks'
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

    /** Called when scrollarea is scrolled all the way to the top (within 0.8px tolerance for sub-pixel rendering) */
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

export interface ScrollAreaAutosizeProps extends ScrollAreaProps {
    /** Called when content overflows due to max-height, making the container scrollable */
    onOverflowChange?: (overflowing: boolean) => void
}

export type ScrollAreaFactory = Factory<{
    props: ScrollAreaProps
    ref: HTMLDivElement
    stylesNames: ScrollAreaStylesNames
    vars: ScrollAreaCssVariables
    staticComponents: {
        Autosize: typeof ScrollAreaAutosize
    }
}>

export type ScrollAreaAutosizeFactory = Factory<{
    props: ScrollAreaAutosizeProps
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

export const ScrollArea = factory<ScrollAreaFactory>((_props, _ref) => {
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
        <ScrollAreaRoot getStyles={getStyles} type={type} scrollbars={scrollbars} ref={_ref} {...rootProps} {...others}>
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

                    // 未传 reach 回调时整段跳过：scrollHeight/clientHeight 这类读取
                    // 会触发回算，纯展示用的 ScrollArea 没必要每次滚动都付这个代价
                    if (onTopReached || onBottomReached) {
                        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget

                        // 该方向无溢出时 reach 判定恒成立(如仅纵向滚动时 isAtRight 恒 true 误报 onRightReached),
                        // 先检查该方向存在溢出再做边界判定
                        const hasVerticalOverflow = scrollHeight > clientHeight

                        // Vertical boundaries
                        const isAtBottom = hasVerticalOverflow && scrollTop - (scrollHeight - clientHeight) >= -0.8
                        // 与底部判定一致,顶部同样保留 0.8px 容差以兼容亚像素渲染
                        const isAtTop = hasVerticalOverflow && scrollTop <= 0.8

                        if (isAtBottom && !prevAtBottomRef.current) {
                            onBottomReached?.()
                        }
                        if (isAtTop && !prevAtTopRef.current) {
                            onTopReached?.()
                        }

                        prevAtBottomRef.current = isAtBottom
                        prevAtTopRef.current = isAtTop
                    }

                    if (onLeftReached || onRightReached) {
                        const { scrollLeft, scrollWidth, clientWidth } = e.currentTarget
                        const hasHorizontalOverflow = scrollWidth > clientWidth

                        // Horizontal boundaries
                        const isAtRight = hasHorizontalOverflow && scrollLeft - (scrollWidth - clientWidth) >= -0.8
                        const isAtLeft = hasHorizontalOverflow && scrollLeft <= 0.8

                        if (isAtRight && !prevAtRightRef.current) {
                            onRightReached?.()
                        }
                        if (isAtLeft && !prevAtLeftRef.current) {
                            onLeftReached?.()
                        }

                        prevAtRightRef.current = isAtRight
                        prevAtLeftRef.current = isAtLeft
                    }
                }}
            >
                {children}
            </ScrollAreaViewport>

            {(scrollbars === 'xy' || scrollbars === 'x') && (
                <ScrollAreaScrollbar {...getStyles('scrollbar')} orientation="horizontal" forceMount>
                    <ScrollAreaThumb {...getStyles('thumb')} />
                </ScrollAreaScrollbar>
            )}

            {(scrollbars === 'xy' || scrollbars === 'y') && (
                <ScrollAreaScrollbar {...getStyles('scrollbar')} orientation="vertical" forceMount>
                    <ScrollAreaThumb {...getStyles('thumb')} />
                </ScrollAreaScrollbar>
            )}

            <ScrollAreaCorner {...getStyles('corner')} data-hidden={type === 'never' || undefined} />
        </ScrollAreaRoot>
    )
})

ScrollArea.classes = classes
ScrollArea.varsResolver = varsResolver
ScrollArea.displayName = '@xiaoye-react/ui/ScrollArea'

export const ScrollAreaAutosize = factory<ScrollAreaAutosizeFactory>((_props, _ref) => {
    const props = useProps('ScrollAreaAutosize', defaultProps, _props as ScrollAreaAutosizeProps)
    const {
        children,
        classNames,
        styles,
        scrollbarSize,
        type,
        offsetScrollbars,
        overscrollBehavior,
        viewportRef,
        onScrollPositionChange,
        unstyled,
        viewportProps,
        scrollbars,
        style,
        vars,
        onBottomReached,
        onTopReached,
        onLeftReached,
        onRightReached,
        startScrollPosition,
        onOverflowChange,
        attributes,
        ...others
    } = props

    const viewportObserverRef = useRef<HTMLDivElement>(null)
    const [viewportObserverElement, setViewportObserverElement] = useState<HTMLDivElement | null>(null)
    const viewportObserverCallbackRef = useCallback((node: HTMLDivElement | null) => {
        setViewportObserverElement(current => (current === node ? current : node))
    }, [])
    const combinedViewportRef = useMergedRef(viewportRef, viewportObserverRef, viewportObserverCallbackRef)

    const overflowingRef = useRef(false)
    const didMountRef = useRef(false)

    // onOverflowChange 经 ref 转发：消费者常传内联箭头函数，若直接进 effect 依赖，
    // handleOverflowCheck 随父渲染重建，ResizeObserver 会反复 disconnect/re-observe
    // 并丢掉一次 resize 通知窗口（与 Scrollbar.tsx 的 handleXxxRef 模式对齐）
    const onOverflowChangeRef = useRef(onOverflowChange)
    onOverflowChangeRef.current = onOverflowChange

    const handleOverflowCheck = useCallback(() => {
        const el = viewportObserverRef.current
        if (!el || !onOverflowChangeRef.current) {
            return
        }

        const isOverflowing = el.scrollHeight > el.clientHeight

        if (isOverflowing !== overflowingRef.current) {
            if (didMountRef.current) {
                onOverflowChangeRef.current(isOverflowing)
            } else {
                didMountRef.current = true
                if (isOverflowing) {
                    onOverflowChangeRef.current(true)
                }
            }

            overflowingRef.current = isOverflowing
        }
    }, [])

    useEffect(() => {
        if (!viewportObserverElement) {
            return undefined
        }

        let rAF = 0
        const resizeObserver = new ResizeObserver(() => {
            cancelAnimationFrame(rAF)
            rAF = window.requestAnimationFrame(handleOverflowCheck)
        })

        resizeObserver.observe(viewportObserverElement)

        return () => {
            window.cancelAnimationFrame(rAF)
            resizeObserver.unobserve(viewportObserverElement)
        }
    }, [viewportObserverElement, handleOverflowCheck])

    return (
        <Box ref={_ref} {...others} style={[{ display: 'flex', overflow: 'hidden' }, style]}>
            <Box
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    overflow: 'hidden',
                    ...(scrollbars === 'y' && { minWidth: 0 }),
                    ...(scrollbars === 'x' && { minHeight: 0 }),
                    ...(scrollbars === 'xy' && { minWidth: 0, minHeight: 0 }),
                    ...(scrollbars === false && { minWidth: 0, minHeight: 0 })
                }}
            >
                <ScrollArea
                    attributes={attributes}
                    classNames={classNames}
                    styles={styles}
                    scrollbarSize={scrollbarSize}
                    type={type}
                    offsetScrollbars={offsetScrollbars}
                    overscrollBehavior={overscrollBehavior}
                    viewportRef={combinedViewportRef}
                    onScrollPositionChange={onScrollPositionChange}
                    unstyled={unstyled}
                    viewportProps={viewportProps}
                    vars={vars}
                    scrollbars={scrollbars}
                    onBottomReached={onBottomReached}
                    onTopReached={onTopReached}
                    onLeftReached={onLeftReached}
                    onRightReached={onRightReached}
                    startScrollPosition={startScrollPosition}
                    data-autosize="true"
                >
                    {children}
                </ScrollArea>
            </Box>
        </Box>
    )
})

ScrollAreaAutosize.displayName = '@xiaoye-react/ui/ScrollAreaAutosize'
ScrollAreaAutosize.classes = classes
ScrollArea.Autosize = ScrollAreaAutosize

export namespace ScrollArea {
    export type Props = ScrollAreaProps
    export type AutosizeProps = ScrollAreaAutosizeProps
    export type StylesNames = ScrollAreaStylesNames
    export type CssVariables = ScrollAreaCssVariables
    export type Factory = ScrollAreaFactory

    export namespace Autosize {
        export type Props = ScrollAreaAutosizeProps
    }
}
