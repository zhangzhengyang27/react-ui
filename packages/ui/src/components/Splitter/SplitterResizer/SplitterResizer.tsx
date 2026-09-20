import { Box, BoxProps, Factory, factory, StylesApiProps, useProps, useStyles } from '../../../core'
import { useMergedRef } from '@xiaoye-react/hooks'
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

    // 拖拽/键盘/双击的全部尺寸计算（含两侧面板 min/max 的 clamp 与 redistribute）都在 useSplitter 里，
    // 分隔条只负责把它给出的 handler props 透传到 DOM
    const { ref: handleRef, 'aria-orientation': _ariaOrientation, ...handleProps } = ctx.getHandleProps({
        index
    })
    const mergedRef = useMergedRef<HTMLDivElement>(ref, handleRef)

    return (
        <Box
            ref={mergedRef}
            {...handleProps}
            // 水平分栏的分隔条本身是竖直的，aria-orientation 按分隔条自身方向取值
            aria-orientation={ctx.orientation === 'horizontal' ? 'vertical' : 'horizontal'}
            {...getStyles('resizer')}
            {...others}
        />
    )
})

SplitterResizer.classes = classes
SplitterResizer.displayName = '@xiaoye-react/ui/SplitterResizer'

export namespace SplitterResizer {
    export type Props = SplitterResizerProps
    export type Factory = SplitterResizerFactory
}
