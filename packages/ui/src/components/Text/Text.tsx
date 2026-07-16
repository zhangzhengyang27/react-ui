import {
    Box,
    BoxProps,
    createVarsResolver,
    getFontSize,
    getGradient,
    getLineHeight,
    UIFontSize,
    UIGradient,
    UILineHeight,
    polymorphicFactory,
    PolymorphicFactory,
    StylesApiProps,
    useProps,
    useStyles
} from '../../core'
import classes from './Text.module.css'

type TextTruncate = 'end' | 'start' | boolean

function getTextTruncate(truncate: TextTruncate | undefined) {
    if (truncate === 'start') {
        return 'start'
    }
    if (truncate === 'end' || truncate) {
        return 'end'
    }
    return undefined
}

export type TextStylesNames = 'root'
export type TextVariant = 'text' | 'gradient'
export type TextCssVariables = {
    root: '--text-gradient' | '--text-line-clamp' | '--text-fz' | '--text-lh' | '--text-text-wrap'
}

export interface TextProps extends BoxProps, StylesApiProps<TextFactory> {
    __staticSelector?: string

    /** Controls font-size and line-height @default 'md' */
    size?: UIFontSize | UILineHeight

    /** Number of lines after which Text will be truncated */
    lineClamp?: number

    /** Side on which Text must be truncated, if true, text is truncated from the start */
    truncate?: TextTruncate

    /** Sets line-height to 1 for centering @default false */
    inline?: boolean

    /** Determines whether font properties should be inherited from the parent @default false */
    inherit?: boolean

    /** Gradient configuration, ignored when variant is not gradient @default theme.defaultGradient */
    gradient?: UIGradient

    /** Shorthand for component="span" */
    span?: boolean

    /** Controls text-wrap CSS property */
    textWrap?: 'wrap' | 'nowrap' | 'balance' | 'pretty' | 'stable'
}

export type TextFactory = PolymorphicFactory<{
    props: TextProps
    defaultComponent: 'p'
    defaultRef: HTMLParagraphElement
    stylesNames: TextStylesNames
    vars: TextCssVariables
    variant: TextVariant
}>

const defaultProps = {
    inherit: false
} satisfies Partial<TextProps>

const varsResolver = createVarsResolver<TextFactory>((theme, { variant, lineClamp, gradient, size, textWrap }) => ({
    root: {
        '--text-fz': getFontSize(size),
        '--text-lh': getLineHeight(size),
        '--text-gradient': variant === 'gradient' ? getGradient(gradient, theme) : undefined,
        '--text-line-clamp': typeof lineClamp === 'number' ? lineClamp.toString() : undefined,
        '--text-text-wrap': textWrap
    }
}))

/**
 * 文本组件。对齐 ui Text（polymorphicFactory + useStyles + varsResolver + CSS module）。
 * 支持 size/lineClamp/truncate/inline/inherit/gradient/span/textWrap。
 */
export const Text = polymorphicFactory<TextFactory>((_props, _ref) => {
    const props = useProps('Text', defaultProps, _props)
    const {
        lineClamp,
        truncate,
        inline,
        inherit,
        gradient,
        span,
        textWrap,
        __staticSelector,
        vars,
        className,
        style,
        classNames,
        styles,
        unstyled,
        variant,
        mod,
        size,
        attributes,
        ...others
    } = props

    const getStyles = useStyles<TextFactory>({
        name: ['Text', __staticSelector],
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
            {...getStyles('root', { focusable: true })}
            ref={_ref}
            component={span ? 'span' : 'p'}
            variant={variant}
            mod={[
                {
                    'data-truncate': getTextTruncate(truncate),
                    'data-line-clamp': typeof lineClamp === 'number',
                    'data-inline': inline,
                    'data-inherit': inherit
                },
                mod
            ]}
            size={size}
            {...others}
        />
    )
})

Text.classes = classes
;(Text as any).varsResolver = varsResolver
Text.displayName = '@react-ui/ui/Text'

export namespace Text {
    export type Props = TextProps
    export type StylesNames = TextStylesNames
    export type CssVariables = TextCssVariables
    export type Factory = TextFactory
    export type Variant = TextVariant
}
