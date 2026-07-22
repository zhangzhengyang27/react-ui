import {
    Box,
    BoxProps,
    createVarsResolver,
    factory,
    Factory,
    getRadius,
    getSize,
    UIRadius,
    StylesApiProps,
    useProps,
    useStyles
} from '../../core'
import classes from './Skeleton.module.css'

export type SkeletonStylesNames = 'root'

export type SkeletonCssVariables = {
    root: '--skeleton-width' | '--skeleton-height' | '--skeleton-radius'
}

export interface SkeletonProps extends BoxProps, StylesApiProps<SkeletonFactory> {
    /** Skeleton height */
    height?: React.CSSProperties['height']

    /** Skeleton width */
    width?: React.CSSProperties['width']

    /** 主题圆角的键或任意有效的 CSS 值 @default theme.defaultRadius */
    radius?: UIRadius

    /** If true, skeleton will be rounded into a circle @default false */
    circle?: boolean

    /** If true, the skeleton pulse animation is enabled @default true */
    animate?: boolean

    /** Content rendered inside the skeleton, used as a template placeholder */
    children?: React.ReactNode
}

export type SkeletonFactory = Factory<{
    props: SkeletonProps
    ref: HTMLDivElement
    stylesNames: SkeletonStylesNames
    vars: SkeletonCssVariables
}>

const defaultProps = {
    animate: true
} satisfies Partial<SkeletonProps>

const varsResolver = createVarsResolver<SkeletonFactory>((_, { height, width, radius }) => ({
    root: {
        '--skeleton-width': width === undefined ? undefined : getSize(width, 'skeleton-width'),
        '--skeleton-height': height === undefined ? undefined : getSize(height, 'skeleton-height'),
        '--skeleton-radius': radius === undefined ? undefined : getRadius(radius)
    }
}))

export const Skeleton = factory<SkeletonFactory>((_props, ref) => {
    const props = useProps('Skeleton', defaultProps, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        height,
        width,
        radius,
        circle,
        animate,
        children,
        mod,
        ...others
    } = props

    const getStyles = useStyles<SkeletonFactory>({
        name: 'Skeleton',
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

    return (
        <Box ref={ref} {...getStyles('root')} mod={[{ circle, animate }, mod]} {...others}>
            {children}
        </Box>
    )
})

Skeleton.classes = classes
;(Skeleton as any).varsResolver = varsResolver
Skeleton.displayName = '@xiaoye-react/ui/Skeleton'

export namespace Skeleton {
    export type Props = SkeletonProps
    export type Factory = SkeletonFactory
    export type StylesNames = SkeletonStylesNames
    export type CssVariables = SkeletonCssVariables
}
