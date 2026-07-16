import {
    Box,
    BoxProps,
    createVarsResolver,
    getThemeColor,
    UIColor,
    parseThemeColor,
    polymorphicFactory,
    PolymorphicFactory,
    rgba,
    StylesApiProps,
    useProps,
    useStyles
} from '../../core'
import classes from './Mark.module.css'

export type MarkStylesNames = 'root'

export type MarkCssVariables = {
    root: '--mark-bg' | '--mark-color'
}

export interface MarkProps extends BoxProps, StylesApiProps<MarkFactory> {
    /** Key of `theme.colors` or any valid CSS color @default theme.primaryColor */
    color?: UIColor

    /** Mark content */
    children?: React.ReactNode
}

export type MarkFactory = PolymorphicFactory<{
    props: MarkProps
    defaultRef: HTMLElement
    defaultComponent: 'mark'
    stylesNames: MarkStylesNames
    vars: MarkCssVariables
}>

const defaultProps = {} satisfies Partial<MarkProps>

const varsResolver = createVarsResolver<MarkFactory>((theme, { color }) => {
    const parsed = parseThemeColor({
        color: color || theme.primaryColor,
        theme
    })

    return {
        root: {
            '--mark-bg': rgba(parsed.value, 0.35),
            '--mark-color': getThemeColor(color, theme)
        }
    }
})

/**
 * 高亮文本背景组件。对齐 ui Mark（polymorphicFactory + useStyles + varsResolver + CSS module）。
 */
export const Mark = polymorphicFactory<MarkFactory>((_props, _ref) => {
    const props = useProps('Mark', defaultProps, _props)
    const { classNames, className, style, styles, unstyled, vars, children, color, attributes, ...others } = props

    const getStyles = useStyles<MarkFactory>({
        name: 'Mark',
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
        <Box ref={_ref as any} component="mark" {...getStyles('root')} {...others}>
            {children}
        </Box>
    )
})

Mark.classes = classes
;(Mark as any).varsResolver = varsResolver
Mark.displayName = '@react-ui/ui/Mark'

export namespace Mark {
    export type Props = MarkProps
    export type StylesNames = MarkStylesNames
    export type CssVariables = MarkCssVariables
    export type Factory = MarkFactory
}
