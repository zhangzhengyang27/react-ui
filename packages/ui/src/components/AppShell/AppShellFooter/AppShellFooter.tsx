import { Box, BoxProps, Factory, factory, StylesApiProps, useProps, useStyles } from '../../../core'
import classes from '../AppShell.module.css'

export interface AppShellFooterProps extends BoxProps, StylesApiProps<AppShellFooterFactory> {
    /** Footer content */
    children?: React.ReactNode
}

export type AppShellFooterFactory = Factory<{
    props: AppShellFooterProps
    ref: HTMLElement
    stylesNames: 'footer'
}>

const defaultProps = {} satisfies Partial<AppShellFooterProps>

export const AppShellFooter = factory<AppShellFooterFactory>((_props, ref) => {
    const props = useProps('AppShellFooter', defaultProps, _props)
    const { classNames, className, style, styles, unstyled, vars, children, ...others } = props

    const getStyles = useStyles<AppShellFooterFactory>({
        name: 'AppShell',
        classes,
        props,
        className,
        style,
        classNames,
        styles,
        unstyled,
        vars,
        rootSelector: 'footer'
    })

    return (
        <Box component="footer" ref={ref} {...getStyles('footer')} {...others}>
            {children}
        </Box>
    )
})

AppShellFooter.classes = classes
AppShellFooter.displayName = '@react-ui/ui/AppShellFooter'

export namespace AppShellFooter {
    export type Props = AppShellFooterProps
    export type Factory = AppShellFooterFactory
}
