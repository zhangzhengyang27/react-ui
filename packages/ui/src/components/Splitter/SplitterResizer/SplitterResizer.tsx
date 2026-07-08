import { useRef } from 'react'
import { Box, BoxProps, Factory, factory, StylesApiProps, useProps, useStyles } from '../../../core'
import classes from '../Splitter.module.css'
import { useSplitterContext } from '../SplitterContext'

export interface SplitterResizerProps extends BoxProps, StylesApiProps<SplitterResizerFactory> {
    /** Index of the resizer between panel index and index + 1 */
    index: number
}

export type SplitterResizerFactory = Factory<{
    props: SplitterResizerProps
    ref: HTMLDivElement
    stylesNames: 'resizer'
}>

const defaultProps = {} satisfies Partial<SplitterResizerProps>

export const SplitterResizer = factory<SplitterResizerFactory>((_props, ref) => {
    const props = useProps('SplitterResizer', defaultProps, _props)
    const { classNames, className, style, styles, unstyled, vars, index, ...others } = props
    const ctx = useSplitterContext()
    const startStateRef = useRef<{ sizes: number[]; position: number; containerSize: number } | null>(null)

    const getStyles = useStyles<SplitterResizerFactory>({
        name: 'Splitter',
        classes,
        props,
        className,
        style,
        classNames,
        styles,
        unstyled,
        vars,
        rootSelector: 'resizer'
    })

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault()
        const container = ctx.containerRef.current
        if (!container) return

        const rect = container.getBoundingClientRect()
        const containerSize = ctx.orientation === 'horizontal' ? rect.width : rect.height
        const position = ctx.orientation === 'horizontal' ? event.clientX : event.clientY

        startStateRef.current = {
            sizes: [...ctx.sizes],
            position,
            containerSize
        }

        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
    }

    const handleMouseMove = (event: MouseEvent) => {
        if (!startStateRef.current) return
        const { sizes, position, containerSize } = startStateRef.current
        const currentPosition = ctx.orientation === 'horizontal' ? event.clientX : event.clientY
        const deltaPercent = ((currentPosition - position) / containerSize) * 100

        const nextSizes = [...sizes]
        nextSizes[index] = Math.max(5, Math.min(95, sizes[index] + deltaPercent))
        nextSizes[index + 1] = Math.max(5, Math.min(95, sizes[index + 1] - deltaPercent))

        // Normalize when one panel hits the boundary
        const total = nextSizes[index] + nextSizes[index + 1]
        if (total !== sizes[index] + sizes[index + 1]) {
            const originalTotal = sizes[index] + sizes[index + 1]
            nextSizes[index] = (nextSizes[index] / total) * originalTotal
            nextSizes[index + 1] = (nextSizes[index + 1] / total) * originalTotal
        }

        ctx.setSizes(nextSizes)
    }

    const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
    }

    return (
        <Box
            ref={ref}
            role="separator"
            data-orientation={ctx.orientation}
            {...getStyles('resizer')}
            onMouseDown={handleMouseDown}
            {...others}
        />
    )
})

SplitterResizer.classes = classes
SplitterResizer.displayName = '@react-ui/ui/SplitterResizer'

export namespace SplitterResizer {
    export type Props = SplitterResizerProps
    export type Factory = SplitterResizerFactory
}
