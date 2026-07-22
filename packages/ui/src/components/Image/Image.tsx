import React, { useState } from 'react'
import {
    Box,
    BoxProps,
    createVarsResolver,
    factory,
    Factory,
    getRadius,
    UIRadius,
    rem,
    StylesApiProps,
    useProps,
    useStyles
} from '../../core'
import classes from './Image.module.css'

export type ImageStylesNames = 'root' | 'image' | 'fallback'
export type ImageCssVariables = {
    root: '--image-radius' | '--image-width' | '--image-height' | '--image-fit'
}

export interface ImageProps extends BoxProps, StylesApiProps<ImageFactory> {
    /** Image src */
    src?: string

    /** Image alt text */
    alt?: string

    /** Image width */
    width?: React.CSSProperties['width']

    /** Image height */
    height?: React.CSSProperties['height']

    /** Object-fit style @default 'cover' */
    fit?: React.CSSProperties['objectFit']

    /** 主题圆角的键或任意有效的 CSS 值 to set border-radius, numbers are converted to rem @default theme.defaultRadius */
    radius?: UIRadius

    /** Fallback image src displayed when main image fails to load */
    fallbackSrc?: string

    /** Fallback content displayed when image fails to load */
    fallback?: React.ReactNode

    /** Called when image is loaded */
    onLoad?: React.ReactEventHandler<HTMLImageElement>

    /** Called when image fails to load */
    onError?: React.ReactEventHandler<HTMLImageElement>
}

export type ImageFactory = Factory<{
    props: ImageProps
    ref: HTMLImageElement
    stylesNames: ImageStylesNames
    vars: ImageCssVariables
}>

const defaultProps = {
    fit: 'cover'
} satisfies Partial<ImageProps>

const varsResolver = createVarsResolver<ImageFactory>((_, { radius, width, height, fit }) => ({
    root: {
        '--image-radius': radius === undefined ? undefined : getRadius(radius),
        '--image-width': width !== undefined ? rem(width) : undefined,
        '--image-height': height !== undefined ? rem(height) : undefined,
        '--image-fit': fit
    }
}))

export const Image = factory<ImageFactory>((_props, ref) => {
    const props = useProps('Image', defaultProps, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        src,
        alt,
        width,
        height,
        fit,
        radius,
        fallbackSrc,
        fallback,
        onLoad,
        onError,
        mod,
        attributes,
        ...others
    } = props

    const [error, setError] = useState(false)

    const getStyles = useStyles<ImageFactory>({
        name: 'Image',
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

    const handleError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
        setError(true)
        onError?.(event)
    }

    const isError = error || !src
    const showFallback = isError && (fallbackSrc || fallback)

    return (
        <Box {...getStyles('root')} mod={[{ fit }, mod]} {...others}>
            {showFallback ? (
                fallbackSrc ? (
                    <img {...getStyles('image')} src={fallbackSrc} alt={alt} onError={() => setError(true)} />
                ) : (
                    <div {...getStyles('fallback')}>{fallback}</div>
                )
            ) : (
                <img ref={ref} {...getStyles('image')} src={src} alt={alt} onLoad={onLoad} onError={handleError} />
            )}
        </Box>
    )
})

Image.classes = classes
;(Image as any).varsResolver = varsResolver
Image.displayName = '@xiaoye-react/ui/Image'

export namespace Image {
    export type Props = ImageProps
    export type StylesNames = ImageStylesNames
    export type CssVariables = ImageCssVariables
    export type Factory = ImageFactory
}
