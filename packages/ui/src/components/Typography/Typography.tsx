import {
    Box,
    factory,
    useProps,
    useStyles,
    type BoxProps,
    type ElementProps,
    type Factory,
    type StylesApiProps
} from '../../core'
import classes from './Typography.module.css'

export type TypographyStylesNames = 'root'

export interface TypographyProps extends BoxProps, StylesApiProps<TypographyFactory>, ElementProps<'div'> {}

export type TypographyFactory = Factory<{
    props: TypographyProps
    ref: HTMLDivElement
    stylesNames: TypographyStylesNames
}>

export const Typography = factory<TypographyFactory>((_props, ref) => {
    const props = useProps('Typography', null, _props)
    const { classNames, className, style, styles, unstyled, vars, ...others } = props

    const getStyles = useStyles<TypographyFactory>({
        name: 'Typography',
        classes,
        props,
        className,
        style,
        classNames,
        styles,
        unstyled,
        vars
    })

    return <Box ref={ref} {...getStyles('root')} {...others} />
})

Typography.classes = classes
Typography.displayName = '@xiaoye-react/ui/Typography'

export namespace Typography {
    export type Props = TypographyProps
    export type StylesNames = TypographyStylesNames
    export type Factory = TypographyFactory
}
