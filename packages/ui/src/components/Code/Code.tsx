import {
    Box,
    BoxProps,
    createVarsResolver,
    getFontSize,
    getThemeColor,
    MantineColor,
    parseThemeColor,
    polymorphicFactory,
    PolymorphicFactory,
    rgba,
    StylesApiProps,
    useProps,
    useStyles
} from '../../core'
import classes from './Code.module.css'

export type CodeStylesNames = 'root'

export type CodeCssVariables = {
    root: '--code-bg' | '--code-color' | '--code-bd' | '--code-fz'
}

export interface CodeProps extends BoxProps, StylesApiProps<CodeFactory> {
    /** Key of `theme.colors` or any valid CSS color @default theme.primaryColor */
    color?: MantineColor

    /** Determines whether Code should be rendered as a block element @default false */
    block?: boolean

    /** Code content */
    children?: React.ReactNode
}

export type CodeFactory = PolymorphicFactory<{
    props: CodeProps
    defaultRef: HTMLElement
    defaultComponent: 'code'
    stylesNames: CodeStylesNames
    vars: CodeCssVariables
}>

const defaultProps = {
    block: false
} satisfies Partial<CodeProps>

const varsResolver = createVarsResolver<CodeFactory>((theme, { color, block }) => {
    const parsed = parseThemeColor({
        color: color || theme.primaryColor,
        theme
    })

    return {
        root: {
            '--code-bg': block ? rgba(parsed.value, 0.03) : rgba(parsed.value, 0.08),
            '--code-color': getThemeColor(color, theme),
            '--code-bd': `1px solid ${rgba(parsed.value, 0.15)}`,
            '--code-fz': getFontSize(block ? 'sm' : 'inherit')
        }
    }
})

/**
 * 行内代码组件。对齐 mantine Code（polymorphicFactory + useStyles + varsResolver + CSS module）。
 * 支持 color 与 block 模式。
 */
export const Code = polymorphicFactory<CodeFactory>((_props, _ref) => {
    const props = useProps('Code', defaultProps, _props)
    const { classNames, className, style, styles, unstyled, vars, children, color, block, attributes, mod, ...others } =
        props

    const getStyles = useStyles<CodeFactory>({
        name: 'Code',
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
        <Box
            component={block ? 'pre' : 'code'}
            mod={[
                {
                    block
                },
                mod
            ]}
            {...getStyles('root')}
            {...others}
        >
            {children}
        </Box>
    )
})

Code.classes = classes
;(Code as any).varsResolver = varsResolver
Code.displayName = '@react-ui/ui/Code'

export namespace Code {
    export type Props = CodeProps
    export type StylesNames = CodeStylesNames
    export type CssVariables = CodeCssVariables
    export type Factory = CodeFactory
}
