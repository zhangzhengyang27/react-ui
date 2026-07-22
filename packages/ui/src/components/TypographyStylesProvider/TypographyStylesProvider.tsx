import { Box, BoxProps, polymorphicFactory, PolymorphicFactory, StylesApiProps, useProps, useStyles } from '../../core'
import classes from './TypographyStylesProvider.module.css'

export type TypographyStylesProviderStylesNames = 'root'

export interface TypographyStylesProviderProps extends BoxProps, StylesApiProps<TypographyStylesProviderFactory> {
    /** HTML content that should have typography styles applied */
    children?: React.ReactNode
}

export type TypographyStylesProviderFactory = PolymorphicFactory<{
    props: TypographyStylesProviderProps
    defaultComponent: 'div'
    defaultRef: HTMLDivElement
    stylesNames: TypographyStylesProviderStylesNames
}>

export const TypographyStylesProvider = polymorphicFactory<TypographyStylesProviderFactory>((_props, _ref) => {
    const props = useProps('TypographyStylesProvider', null, _props)
    const { classNames, className, style, styles, unstyled, vars, mod, attributes, children, ...others } = props

    const getStyles = useStyles<TypographyStylesProviderFactory>({
        name: 'TypographyStylesProvider',
        props,
        classes,
        className,
        style,
        classNames,
        styles,
        unstyled,
        attributes,
        vars
    })

    return (
        <Box ref={_ref} mod={mod} {...getStyles('root')} {...others}>
            {children}
        </Box>
    )
})

TypographyStylesProvider.classes = classes
TypographyStylesProvider.displayName = '@xiaoye-react/ui/TypographyStylesProvider'

export namespace TypographyStylesProvider {
    export type Props = TypographyStylesProviderProps
    export type Factory = TypographyStylesProviderFactory
    export type StylesNames = TypographyStylesProviderStylesNames
}
