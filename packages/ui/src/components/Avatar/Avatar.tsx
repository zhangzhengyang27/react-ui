import { useState } from 'react'
import {
    Box,
    BoxProps,
    createVarsResolver,
    factory,
    Factory,
    getRadius,
    getSize,
    MantineColor,
    MantineRadius,
    MantineSize,
    StylesApiProps,
    useProps,
    useStyles
} from '../../core'
import classes from './Avatar.module.css'

export type AvatarStylesNames = 'root' | 'image' | 'placeholder'
export type AvatarVariant = 'filled' | 'light' | 'outline'

export type AvatarCssVariables = {
    root: '--avatar-size' | '--avatar-radius' | '--avatar-bg' | '--avatar-color' | '--avatar-bd'
}

export interface AvatarProps extends BoxProps, StylesApiProps<AvatarFactory> {
    /** Image src */
    src?: string

    /** Image alt text, also used as title attribute */
    alt?: string

    /** Controls width and height of the avatar @default 'md' */
    size?: MantineSize | (string & {}) | number

    /** Key of theme.radius or any valid CSS value @default theme.defaultRadius */
    radius?: MantineRadius

    /** Key of theme.colors or any valid CSS color @default theme.primaryColor */
    color?: MantineColor

    /** Avatar variant @default 'filled' */
    variant?: AvatarVariant

    /** Fallback content rendered when image fails to load or no src is provided */
    children?: React.ReactNode
}

export type AvatarFactory = Factory<{
    props: AvatarProps
    ref: HTMLDivElement
    stylesNames: AvatarStylesNames
    vars: AvatarCssVariables
    variant: AvatarVariant
}>

const defaultProps = {
    variant: 'filled',
    size: 'md'
} satisfies Partial<AvatarProps>

const varsResolver = createVarsResolver<AvatarFactory>((theme, { size, radius, color, variant }) => {
    const colors = theme.variantColorResolver({
        color: color || theme.primaryColor,
        theme,
        variant: variant || 'filled'
    })

    return {
        root: {
            '--avatar-size': getSize(size, 'avatar-size'),
            '--avatar-radius': radius === undefined ? undefined : getRadius(radius),
            '--avatar-bg': color || variant ? colors.background : undefined,
            '--avatar-color': colors.color,
            '--avatar-bd': color || variant ? colors.border : undefined
        }
    }
})

export const Avatar = factory<AvatarFactory>((_props, ref) => {
    const props = useProps('Avatar', defaultProps, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        src,
        alt,
        size,
        radius,
        color,
        variant,
        children,
        ...others
    } = props

    const getStyles = useStyles<AvatarFactory>({
        name: 'Avatar',
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

    const [error, setError] = useState(false)
    const isPlaceholder = error || !src

    return (
        <Box
            ref={ref}
            variant={variant}
            mod={{ placeholder: isPlaceholder }}
            title={alt}
            {...getStyles('root', { variant })}
            {...others}
        >
            {isPlaceholder ? (
                <span {...getStyles('placeholder')}>{children}</span>
            ) : (
                <img {...getStyles('image')} src={src} alt={alt} onError={() => setError(true)} />
            )}
        </Box>
    )
})

Avatar.classes = classes
Avatar.displayName = '@react-ui/ui/Avatar'

export namespace Avatar {
    export type Props = AvatarProps
    export type StylesNames = AvatarStylesNames
    export type CssVariables = AvatarCssVariables
    export type Factory = AvatarFactory
    export type Variant = AvatarVariant
}
