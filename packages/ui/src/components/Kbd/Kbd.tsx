import {
    Box,
    BoxProps,
    createVarsResolver,
    getSize,
    MantineSize,
    polymorphicFactory,
    PolymorphicFactory,
    StylesApiProps,
    useProps,
    useStyles
} from '../../core'
import classes from './Kbd.module.css'

export type KbdStylesNames = 'root'

export type KbdCssVariables = {
    root: '--kbd-fz' | '--kbd-padding'
}

export interface KbdProps extends BoxProps, StylesApiProps<KbdFactory> {
    /** Controls font-size and padding @default 'sm' */
    size?: MantineSize | (string & {})

    /** Kbd content */
    children?: React.ReactNode
}

export type KbdFactory = PolymorphicFactory<{
    props: KbdProps
    defaultRef: HTMLElement
    defaultComponent: 'kbd'
    stylesNames: KbdStylesNames
    vars: KbdCssVariables
}>

const defaultProps = {
    size: 'sm'
} satisfies Partial<KbdProps>

const varsResolver = createVarsResolver<KbdFactory>((_, { size }) => ({
    root: {
        '--kbd-fz': getSize(size, 'kbd-fz'),
        '--kbd-padding': getSize(size, 'kbd-padding')
    }
}))

/**
 * 键盘按键样式组件。对齐 mantine Kbd（polymorphicFactory + useStyles + varsResolver + CSS module）。
 * 支持 size。
 */
export const Kbd = polymorphicFactory<KbdFactory>((_props, _ref) => {
    const props = useProps('Kbd', defaultProps, _props)
    const { classNames, className, style, styles, unstyled, vars, children, size, attributes, ...others } = props

    const getStyles = useStyles<KbdFactory>({
        name: 'Kbd',
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
        <Box component="kbd" {...getStyles('root')} size={size} {...others}>
            {children}
        </Box>
    )
})

Kbd.classes = classes
;(Kbd as any).varsResolver = varsResolver
Kbd.displayName = '@react-ui/ui/Kbd'

export namespace Kbd {
    export type Props = KbdProps
    export type StylesNames = KbdStylesNames
    export type CssVariables = KbdCssVariables
    export type Factory = KbdFactory
}
