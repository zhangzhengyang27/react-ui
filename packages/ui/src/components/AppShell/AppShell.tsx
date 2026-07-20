import { useMemo } from 'react'
import {
    Box,
    BoxProps,
    createVarsResolver,
    getSpacing,
    UISpacing,
    polymorphicFactory,
    PolymorphicFactory,
    StylesApiProps,
    useProps,
    useStyles
} from '../../core'
import classes from './AppShell.module.css'
import { AppShellContext, AppShellContextValue } from './AppShellContext'
import { AppShellAside } from './AppShellAside/AppShellAside'
import { AppShellFooter } from './AppShellFooter/AppShellFooter'
import { AppShellHeader } from './AppShellHeader/AppShellHeader'
import { AppShellMain } from './AppShellMain/AppShellMain'
import { AppShellNavbar } from './AppShellNavbar/AppShellNavbar'

export type AppShellStylesNames = 'root' | 'header' | 'navbar' | 'aside' | 'footer' | 'main'

export interface AppShellProps extends BoxProps, StylesApiProps<AppShellFactory> {
    /** Controls padding of the main section @default 'md' */
    padding?: UISpacing

    /** Header configuration with height */
    header?: { height: React.CSSProperties['height'] }

    /** Navbar configuration with width and collapse state */
    navbar?: { width: React.CSSProperties['width']; collapsed?: boolean }

    /** Aside configuration with width and collapse state */
    aside?: { width: React.CSSProperties['width']; collapsed?: boolean }

    /** Footer configuration with height */
    footer?: { height: React.CSSProperties['height'] }

    /** Content of the app shell */
    children?: React.ReactNode
}

export type AppShellFactory = PolymorphicFactory<{
    props: AppShellProps
    defaultComponent: 'div'
    defaultRef: HTMLDivElement
    stylesNames: AppShellStylesNames
    staticComponents: {
        Header: typeof AppShellHeader
        Navbar: typeof AppShellNavbar
        Aside: typeof AppShellAside
        Footer: typeof AppShellFooter
        Main: typeof AppShellMain
    }
}>

const defaultProps = {
    padding: 'md'
} satisfies Partial<AppShellProps>

const varsResolver = createVarsResolver<AppShellFactory>((theme, { padding, header, footer, navbar, aside }) => ({
    root: {
        '--app-shell-padding': getSpacing(padding),
        '--app-shell-header-height': header?.height !== undefined ? String(header.height) : undefined,
        '--app-shell-footer-height': footer?.height !== undefined ? String(footer.height) : undefined,
        '--app-shell-navbar-width': navbar?.collapsed
            ? '0px'
            : navbar?.width !== undefined
              ? String(navbar.width)
              : undefined,
        '--app-shell-aside-width': aside?.collapsed
            ? '0px'
            : aside?.width !== undefined
              ? String(aside.width)
              : undefined
    }
}))

export const AppShell = polymorphicFactory<AppShellFactory>((_props, _ref) => {
    const props = useProps('AppShell', defaultProps, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        padding,
        header,
        navbar,
        aside,
        footer,
        mod,
        attributes,
        children,
        ...others
    } = props

    const getStyles = useStyles<AppShellFactory>({
        name: 'AppShell',
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

    const ctxValue = useMemo<AppShellContextValue>(
        () => ({
            padding,
            headerHeight: header?.height,
            footerHeight: footer?.height,
            navbarWidth: navbar?.collapsed ? '0px' : navbar?.width,
            asideWidth: aside?.collapsed ? '0px' : aside?.width,
            navbarCollapsed: navbar?.collapsed,
            asideCollapsed: aside?.collapsed
        }),
        [padding, header, footer, navbar, aside]
    )

    return (
        <AppShellContext.Provider value={ctxValue}>
            <Box
                ref={_ref}
                mod={[
                    {
                        'with-header': !!header,
                        'with-navbar': !!navbar && !navbar.collapsed,
                        'with-aside': !!aside && !aside.collapsed,
                        'with-footer': !!footer
                    },
                    mod
                ]}
                {...getStyles('root')}
                {...others}
            >
                {children}
            </Box>
        </AppShellContext.Provider>
    )
})

AppShell.Header = AppShellHeader
AppShell.Navbar = AppShellNavbar
AppShell.Aside = AppShellAside
AppShell.Footer = AppShellFooter
AppShell.Main = AppShellMain
AppShell.classes = classes
;(AppShell as any).varsResolver = varsResolver
AppShell.displayName = '@react-ui/ui/AppShell'

export namespace AppShell {
    export type Props = AppShellProps
    export type Factory = AppShellFactory
    export type StylesNames = AppShellStylesNames
}
