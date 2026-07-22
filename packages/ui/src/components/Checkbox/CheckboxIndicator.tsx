import {
    Box,
    BoxProps,
    createVarsResolver,
    ElementProps,
    factory,
    Factory,
    getRadius,
    getSize,
    getThemeColor,
    UIColor,
    UIRadius,
    UISize,
    StylesApiProps,
    useProps,
    useStyles
} from '../../core'
import classes from './CheckboxIndicator.module.css'

export type CheckboxIndicatorStylesNames = 'indicator' | 'icon'
export type CheckboxIndicatorVariant = 'filled' | 'outline'
export type CheckboxIndicatorCssVariables = {
    indicator: '--checkbox-size' | '--checkbox-radius' | '--checkbox-color' | '--checkbox-icon-color'
}

export interface CheckboxIndicatorProps
    extends BoxProps, StylesApiProps<CheckboxIndicatorFactory>, ElementProps<'div'> {
    /** 主题颜色的键或任意有效的 CSS 颜色 to set input background color in checked state @default theme.primaryColor */
    color?: UIColor

    /** Controls size of the component @default 'sm' */
    size?: UISize | (string & {}) | number

    /** 主题圆角的键或任意有效的 CSS 值 to set border-radius @default theme.defaultRadius */
    radius?: UIRadius

    /** Color of the check icon */
    iconColor?: UIColor

    /** Indeterminate state of the checkbox. If set, `checked` prop is ignored. */
    indeterminate?: boolean

    /** Icon for checked or indeterminate state */
    icon?: React.ReactNode

    /** Determines whether the component should have checked styles */
    checked?: boolean

    /** Indicates disabled state */
    disabled?: boolean
}

export type CheckboxIndicatorFactory = Factory<{
    props: CheckboxIndicatorProps
    ref: HTMLDivElement
    stylesNames: CheckboxIndicatorStylesNames
    vars: CheckboxIndicatorCssVariables
    variant: CheckboxIndicatorVariant
}>

const defaultCheckIcon = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <polyline points="20 6 9 17 4 12" />
    </svg>
)

const defaultIndeterminateIcon = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
)

const defaultProps = {
    variant: 'filled',
    radius: 'sm',
    size: 'sm'
} satisfies Partial<CheckboxIndicatorProps>

const varsResolver = createVarsResolver<CheckboxIndicatorFactory>(
    (theme, { radius, color, size, iconColor }) => ({
        indicator: {
            '--checkbox-size': getSize(size, 'checkbox-size'),
            '--checkbox-radius': radius === undefined ? undefined : getRadius(radius),
            '--checkbox-color': color ? getThemeColor(color, theme) : undefined,
            '--checkbox-icon-color': iconColor ? getThemeColor(iconColor, theme) : undefined
        }
    })
)

export const CheckboxIndicator = factory<CheckboxIndicatorFactory>((_props, ref) => {
    const props = useProps('CheckboxIndicator', defaultProps, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        icon,
        indeterminate,
        radius,
        color,
        iconColor,
        checked,
        mod,
        variant,
        disabled,
        attributes,
        ...others
    } = props

    const getStyles = useStyles<CheckboxIndicatorFactory>({
        name: 'CheckboxIndicator',
        classes,
        props,
        className,
        style,
        classNames,
        styles,
        unstyled,
        attributes,
        vars,
        varsResolver,
        rootSelector: 'indicator'
    })

    const _checked = typeof checked === 'boolean' || typeof indeterminate === 'boolean'
        ? checked || indeterminate
        : false

    return (
        <Box
            ref={ref}
            variant={variant}
            mod={[{ checked: _checked, disabled, indeterminate }, mod]}
            {...getStyles('indicator', { variant })}
            {...others}
        >
            <span {...getStyles('icon')}>
                {icon || (indeterminate ? defaultIndeterminateIcon : defaultCheckIcon)}
            </span>
        </Box>
    )
})

CheckboxIndicator.classes = classes
;(CheckboxIndicator as any).varsResolver = varsResolver
CheckboxIndicator.displayName = '@xiaoye-react/ui/CheckboxIndicator'

export namespace CheckboxIndicator {
    export type Props = CheckboxIndicatorProps
    export type StylesNames = CheckboxIndicatorStylesNames
    export type CssVariables = CheckboxIndicatorCssVariables
    export type Factory = CheckboxIndicatorFactory
}
