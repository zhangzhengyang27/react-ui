import { useEffect } from 'react'
import { useScrollAreaContext } from '../ScrollArea.context'
import { ScrollAreaScrollbarVisible, ScrollAreaScrollbarVisibleProps } from './ScrollAreaScrollbarVisible'

interface ScrollAreaScrollbarProps extends ScrollAreaScrollbarVisibleProps {
    forceMount?: true
}

export function ScrollAreaScrollbar(props: ScrollAreaScrollbarProps) {
    const { forceMount, ...scrollbarProps } = props
    const context = useScrollAreaContext()
    const { onScrollbarXEnabledChange, onScrollbarYEnabledChange } = context
    const isHorizontal = props.orientation === 'horizontal'

    useEffect(() => {
        isHorizontal ? onScrollbarXEnabledChange(true) : onScrollbarYEnabledChange(true)
        return () => {
            isHorizontal ? onScrollbarXEnabledChange(false) : onScrollbarYEnabledChange(false)
        }
    }, [isHorizontal, onScrollbarXEnabledChange, onScrollbarYEnabledChange])

    if (context.type === 'never') {
        return null
    }

    return <ScrollAreaScrollbarVisible {...scrollbarProps} forceMount={forceMount} />
}

ScrollAreaScrollbar.displayName = '@react-ui/ui/ScrollAreaScrollbar'
