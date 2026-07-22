import {
    Box,
    BoxProps,
    createVarsResolver,
    getRadius,
    UIRadius,
    polymorphicFactory,
    PolymorphicFactory,
    rem,
    StylesApiProps,
    useProps,
    useStyles
} from '../../core'
import classes from './ColorSwatch.module.css'

export type ColorSwatchStylesNames = 'root' | 'alphaOverlay' | 'shadowOverlay' | 'colorOverlay' | 'childrenOverlay'

export type ColorSwatchCssVariables = {
    root: '--cs-radius' | '--cs-size'
}

export interface ColorSwatchProps extends BoxProps, StylesApiProps<ColorSwatchFactory> {
    /** Valid CSS color to display */
    color: string

    /** Swatch `width` and `height`, any valid CSS value, numbers are converted to rem. @default 28 */
    size?: React.CSSProperties['width']

    /** Key of `theme.radius` or any valid CSS value to set `border-radius`, numbers are converted to rem. @default 1000 */
    radius?: UIRadius

    /** If set, the swatch has inner `box-shadow` @default true */
    withShadow?: boolean

    /** Children inside the swatch */
    children?: React.ReactNode

    /** Root element or component to render */
    component?: React.ElementType
}

export type ColorSwatchFactory = PolymorphicFactory<{
    props: ColorSwatchProps
    defaultRef: HTMLDivElement
    defaultComponent: 'div'
    stylesNames: ColorSwatchStylesNames
    vars: ColorSwatchCssVariables
}>

const defaultProps = {
    withShadow: true
} satisfies Partial<ColorSwatchProps>

const varsResolver = createVarsResolver<ColorSwatchFactory>((_, { radius, size }) => ({
    root: {
        '--cs-radius': radius === undefined ? undefined : getRadius(radius),
        '--cs-size': rem(size)
    }
}))

export const ColorSwatch = polymorphicFactory<ColorSwatchFactory>((_props, ref) => {
    const props = useProps('ColorSwatch', defaultProps, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        color,
        radius,
        withShadow,
        children,
        component,
        ...others
    } = props

    const getStyles = useStyles<ColorSwatchFactory>({
        name: 'ColorSwatch',
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
        <Box<any> component={component || 'div'} ref={ref} {...getStyles('root', { focusable: true })} {...others}>
            <span {...getStyles('alphaOverlay')} />
            {withShadow && <span {...getStyles('shadowOverlay')} />}
            <span {...getStyles('colorOverlay', { style: { backgroundColor: color } })} />
            <span {...getStyles('childrenOverlay')}>{children}</span>
        </Box>
    )
})

ColorSwatch.classes = classes
;(ColorSwatch as any).varsResolver = varsResolver
ColorSwatch.displayName = '@xiaoye-react/ui/ColorSwatch'

export namespace ColorSwatch {
    export type Props = ColorSwatchProps
    export type CssVariables = ColorSwatchCssVariables
    export type Factory = ColorSwatchFactory
    export type StylesNames = ColorSwatchStylesNames
}
