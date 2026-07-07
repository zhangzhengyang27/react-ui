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
    rgba,
    StylesApiProps,
    useProps,
    useStyles
} from '../../core'
import classes from './Blockquote.module.css'

export type BlockquoteStylesNames = 'root' | 'icon' | 'cite'
export type BlockquoteCssVariables = {
    root: '--bq-bg' | '--bq-bd' | '--bq-icon-size' | '--bq-radius' | '--bq-text-wrap'
}

export interface BlockquoteProps
    extends BoxProps,
        StylesApiProps<BlockquoteFactory>,
        ElementProps<'blockquote', 'cite'> {
    /** Blockquote icon, displayed at the top left side */
    icon?: React.ReactNode

    /** Controls icon `width` and `height`, numbers are converted to rem @default 48 */
    iconSize?: number | string

    /** Key of `theme.colors` or any valid CSS color @default theme.primaryColor */
    color?: MantineColor

    /** Key of `theme.radius` or any valid CSS value to set `border-radius` @default theme.defaultRadius */
    radius?: MantineRadius

    /** Reference to a cited quote */
    cite?: React.ReactNode

    /** Controls `text-wrap` CSS property */
    textWrap?: 'wrap' | 'nowrap' | 'balance' | 'pretty' | 'stable'
}

export type BlockquoteFactory = Factory<{
    props: BlockquoteProps
    ref: HTMLQuoteElement
    stylesNames: BlockquoteStylesNames
    vars: BlockquoteCssVariables
}>

const defaultProps = {
    iconSize: 48
} satisfies Partial<BlockquoteProps>

const varsResolver = createVarsResolver<BlockquoteFactory>((theme, { color, iconSize, radius, textWrap }) => {
    const parsed = parseThemeColor({
        color: color || theme.primaryColor,
        theme
    })

    return {
        root: {
            '--bq-bg': rgba(parsed.value, 0.07),
            '--bq-bd': getThemeColor(color, theme),
            '--bq-icon-size': rem(iconSize),
            '--bq-radius': getRadius(radius),
            '--bq-text-wrap': textWrap
        }
    }
})

export const Blockquote = factory<BlockquoteFactory>(_props => {
    const props = useProps('Blockquote', defaultProps, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        children,
        icon,
        iconSize,
        cite,
        textWrap,
        attributes,
        ...others
    } = props

    const getStyles = useStyles<BlockquoteFactory>({
        name: 'Blockquote',
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

    return (
        <Box component="blockquote" {...getStyles('root')} {...others}>
            {icon && <span {...getStyles('icon')}>{icon}</span>}
            {children}
            {cite && <cite {...getStyles('cite')}>{cite}</cite>}
        </Box>
    )
})

Blockquote.classes = classes
;(Blockquote as any).varsResolver = varsResolver
Blockquote.displayName = '@react-ui/ui/Blockquote'

export namespace Blockquote {
    export type Props = BlockquoteProps
    export type StylesNames = BlockquoteStylesNames
    export type CssVariables = BlockquoteCssVariables
    export type Factory = BlockquoteFactory
}
