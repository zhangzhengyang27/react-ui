import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useMergedRef } from '@react-ui/hooks'
import { Box, BoxProps, ElementProps, Factory, GetStylesApi, useProps } from '../../../core'
import { ScrollAreaProvider } from '../ScrollArea.context'
import type { ScrollAreaFactory } from '../ScrollArea'

export type ScrollAreaRootStylesNames = 'root' | 'viewport' | 'scrollbar' | 'thumb' | 'corner'

export type ScrollAreaRootCssVariables = {
    root: '--sa-corner-width' | '--sa-corner-height'
}

export interface ScrollAreaRootProps extends BoxProps, ElementProps<'div'> {
    getStyles: GetStylesApi<ScrollAreaFactory>
    type?: 'always' | 'never'
    scrollbars?: 'x' | 'y' | 'xy' | false
    ref?: React.Ref<HTMLDivElement>
}

export type ScrollAreaRootFactory = Factory<{
    props: ScrollAreaRootProps
    ref: HTMLDivElement
    stylesNames: ScrollAreaRootStylesNames
}>

const defaultProps = {
    type: 'always'
} satisfies Partial<ScrollAreaRootProps>

export function ScrollAreaRoot(_props: ScrollAreaRootProps) {
    const { type, scrollbars, getStyles, ref, ...others } = useProps('ScrollAreaRoot', defaultProps, _props)

    const [scrollArea, setScrollArea] = useState<HTMLDivElement | null>(null)
    const [viewport, setViewport] = useState<HTMLDivElement | null>(null)
    const [content, setContent] = useState<HTMLDivElement | null>(null)
    const [scrollbarX, setScrollbarX] = useState<HTMLDivElement | null>(null)
    const [scrollbarY, setScrollbarY] = useState<HTMLDivElement | null>(null)
    const [cornerWidth, setCornerWidth] = useState(0)
    const [cornerHeight, setCornerHeight] = useState(0)
    const [scrollbarXEnabled, setScrollbarXEnabled] = useState(false)
    const [scrollbarYEnabled, setScrollbarYEnabled] = useState(false)
    const rootRef = useMergedRef(ref, setScrollArea)

    // scrollbars={false} 时不渲染 Scrollbar 子组件，enabled 标志不会被其挂载逻辑置 true，
    // Viewport 的 overflow 将恒为 hidden 导致超出内容被裁剪；此处主动置 true 恢复原生滚动
    useEffect(() => {
        if (scrollbars === false) {
            setScrollbarXEnabled(true)
            setScrollbarYEnabled(true)
        }
    }, [scrollbars])

    const getStylesRef = useRef(getStyles)
    getStylesRef.current = getStyles
    const stableGetStyles = useCallback<typeof getStyles>((...args) => getStylesRef.current(...args), [])

    const value = useMemo(
        () => ({
            type,
            scrollArea,
            viewport,
            onViewportChange: setViewport,
            content,
            onContentChange: setContent,
            scrollbarX,
            onScrollbarXChange: setScrollbarX,
            scrollbarXEnabled,
            onScrollbarXEnabledChange: setScrollbarXEnabled,
            scrollbarY,
            onScrollbarYChange: setScrollbarY,
            scrollbarYEnabled,
            onScrollbarYEnabledChange: setScrollbarYEnabled,
            onCornerWidthChange: setCornerWidth,
            onCornerHeightChange: setCornerHeight,
            getStyles: stableGetStyles
        }),
        [
            type,
            scrollArea,
            viewport,
            content,
            scrollbarX,
            scrollbarY,
            scrollbarXEnabled,
            scrollbarYEnabled,
            stableGetStyles
        ]
    )

    return (
        <ScrollAreaProvider
            value={value}
        >
            <Box
                {...others}
                ref={rootRef}
                __vars={{
                    '--sa-corner-width': scrollbars !== 'xy' ? '0px' : `${cornerWidth}px`,
                    '--sa-corner-height': scrollbars !== 'xy' ? '0px' : `${cornerHeight}px`
                }}
            />
        </ScrollAreaProvider>
    )
}

ScrollAreaRoot.displayName = '@react-ui/ui/ScrollAreaRoot'
