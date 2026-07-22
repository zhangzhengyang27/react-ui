import { Box, BoxProps, Factory, factory, StylesApiProps, useProps, useStyles } from '../../../core'
import classes from '../AppShell.module.css'
import { useAppShellContext } from '../AppShellContext'

export interface AppShellNavbarProps extends BoxProps, StylesApiProps<AppShellNavbarFactory> {
    /** Navbar content */
    children?: React.ReactNode
}

export type AppShellNavbarFactory = Factory<{
    props: AppShellNavbarProps
    ref: HTMLElement
    stylesNames: 'navbar'
}>

const defaultProps = {} satisfies Partial<AppShellNavbarProps>

export const AppShellNavbar = factory<AppShellNavbarFactory>((_props, ref) => {
    const props = useProps('AppShellNavbar', defaultProps, _props)
    const { classNames, className, style, styles, unstyled, vars, children, ...others } = props
    const ctx = useAppShellContext()

    const getStyles = useStyles<AppShellNavbarFactory>({
        name: 'AppShell',
        classes,
        props,
        className,
        style,
        classNames,
        styles,
        unstyled,
        vars,
        rootSelector: 'navbar'
    })

    return (
        <Box
            component="nav"
            ref={ref}
            {...getStyles('navbar')}
            {...others}
            data-collapsed={ctx.navbarCollapsed || undefined}
        >
            {children}
        </Box>
    )
})

AppShellNavbar.classes = classes
AppShellNavbar.displayName = '@xiaoye-react/ui/AppShellNavbar'

export namespace AppShellNavbar {
    export type Props = AppShellNavbarProps
    export type Factory = AppShellNavbarFactory
}
