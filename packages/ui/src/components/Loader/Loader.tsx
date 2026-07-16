import {
    Box,
    BoxProps,
    createVarsResolver,
    ElementProps,
    factory,
    Factory,
    getSize,
    getThemeColor,
    UIColor,
    UISize,
    StylesApiProps,
    useProps,
    useStyles
} from '../../core'
import type { UILoader, UILoadersRecord } from './Loader.types'
import { Bars } from './loaders/Bars'
import { Dots } from './loaders/Dots'
import { Oval } from './loaders/Oval'
import classes from './Loader.module.css'

export type LoaderStylesNames = 'root'
export type LoaderCssVariables = {
    root: '--loader-size' | '--loader-color'
}

export interface LoaderProps
    extends BoxProps,
        StylesApiProps<LoaderFactory>,
        ElementProps<'svg', 'display' | 'opacity'> {
    /** Controls `width` and `height` of the loader. `Loader` has predefined `xs`-`xl` values. Numbers are converted to rem. @default 'md' */
    size?: UISize | (string & {}) | number

    /** Key of `theme.colors` or any valid CSS color @default theme.primaryColor */
    color?: UIColor

    /** Loader type, key of `loaders` prop @default 'oval' */
    type?: UILoader

    /** Object of loaders components, can be customized via default props or inline. */
    loaders?: UILoadersRecord

    /** Overrides default loader with given content */
    children?: React.ReactNode
}

export type LoaderFactory = Factory<{
    props: LoaderProps
    ref: SVGSVGElement
    stylesNames: LoaderStylesNames
    vars: LoaderCssVariables
    staticComponents: {
        defaultLoaders: typeof defaultLoaders
    }
}>

export const defaultLoaders: UILoadersRecord = {
    bars: Bars,
    oval: Oval,
    dots: Dots
}

const defaultProps = {
    loaders: defaultLoaders,
    type: 'oval'
} satisfies Partial<LoaderProps>

const varsResolver = createVarsResolver<LoaderFactory>((theme, { size, color }) => ({
    root: {
        '--loader-size': getSize(size, 'loader-size'),
        '--loader-color': color ? getThemeColor(color, theme) : undefined
    }
}))

/**
 * 加载指示器，支持 oval/dots/bars 三种内置类型及自定义。
 * 对齐 ui Loader。样式采用 CSS module（与 ActionIcon 一致），不依赖 emotion。
 */
export const Loader = factory<LoaderFactory>((_props, _ref) => {
    const props = useProps('Loader', defaultProps, _props)
    const {
        size,
        color,
        type,
        vars,
        className,
        style,
        classNames,
        styles,
        unstyled,
        loaders,
        variant,
        children,
        attributes,
        ...others
    } = props

    const getStyles = useStyles<LoaderFactory>({
        name: 'Loader',
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

    if (children) {
        return (
            <Box ref={_ref} {...getStyles('root')} {...(others as any)}>
                {children}
            </Box>
        )
    }

    return <Box ref={_ref} {...getStyles('root')} component={loaders[type]} variant={variant} size={size} {...others} />
})

Loader.defaultLoaders = defaultLoaders
Loader.classes = classes
;(Loader as any).varsResolver = varsResolver
Loader.displayName = '@react-ui/ui/Loader'

export namespace Loader {
    export type Props = LoaderProps
    export type StylesNames = LoaderStylesNames
    export type CssVariables = LoaderCssVariables
    export type Factory = LoaderFactory
}
