import {
    Box,
    createVarsResolver,
    factory,
    getSpacing,
    useProps,
    useStyles,
    type BoxProps,
    type ElementProps,
    type Factory,
    type StylesApiProps,
    type UISpacing
} from '@xiaoye-react/ui'
import classes from './PageContainer.module.css'

export type PageContainerStylesNames =
    | 'root'
    | 'header'
    | 'titleRow'
    | 'title'
    | 'subtitle'
    | 'extra'
    | 'content'

export type PageContainerCssVariables = {
    root: '--page-container-header-gap' | '--page-container-content-gap'
}

export interface PageContainerProps
    extends BoxProps, StylesApiProps<PageContainerFactory>, ElementProps<'div', 'title'> {
    /** 页面标题 */
    title?: React.ReactNode

    /** 副标题，渲染在标题下方 */
    subtitle?: React.ReactNode

    /** 面包屑区，渲染在标题上方 */
    breadcrumbs?: React.ReactNode

    /** 右侧操作区（新建、批量操作等按钮） */
    extra?: React.ReactNode

    /** 标题区与内容的间距 @default 'md' */
    headerGap?: UISpacing | number | string

    /** 子元素之间的间距 @default 0 */
    contentGap?: UISpacing | number | string
}

export type PageContainerFactory = Factory<{
    props: PageContainerProps
    ref: HTMLDivElement
    stylesNames: PageContainerStylesNames
    vars: PageContainerCssVariables
}>

const defaultProps = {
    headerGap: 'md',
    contentGap: 0
} satisfies Partial<PageContainerProps>

const varsResolver = createVarsResolver<PageContainerFactory>((_, { headerGap, contentGap }) => ({
    root: {
        '--page-container-header-gap': getSpacing(headerGap),
        '--page-container-content-gap': getSpacing(contentGap)
    }
}))

export const PageContainer = factory<PageContainerFactory>((_props, ref) => {
    const props = useProps('PageContainer', defaultProps, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        attributes,
        mod,
        children,
        title,
        subtitle,
        breadcrumbs,
        extra,
        headerGap,
        contentGap,
        ...others
    } = props

    const getStyles = useStyles<PageContainerFactory>({
        name: 'PageContainer',
        classes,
        props,
        className,
        style,
        classNames,
        styles,
        unstyled,
        attributes,
        vars,
        varsResolver
    })

    const hasHeader = title != null || subtitle != null || breadcrumbs != null || extra != null

    return (
        <Box ref={ref} {...getStyles('root')} mod={mod} {...others}>
            {hasHeader && (
                <header {...getStyles('header')}>
                    {breadcrumbs != null && <div>{breadcrumbs}</div>}
                    <div {...getStyles('titleRow')}>
                        <div>
                            {title != null && <div {...getStyles('title')}>{title}</div>}
                            {subtitle != null && <div {...getStyles('subtitle')}>{subtitle}</div>}
                        </div>
                        {extra != null && <div {...getStyles('extra')}>{extra}</div>}
                    </div>
                </header>
            )}
            <div {...getStyles('content')}>{children}</div>
        </Box>
    )
})

PageContainer.classes = classes
;(PageContainer as any).varsResolver = varsResolver
PageContainer.displayName = '@xiaoye-react/pro/PageContainer'

export namespace PageContainer {
    export type Props = PageContainerProps
    export type StylesNames = PageContainerStylesNames
    export type Factory = PageContainerFactory
}
