import {
    Box,
    BoxProps,
    createVarsResolver,
    factory,
    Factory,
    getRadius,
    getSize,
    UIColor,
    UIRadius,
    UISize,
    StylesApiProps,
    useProps,
    useStyles
} from '../../core'
import classes from './ThemeIcon.module.css'

export type ThemeIconStylesNames = 'root'
export type ThemeIconVariant = 'filled' | 'light' | 'outline' | 'default'

export type ThemeIconCssVariables = {
    root: '--ti-size' | '--ti-radius' | '--ti-bg' | '--ti-color' | '--ti-bd'
}

export interface ThemeIconProps extends BoxProps, StylesApiProps<ThemeIconFactory> {
    /** Icon rendered inside the theme icon */
    children?: React.ReactNode

    /** Controls width and height of the icon container @default 'md' */
    size?: UISize | (string & {}) | number

    /** 主题圆角的键或任意有效的 CSS 值 @default theme.defaultRadius */
    radius?: UIRadius

    /** 主题颜色的键或任意有效的 CSS 颜色 @default theme.primaryColor */
    color?: UIColor

    /** ThemeIcon variant @default 'filled' */
    variant?: ThemeIconVariant
}

export type ThemeIconFactory = Factory<{
    props: ThemeIconProps
    ref: HTMLDivElement
    stylesNames: ThemeIconStylesNames
    vars: ThemeIconCssVariables
    variant: ThemeIconVariant
}>

const defaultProps = {
    variant: 'filled',
    size: 'md'
} satisfies Partial<ThemeIconProps>

const varsResolver = createVarsResolver<ThemeIconFactory>((theme, { size, radius, color, variant }) => {
    const colors = theme.variantColorResolver({
        color: color || theme.primaryColor,
        theme,
        variant: variant || 'filled'
    })

    return {
        root: {
            '--ti-size': getSize(size, 'ti-size'),
            '--ti-radius': radius === undefined ? undefined : getRadius(radius),
            '--ti-bg': color || variant ? colors.background : undefined,
            '--ti-color': colors.color,
            '--ti-bd': color || variant ? colors.border : undefined
        }
    }
})

export const ThemeIcon = factory<ThemeIconFactory>((_props, ref) => {
    const props = useProps('ThemeIcon', defaultProps, _props)
    const { classNames, className, style, styles, unstyled, vars, size, radius, color, variant, children, ...others } =
        props

    const getStyles = useStyles<ThemeIconFactory>({
        name: 'ThemeIcon',
        props,
        classes,
        className,
        style,
        classNames,
        styles,
        unstyled,
        vars,
        varsResolver
    })

    return (
        <Box ref={ref} variant={variant} {...getStyles('root', { variant })} {...others}>
            {children}
        </Box>
    )
})

ThemeIcon.classes = classes
ThemeIcon.displayName = '@react-ui/ui/ThemeIcon'

export namespace ThemeIcon {
    export type Props = ThemeIconProps
    export type StylesNames = ThemeIconStylesNames
    export type CssVariables = ThemeIconCssVariables
    export type Factory = ThemeIconFactory
    export type Variant = ThemeIconVariant
}
