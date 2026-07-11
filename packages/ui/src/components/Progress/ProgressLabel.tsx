import {
    Box,
    factory,
    useProps,
    type BoxProps,
    type ElementProps,
    type Factory,
    type StylesApiProps
} from '../../core'
import { useProgressContext } from './Progress.context'
import classes from './Progress.module.css'

export type ProgressLabelStylesNames = 'label'

export interface ProgressLabelProps
    extends BoxProps,
        StylesApiProps<ProgressLabelFactory>,
        ElementProps<'span'> {
    /** Label content */
    children?: React.ReactNode
}

export type ProgressLabelFactory = Factory<{
    props: ProgressLabelProps
    ref: HTMLSpanElement
    stylesNames: ProgressLabelStylesNames
}>

const defaultProps = {} satisfies Partial<ProgressLabelProps>

export const ProgressLabel = factory<ProgressLabelFactory>((_props, ref) => {
    const props = useProps('ProgressLabel', defaultProps, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        children,
        ...others
    } = props

    const ctx = useProgressContext()
    const getStyles = ctx?.getStyles

    const labelStyle = getStyles
        ? getStyles('label', { className, classNames, style, styles })
        : { className, style }

    return (
        <Box
            component="span"
            ref={ref}
            {...labelStyle}
            {...others}
        >
            {children}
        </Box>
    )
})

ProgressLabel.classes = classes
ProgressLabel.displayName = '@react-ui/ui/ProgressLabel'

export namespace ProgressLabel {
    export type Props = ProgressLabelProps
    export type Factory = ProgressLabelFactory
}
