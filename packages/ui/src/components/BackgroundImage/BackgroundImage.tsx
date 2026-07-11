import {
    Box,
    createVarsResolver,
    getRadius,
    polymorphicFactory,
    useProps,
    useStyles,
    type BoxProps,
    type MantineRadius,
    type PolymorphicFactory,
    type StylesApiProps
} from '../../core'
import classes from './BackgroundImage.module.css'

export type BackgroundImageStylesNames = 'root'
export type BackgroundImageCssVariables = {
    root: '--background-image-radius'
}

export interface BackgroundImageProps extends BoxProps, StylesApiProps<BackgroundImageFactory> {
    radius?: MantineRadius
    src: string
}

export type BackgroundImageFactory = PolymorphicFactory<{
    props: BackgroundImageProps
    defaultRef: HTMLDivElement
    defaultComponent: 'div'
    stylesNames: BackgroundImageStylesNames
    vars: BackgroundImageCssVariables
}>

const varsResolver = createVarsResolver<BackgroundImageFactory>((_, { radius }) => ({
    root: { '--background-image-radius': radius === undefined ? undefined : getRadius(radius) }
}))

export const BackgroundImage = polymorphicFactory<BackgroundImageFactory>((_props, ref) => {
    const props = useProps('BackgroundImage', null, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        radius,
        src,
        variant,
        ...others
    } = props

    const getStyles = useStyles<BackgroundImageFactory>({
        name: 'BackgroundImage',
        classes,
        props,
        className,
        style,
        classNames,
        styles,
        unstyled,
        vars,
        varsResolver
    })

    return (
        <Box
            ref={ref}
            variant={variant}
            {...getStyles('root', { style: { backgroundImage: `url(${src})` } })}
            {...others}
        />
    )
})

BackgroundImage.classes = classes
BackgroundImage.varsResolver = varsResolver
BackgroundImage.displayName = '@react-ui/ui/BackgroundImage'

export namespace BackgroundImage {
    export type Props = BackgroundImageProps
    export type CssVariables = BackgroundImageCssVariables
    export type Factory = BackgroundImageFactory
    export type StylesNames = BackgroundImageStylesNames
}
