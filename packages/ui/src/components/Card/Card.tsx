import React from 'react'
import {
    Box,
    BoxProps,
    createVarsResolver,
    factory,
    Factory,
    getRadius,
    getShadow,
    getSize,
    UIColor,
    UIRadius,
    UIShadow,
    UISpacing,
    StylesApiProps,
    useProps,
    useStyles
} from '../../core'
import { CardSection } from './CardSection'
import classes from './Card.module.css'

export type CardStylesNames = 'root' | 'section'
export type CardCssVariables = {
    root: '--card-padding' | '--card-radius' | '--card-shadow' | '--card-bg'
}

export interface CardProps extends BoxProps, StylesApiProps<CardFactory> {
    /** Card content */
    children?: React.ReactNode

    /** Key of theme.spacing or any valid CSS value to set padding, numbers are converted to rem @default 'md' */
    padding?: UISpacing

    /** 主题圆角的键或任意有效的 CSS 值 to set border-radius, numbers are converted to rem @default theme.defaultRadius */
    radius?: UIRadius

    /** Key of theme.shadows or any valid CSS value to set box-shadow */
    shadow?: UIShadow

    /** Adds border to the root element @default false */
    withBorder?: boolean

    /** Background color, key of theme.colors or any valid CSS color */
    bg?: UIColor
}

export type CardFactory = Factory<{
    props: CardProps
    ref: HTMLDivElement
    stylesNames: CardStylesNames
    vars: CardCssVariables
    staticComponents: {
        Section: typeof CardSection
    }
}>

const defaultProps = {
    padding: 'md',
    withBorder: false
} satisfies Partial<CardProps>

const varsResolver = createVarsResolver<CardFactory>((_, { padding, radius, shadow, bg }) => ({
    root: {
        '--card-padding': getSize(padding, 'card-padding'),
        '--card-radius': radius === undefined ? undefined : getRadius(radius),
        '--card-shadow': getShadow(shadow),
        '--card-bg': bg
    }
}))

export const Card = factory<CardFactory>((_props, ref) => {
    const props = useProps('Card', defaultProps, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        padding,
        radius,
        shadow,
        withBorder,
        bg,
        children,
        mod,
        attributes,
        ...others
    } = props

    const getStyles = useStyles<CardFactory>({
        name: 'Card',
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
        <Box ref={ref} {...getStyles('root')} mod={[{ 'with-border': withBorder }, mod]} {...others}>
            {children}
        </Box>
    )
})

Card.Section = CardSection

Card.classes = classes
;(Card as any).varsResolver = varsResolver
Card.displayName = '@xiaoye-react/ui/Card'

export namespace Card {
    export type Props = CardProps
    export type StylesNames = CardStylesNames
    export type CssVariables = CardCssVariables
    export type Factory = CardFactory
}
