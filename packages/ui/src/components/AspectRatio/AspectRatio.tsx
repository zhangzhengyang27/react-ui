import {
    Box,
    BoxProps,
    createVarsResolver,
    polymorphicFactory,
    PolymorphicFactory,
    StylesApiProps,
    useProps,
    useStyles
} from '../../core'
import classes from './AspectRatio.module.css'

export type AspectRatioStylesNames = 'root'

export interface AspectRatioProps extends BoxProps, StylesApiProps<AspectRatioFactory> {
    /** Aspect ratio value, e.g. 16 / 9, 4 / 3, 1 @default 1 */
    ratio?: number

    /** Content of the aspect ratio box */
    children?: React.ReactNode
}

export type AspectRatioFactory = PolymorphicFactory<{
    props: AspectRatioProps
    defaultRef: HTMLDivElement
    defaultComponent: 'div'
    stylesNames: AspectRatioStylesNames
}>

const defaultProps = {
    ratio: 1
} satisfies Partial<AspectRatioProps>

const varsResolver = createVarsResolver<AspectRatioFactory>((theme, { ratio }) => ({
    root: {
        '--ar-ratio': ratio !== undefined ? String(ratio) : undefined
    }
}))

export const AspectRatio = polymorphicFactory<AspectRatioFactory>((_props, _ref) => {
    const props = useProps('AspectRatio', defaultProps, _props)
    const { classNames, className, style, styles, unstyled, vars, ratio, mod, attributes, children, ...others } = props

    const getStyles = useStyles<AspectRatioFactory>({
        name: 'AspectRatio',
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
        <Box ref={_ref} mod={mod} {...getStyles('root')} {...others}>
            {children}
        </Box>
    )
})

AspectRatio.classes = classes
;(AspectRatio as any).varsResolver = varsResolver
AspectRatio.displayName = '@react-ui/ui/AspectRatio'

export namespace AspectRatio {
    export type Props = AspectRatioProps
    export type Factory = AspectRatioFactory
    export type StylesNames = AspectRatioStylesNames
}
