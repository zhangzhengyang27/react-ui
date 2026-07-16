import {
    Box,
    BoxProps,
    createVarsResolver,
    getRadius,
    getSize,
    getThemeColor,
    UIColor,
    UIGradient,
    UIRadius,
    UISize,
    polymorphicFactory,
    PolymorphicFactory,
    StylesApiProps,
    useProps,
    useStyles
} from '../../core'
import classes from './Badge.module.css'

export type BadgeStylesNames = 'root' | 'section' | 'label'
export type BadgeVariant = 'filled' | 'light' | 'outline' | 'dot' | 'transparent' | 'white' | 'default' | 'gradient'

export type BadgeCssVariables = {
    root:
        | '--badge-height'
        | '--badge-padding-x'
        | '--badge-fz'
        | '--badge-radius'
        | '--badge-bg'
        | '--badge-color'
        | '--badge-bd'
        | '--badge-dot-color'
}

export interface BadgeProps extends BoxProps, StylesApiProps<BadgeFactory> {
    /** Controls `font-size`, `height` and horizontal `padding` @default 'md' */
    size?: UISize | (string & {})

    /** If set, badge `min-width` becomes equal to its `height` and horizontal padding is removed */
    circle?: boolean

    /** Key of `theme.radius` or any valid CSS value to set `border-radius` @default 'xl' */
    radius?: UIRadius

    /** Key of `theme.colors` or any valid CSS color @default theme.primaryColor */
    color?: UIColor

    /** Gradient configuration used when `variant="gradient"` @default theme.defaultGradient */
    gradient?: UIGradient

    /** Content displayed on the left side of the badge label */
    leftSection?: React.ReactNode

    /** Content displayed on the right side of the badge label */
    rightSection?: React.ReactNode

    /** Determines whether Badge should take 100% of its parent width @default false */
    fullWidth?: boolean

    /** Main badge content */
    children?: React.ReactNode

    /** If set, adjusts text color based on background color for `filled` variant */
    autoContrast?: boolean
}

export type BadgeFactory = PolymorphicFactory<{
    props: BadgeProps
    defaultRef: HTMLDivElement
    defaultComponent: 'div'
    stylesNames: BadgeStylesNames
    vars: BadgeCssVariables
    variant: BadgeVariant
}>

const varsResolver = createVarsResolver<BadgeFactory>(
    (theme, { radius, color, gradient, variant, size, autoContrast, circle }) => {
        const colors = theme.variantColorResolver({
            color: color || theme.primaryColor,
            theme,
            gradient,
            variant: variant || 'filled',
            autoContrast
        })

        return {
            root: {
                '--badge-height': getSize(size, 'badge-height'),
                '--badge-padding-x': getSize(size, 'badge-padding-x'),
                '--badge-fz': getSize(size, 'badge-fz'),
                '--badge-radius': circle || radius === undefined ? undefined : getRadius(radius),
                '--badge-bg': color || variant ? colors.background : undefined,
                '--badge-color': color || variant ? colors.color : undefined,
                '--badge-bd': color || variant ? colors.border : undefined,
                '--badge-dot-color': variant === 'dot' ? getThemeColor(color, theme) : undefined
            }
        }
    }
)

export const Badge = polymorphicFactory<BadgeFactory>((_props, _ref) => {
    const props = useProps('Badge', null, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        leftSection,
        rightSection,
        children,
        variant,
        fullWidth,
        circle,
        mod,
        attributes,
        ...others
    } = props

    const getStyles = useStyles<BadgeFactory>({
        name: 'Badge',
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

    return (
        <Box
            ref={_ref}
            variant={variant}
            mod={[
                {
                    block: fullWidth,
                    circle,
                    'with-right-section': !!rightSection,
                    'with-left-section': !!leftSection
                },
                mod
            ]}
            {...getStyles('root', { variant })}
            {...others}
        >
            {leftSection && (
                <span {...getStyles('section')} data-position="left">
                    {leftSection}
                </span>
            )}
            <span {...getStyles('label')}>{children}</span>
            {rightSection && (
                <span {...getStyles('section')} data-position="right">
                    {rightSection}
                </span>
            )}
        </Box>
    )
})

Badge.classes = classes
;(Badge as any).varsResolver = varsResolver
Badge.displayName = '@react-ui/ui/Badge'

export namespace Badge {
    export type Props = BadgeProps
    export type StylesNames = BadgeStylesNames
    export type CssVariables = BadgeCssVariables
    export type Variant = BadgeVariant
    export type Factory = BadgeFactory
}
