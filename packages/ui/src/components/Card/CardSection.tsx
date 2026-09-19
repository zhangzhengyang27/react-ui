import React from 'react'
import { AnchorPassthroughProps, Box, BoxProps, factory, Factory, StylesApiProps, useProps, useStyles } from '../../core'
import classes from './Card.module.css'

export type CardSectionStylesNames = 'section'

export interface CardSectionProps extends BoxProps, AnchorPassthroughProps, StylesApiProps<CardSectionFactory> {
    /** Card.Section content */
    children?: React.ReactNode

    /** Adds border to the top and bottom of the section @default false */
    withBorder?: boolean

    /** Inherits padding from the parent Card component @default false */
    inheritPadding?: boolean
}

export type CardSectionFactory = Factory<{
    props: CardSectionProps
    ref: HTMLDivElement
    stylesNames: CardSectionStylesNames
}>

const defaultProps = {
    withBorder: false,
    inheritPadding: false
} satisfies Partial<CardSectionProps>

export const CardSection = factory<CardSectionFactory>((_props, ref) => {
    const props = useProps('CardSection', defaultProps, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        children,
        withBorder,
        inheritPadding,
        mod,
        attributes,
        ...others
    } = props

    const getStyles = useStyles<CardSectionFactory>({
        name: 'Card',
        props,
        classes,
        className,
        style,
        classNames,
        styles,
        unstyled,
        attributes,
        rootSelector: 'section'
    })

    return (
        <Box
            ref={ref}
            {...getStyles('section')}
            mod={[{ 'with-border': withBorder, 'inherit-padding': inheritPadding }, mod]}
            {...others}
        >
            {children}
        </Box>
    )
})

CardSection.classes = classes
CardSection.displayName = '@xiaoye-react/ui/CardSection'

export namespace CardSection {
    export type Props = CardSectionProps
    export type StylesNames = CardSectionStylesNames
    export type Factory = CardSectionFactory
}
