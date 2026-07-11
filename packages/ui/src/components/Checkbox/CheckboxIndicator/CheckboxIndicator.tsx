import { Box, BoxProps, ElementProps, factory, Factory, MantineSize, StylesApiProps, useProps, useStyles } from '../../../core'
import classes from '../Checkbox.module.css'

export interface CheckboxIndicatorProps extends BoxProps, StylesApiProps<CheckboxIndicatorFactory>, ElementProps<'span'> {
    size?: MantineSize | (string & {}) | number
    checked?: boolean
    indeterminate?: boolean
    disabled?: boolean
}

export type CheckboxIndicatorFactory = Factory<{
    props: CheckboxIndicatorProps
    ref: HTMLSpanElement
    stylesNames: 'inner' | 'icon'
}>

const defaultProps = {
    size: 'sm'
} satisfies Partial<CheckboxIndicatorProps>

const checkIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
    </svg>
)

const indeterminateIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
)

export const CheckboxIndicator = factory<CheckboxIndicatorFactory>((_props, ref) => {
    const props = useProps('CheckboxIndicator', defaultProps, _props)
    const { checked, indeterminate, disabled, className, style, classNames, styles, unstyled, vars, ...others } = props

    const getStyles = useStyles<CheckboxIndicatorFactory>({
        name: 'Checkbox',
        classes,
        props,
        className,
        style,
        classNames,
        styles,
        unstyled,
        vars
    })

    const showIcon = checked || indeterminate

    return (
        <Box component="span" ref={ref} mod={{ disabled }} {...others}>
            <span
                {...getStyles('inner')}
                data-checked={checked || undefined}
                data-indeterminate={indeterminate || undefined}
            >
                {showIcon && <span {...getStyles('icon')}>{indeterminate ? indeterminateIcon : checkIcon}</span>}
            </span>
        </Box>
    )
})

CheckboxIndicator.displayName = '@react-ui/ui/CheckboxIndicator'
