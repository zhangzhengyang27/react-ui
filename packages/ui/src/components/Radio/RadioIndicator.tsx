import {
    Box,
    factory,
    useProps,
    type BoxProps,
    type ElementProps,
    type Factory,
    type MantineColor,
    type MantineSize,
    type StylesApiProps
} from '../../core'
import classes from './Radio.module.css'

export type RadioIndicatorStylesNames = 'indicator'

export interface RadioIndicatorProps
    extends BoxProps,
        StylesApiProps<RadioIndicatorFactory>,
        ElementProps<'span'> {
    /** If set, indicator is in checked state */
    checked?: boolean

    /** If set, indicator is disabled */
    disabled?: boolean

    /** Key of theme.colors or any valid CSS color */
    color?: MantineColor

    /** Controls indicator size */
    size?: MantineSize | (string & {})
}

export type RadioIndicatorFactory = Factory<{
    props: RadioIndicatorProps
    ref: HTMLSpanElement
    stylesNames: RadioIndicatorStylesNames
}>

const defaultProps = {} satisfies Partial<RadioIndicatorProps>

export const RadioIndicator = factory<RadioIndicatorFactory>((_props, ref) => {
    const props = useProps('RadioIndicator', defaultProps, _props)
    const { classNames, className, style, styles, unstyled, vars, checked, disabled, mod, ...others } = props

    return (
        <Box
            component="span"
            ref={ref}
            {...others}
            mod={[{ checked, disabled }, mod]}
            data-radio-indicator
        />
    )
})

RadioIndicator.classes = classes
RadioIndicator.displayName = '@react-ui/ui/RadioIndicator'

export namespace RadioIndicator {
    export type Props = RadioIndicatorProps
    export type Factory = RadioIndicatorFactory
}
