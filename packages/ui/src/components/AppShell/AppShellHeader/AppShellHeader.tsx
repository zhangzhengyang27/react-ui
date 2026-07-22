import { Box, BoxProps, Factory, factory, StylesApiProps, useProps, useStyles } from '../../../core'
import classes from '../AppShell.module.css'

export interface AppShellHeaderProps extends BoxProps, StylesApiProps<AppShellHeaderFactory> {
    /** Header content */
    children?: React.ReactNode
}

export type AppShellHeaderFactory = Factory<{
    props: AppShellHeaderProps
    ref: HTMLElement
    stylesNames: 'header'
}>

const defaultProps = {} satisfies Partial<AppShellHeaderProps>

export const AppShellHeader = factory<AppShellHeaderFactory>((_props, ref) => {
    const props = useProps('AppShellHeader', defaultProps, _props)
    const { classNames, className, style, styles, unstyled, vars, children, ...others } = props

    const getStyles = useStyles<AppShellHeaderFactory>({
        name: 'AppShell',
        classes,
        props,
        className,
        style,
        classNames,
        styles,
        unstyled,
        vars,
        rootSelector: 'header'
    })

    return (
        <Box component="header" ref={ref} {...getStyles('header')} {...others}>
            {children}
        </Box>
    )
})

AppShellHeader.classes = classes
AppShellHeader.displayName = '@xiaoye-react/ui/AppShellHeader'

export namespace AppShellHeader {
    export type Props = AppShellHeaderProps
    export type Factory = AppShellHeaderFactory
}
