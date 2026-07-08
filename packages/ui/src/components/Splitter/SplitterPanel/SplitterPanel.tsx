import { Box, BoxProps, Factory, factory, StylesApiProps, useProps, useStyles } from '../../../core'
import classes from '../Splitter.module.css'
import { useSplitterContext } from '../SplitterContext'

export interface SplitterPanelProps extends BoxProps, StylesApiProps<SplitterPanelFactory> {
    /** Panel content */
    children?: React.ReactNode

    /** @internal Index assigned by Splitter parent */
    index?: number
}

export type SplitterPanelFactory = Factory<{
    props: SplitterPanelProps
    ref: HTMLDivElement
    stylesNames: 'panel'
}>

const defaultProps = {} satisfies Partial<SplitterPanelProps>

export const SplitterPanel = factory<SplitterPanelFactory>((_props, ref) => {
    const props = useProps('SplitterPanel', defaultProps, _props)
    const { classNames, className, style, styles, unstyled, vars, index, children, ...others } = props
    const ctx = useSplitterContext()

    const getStyles = useStyles<SplitterPanelFactory>({
        name: 'Splitter',
        classes,
        props,
        className,
        style,
        classNames,
        styles,
        unstyled,
        vars,
        rootSelector: 'panel'
    })

    const size = index !== undefined ? ctx.sizes[index] : undefined

    return (
        <Box
            ref={ref}
            data-orientation={ctx.orientation}
            {...getStyles('panel')}
            style={{
                flexBasis: size !== undefined ? `${size}%` : undefined,
                ...style
            }}
            {...others}
        >
            {children}
        </Box>
    )
})

SplitterPanel.classes = classes
SplitterPanel.displayName = '@react-ui/ui/SplitterPanel'

export namespace SplitterPanel {
    export type Props = SplitterPanelProps
    export type Factory = SplitterPanelFactory
}
