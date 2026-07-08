import {
    Box,
    BoxProps,
    createVarsResolver,
    ElementProps,
    factory,
    Factory,
    getRadius,
    getThemeColor,
    MantineColor,
    MantineRadius,
    parseThemeColor,
    rem,
    StylesApiProps,
    useProps,
    useStyles
} from '../../core'
import { getPositionVariables } from './get-position-variables/get-position-variables'
import { IndicatorPosition } from './Indicator.types'
import classes from './Indicator.module.css'

export type IndicatorPositionVariables =
    | '--indicator-top'
    | '--indicator-bottom'
    | '--indicator-left'
    | '--indicator-right'
    | '--indicator-translate-x'
    | '--indicator-translate-y'

export type IndicatorStylesNames = 'root' | 'indicator'
export type IndicatorCssVariables = {
    root:
        | '--indicator-color'
        | '--indicator-text-color'
        | '--indicator-size'
        | '--indicator-radius'
        | '--indicator-z-index'
        | IndicatorPositionVariables
}

export interface IndicatorProps extends BoxProps, StylesApiProps<IndicatorFactory>, ElementProps<'div'> {
    /** Indicator position relative to the target element @default 'top-end' */
    position?: IndicatorPosition

    /** Distance in pixels to offset the indicator from its default position @default 0 */
    offset?: number | { x: number; y: number }

    /** Changes container display from block to inline-block @default false */
    inline?: boolean

    /** Indicator width and height @default 10 */
    size?: number | string

    /** Label displayed inside the indicator */
    label?: React.ReactNode

    /** Key of `theme.radius` or any valid CSS value to set `border-radius` @default 100 */
    radius?: MantineRadius

    /** Key of `theme.colors` or any valid CSS color value @default theme.primaryColor */
    color?: MantineColor

    /** Adds border to the root element */
    withBorder?: boolean

    /** Hides the indicator when set */
    disabled?: boolean

    /** If set, the indicator has processing animation @default false */
    processing?: boolean

    /** Indicator z-index @default 200 */
    zIndex?: string | number

    /** If set, adjusts text color based on background color */
    autoContrast?: boolean

    /** Maximum value to display. If label is a number greater than this value, it will be displayed as `{maxValue}+` */
    maxValue?: number

    /** Determines whether indicator with label `0` should be displayed @default true */
    showZero?: boolean
}

export type IndicatorFactory = Factory<{
    props: IndicatorProps
    ref: HTMLDivElement
    stylesNames: IndicatorStylesNames
    vars: IndicatorCssVariables
}>

const defaultProps = {
    position: 'top-end',
    offset: 0,
    showZero: true
} satisfies Partial<IndicatorProps>

const varsResolver = createVarsResolver<IndicatorFactory>(
    (theme, { color, position, offset, size, radius, zIndex, autoContrast }) => {
        const textColor =
            autoContrast && color
                ? parseThemeColor({ color, theme }).isLight
                    ? 'var(--ui-color-black)'
                    : 'var(--ui-color-white)'
                : undefined

        return {
            root: {
                '--indicator-color': color ? getThemeColor(color, theme) : undefined,
                '--indicator-text-color': textColor,
                '--indicator-size': rem(size),
                '--indicator-radius': radius === undefined ? undefined : getRadius(radius),
                '--indicator-z-index': zIndex?.toString(),
                ...getPositionVariables(position, offset)
            }
        }
    }
)

export const Indicator = factory<IndicatorFactory>((_props, ref) => {
    const props = useProps('Indicator', defaultProps, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        children,
        position,
        offset,
        inline,
        label,
        radius,
        color,
        withBorder,
        disabled,
        processing,
        zIndex,
        autoContrast,
        maxValue,
        showZero,
        mod,
        attributes,
        ...others
    } = props

    const getStyles = useStyles<IndicatorFactory>({
        name: 'Indicator',
        classes,
        props,
        className,
        style,
        classNames,
        styles,
        unstyled,
        attributes,
        vars,
        varsResolver
    })

    const shouldHideZero = !showZero && (label === 0 || label === '0')
    const formattedLabel =
        maxValue !== undefined && typeof label === 'number' && label > maxValue ? `${maxValue}+` : label

    return (
        <Box {...getStyles('root')} ref={ref} mod={[{ inline }, mod]} {...others}>
            {!disabled && !shouldHideZero && (
                <Box mod={{ 'with-label': !!label, 'with-border': withBorder, processing }} {...getStyles('indicator')}>
                    {formattedLabel}
                </Box>
            )}
            {children}
        </Box>
    )
})

Indicator.classes = classes
;(Indicator as any).varsResolver = varsResolver
Indicator.displayName = '@react-ui/ui/Indicator'

export namespace Indicator {
    export type Props = IndicatorProps
    export type StylesNames = IndicatorStylesNames
    export type CssVariables = IndicatorCssVariables
    export type Factory = IndicatorFactory
}
