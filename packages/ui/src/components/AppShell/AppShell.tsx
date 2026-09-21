import { useMemo } from 'react'
import { RemoveScroll as RemoveScrollRaw } from 'react-remove-scroll'
import {
    Box,
    BoxProps,
    createVarsResolver,
    getSpacing,
    InlineStyles,
    keys,
    parseStyleProps,
    polymorphicFactory,
    PolymorphicFactory,
    StylesApiProps,
    UISpacing,
    useProps,
    useRandomClassName,
    useStyles,
    useUITheme
} from '../../core'
import classes from './AppShell.module.css'
import {
    APP_SHELL_SIZE_STYLE_PROPS_DATA,
    AppShellCollapsedProp,
    AppShellSizeProp,
    getAppShellSizes
} from './app-shell-responsive'
import { AppShellContext, AppShellContextValue } from './AppShellContext'
import { AppShellAside } from './AppShellAside/AppShellAside'
import { AppShellFooter } from './AppShellFooter/AppShellFooter'
import { AppShellHeader } from './AppShellHeader/AppShellHeader'
import { AppShellMain } from './AppShellMain/AppShellMain'
import { AppShellNavbar } from './AppShellNavbar/AppShellNavbar'

export type { AppShellCollapsedProp, AppShellSizeProp } from './app-shell-responsive'

export type AppShellStylesNames = 'root' | 'header' | 'navbar' | 'aside' | 'footer' | 'main'

// children 由 JSX 提供、forwardProps/ref 不使用，均剔除（与 ModalBase 同一套写法）
type RemoveScrollProps = Omit<React.ComponentProps<typeof RemoveScrollRaw>, 'children' | 'forwardProps' | 'ref'>
const RemoveScroll = RemoveScrollRaw as React.FC<React.PropsWithChildren<RemoveScrollProps>>

export interface AppShellProps extends BoxProps, StylesApiProps<AppShellFactory> {
    /** Controls padding of the main section @default 'md' */
    padding?: UISpacing

    /**
     * Header configuration with height.
     * 数字按 rem 换算、字符串原样使用，也支持按断点分级（如 `{ base: 60, md: 70, lg: 80 }`）
     */
    header?: { height: AppShellSizeProp }

    /**
     * Navbar configuration with width and collapse state.
     * `width`/`collapsed` 均支持按断点分级（如 `{ base: 200, lg: 400 }`），语法与 style props 相同
     */
    navbar?: { width: AppShellSizeProp; collapsed?: AppShellCollapsedProp }

    /**
     * Aside configuration with width and collapse state.
     * `width`/`collapsed` 均支持按断点分级，语法与 `navbar` 相同
     */
    aside?: { width: AppShellSizeProp; collapsed?: AppShellCollapsedProp }

    /**
     * Footer configuration with height.
     * 语法与 `header.height` 相同
     */
    footer?: { height: AppShellSizeProp }

    /**
     * 固定布局：整个 AppShell 钉在视口上，页面本身不滚动，只有 `main` 内部滚动，
     * 挂载期间锁住 body 滚动 @default false
     */
    fixed?: boolean

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
        // 只有不需要跨断点变化的尺寸留在这里（内联变量，与改动前逐字节一致）：
        // 内联优先级压过任何类规则，响应式的尺寸必须整体交给下面那段 <style> 下发，
        // 否则 base 值会挡掉所有媒体查询（见 app-shell-responsive.ts 的说明）
        ...getAppShellSizes({ header, footer, navbar, aside }, theme).vars
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
        fixed,
        mod,
        attributes,
        children,
        ...others
    } = props
    const theme = useUITheme()
    const responsiveClassName = useRandomClassName()

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

    // varsResolver 与本行调用同一个纯函数，两侧解析结果必然一致
    const sizes = useMemo(
        () => getAppShellSizes({ header, footer, navbar, aside }, theme),
        [header, footer, navbar, aside, theme]
    )

    // 响应式通道与 Box 处理响应式 style prop 的那套完全相同（parseStyleProps 负责
    // 拆分 base/各断点并按 min-width 升序排序，InlineStyles 负责 nonce/CSP 与 <style>），
    // 这里复用它而不是自己拼媒体查询
    const responsiveStyleProps = useMemo(
        () =>
            keys(sizes.responsive).length > 0
                ? parseStyleProps({
                    theme,
                    data: APP_SHELL_SIZE_STYLE_PROPS_DATA,
                    styleProps: sizes.responsive
                })
                : undefined,
        [sizes, theme]
    )

    const ctxValue = useMemo<AppShellContextValue>(
        () => ({
            padding,
            // 对象写法下 context 只能给出 base 槽位的值（逐断点尺寸活在 CSS 变量里），
            // 这样也保证 context 永远不会漏出一个对象
            headerHeight: sizes.base.header,
            footerHeight: sizes.base.footer,
            navbarWidth: sizes.base.navbar,
            asideWidth: sizes.base.aside,
            navbarCollapsed: sizes.collapsedEverywhere.navbar,
            asideCollapsed: sizes.collapsedEverywhere.aside
        }),
        [padding, sizes]
    )

    return (
        <>
            {responsiveStyleProps?.hasResponsiveStyles && (
                <InlineStyles
                    selector={`.${responsiveClassName}`}
                    styles={responsiveStyleProps.styles}
                    media={responsiveStyleProps.media}
                />
            )}
            {/* fixed 布局下页面本身不再滚动，滚动只发生在 main 内。用 react-remove-scroll 而不是
                自己写 body.style.overflow：它管滚动条宽度补偿（否则锁的瞬间整页横向跳动）、
                管 iOS 橡皮筋，并与 ModalBase/Drawer 的锁共用一个栈（并列打开不会互相踩）。
                enabled 必须显式转 boolean——省略时 RemoveScroll 默认就是锁的。 */}
            <RemoveScroll enabled={!!fixed}>
                <AppShellContext.Provider value={ctxValue}>
                <Box
                    ref={_ref}
                    mod={[
                        {
                            'with-header': !!header,
                            'with-navbar': !!navbar && !sizes.collapsedEverywhere.navbar,
                            'with-aside': !!aside && !sizes.collapsedEverywhere.aside,
                            'with-footer': !!footer,
                            fixed
                        },
                        mod
                    ]}
                    {...getStyles(
                        'root',
                        responsiveStyleProps?.hasResponsiveStyles ? { className: responsiveClassName } : undefined
                    )}
                    {...others}
                >
                    {children}
                </Box>
                </AppShellContext.Provider>
            </RemoveScroll>
        </>
    )
})

AppShell.Header = AppShellHeader
AppShell.Navbar = AppShellNavbar
AppShell.Aside = AppShellAside
AppShell.Footer = AppShellFooter
AppShell.Main = AppShellMain
AppShell.classes = classes
;(AppShell as any).varsResolver = varsResolver
AppShell.displayName = '@xiaoye-react/ui/AppShell'

export namespace AppShell {
    export type Props = AppShellProps
    export type Factory = AppShellFactory
    export type StylesNames = AppShellStylesNames
}
