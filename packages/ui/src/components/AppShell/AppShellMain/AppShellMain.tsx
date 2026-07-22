import { Box, BoxProps, Factory, factory, StylesApiProps, useProps, useStyles } from '../../../core'
import classes from '../AppShell.module.css'

export interface AppShellMainProps extends BoxProps, StylesApiProps<AppShellMainFactory> {
    /** Main content */
    children?: React.ReactNode
}

export type AppShellMainFactory = Factory<{
    props: AppShellMainProps
    ref: HTMLElement
    stylesNames: 'main'
}>

const defaultProps = {} satisfies Partial<AppShellMainProps>

export const AppShellMain = factory<AppShellMainFactory>((_props, ref) => {
    const props = useProps('AppShellMain', defaultProps, _props)
    const { classNames, className, style, styles, unstyled, vars, children, ...others } = props

    const getStyles = useStyles<AppShellMainFactory>({
        name: 'AppShell',
        classes,
        props,
        className,
        style,
        classNames,
        styles,
        unstyled,
        vars,
        rootSelector: 'main'
    })

    return (
        <Box component="main" ref={ref} {...getStyles('main')} {...others}>
            {children}
        </Box>
    )
})

AppShellMain.classes = classes
AppShellMain.displayName = '@xiaoye-react/ui/AppShellMain'

export namespace AppShellMain {
    export type Props = AppShellMainProps
    export type Factory = AppShellMainFactory
}
