import { Box, BoxProps, Factory, factory, StylesApiProps, useProps, useStyles } from '../../../core'
import classes from '../AppShell.module.css'
import { useAppShellContext } from '../AppShellContext'

export interface AppShellAsideProps extends BoxProps, StylesApiProps<AppShellAsideFactory> {
    /** Aside content */
    children?: React.ReactNode
}

export type AppShellAsideFactory = Factory<{
    props: AppShellAsideProps
    ref: HTMLElement
    stylesNames: 'aside'
}>

const defaultProps = {} satisfies Partial<AppShellAsideProps>

export const AppShellAside = factory<AppShellAsideFactory>((_props, ref) => {
    const props = useProps('AppShellAside', defaultProps, _props)
    const { classNames, className, style, styles, unstyled, vars, children, ...others } = props
    const ctx = useAppShellContext()

    const getStyles = useStyles<AppShellAsideFactory>({
        name: 'AppShell',
        classes,
        props,
        className,
        style,
        classNames,
        styles,
        unstyled,
        vars,
        rootSelector: 'aside'
    })

    return (
        <Box
            component="aside"
            ref={ref}
            {...getStyles('aside')}
            {...others}
            data-collapsed={ctx.asideCollapsed || undefined}
        >
            {children}
        </Box>
    )
})

AppShellAside.classes = classes
AppShellAside.displayName = '@react-ui/ui/AppShellAside'

export namespace AppShellAside {
    export type Props = AppShellAsideProps
    export type Factory = AppShellAsideFactory
}
