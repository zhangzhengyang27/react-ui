import { Children, cloneElement } from 'react'
import {
    Box,
    BoxProps,
    createVarsResolver,
    ElementProps,
    factory,
    Factory,
    getSpacing,
    isElement,
    UISpacing,
    StylesApiProps,
    useProps,
    useStyles
} from '../../core'
import classes from './Breadcrumbs.module.css'

export type BreadcrumbsStylesNames = 'root' | 'separator' | 'breadcrumb'
export type BreadcrumbsCssVariables = {
    root: '--bc-separator-margin'
}

export interface BreadcrumbsProps extends BoxProps, StylesApiProps<BreadcrumbsFactory>, ElementProps<'div'> {
    /** Separator between children @default '/' */
    separator?: React.ReactNode

    /** Controls spacing between separator and breadcrumb @default 'xs' */
    separatorMargin?: UISpacing

    /** React nodes that should be separated with `separator` */
    children: React.ReactNode
}

export type BreadcrumbsFactory = Factory<{
    props: BreadcrumbsProps
    ref: HTMLDivElement
    stylesNames: BreadcrumbsStylesNames
    vars: BreadcrumbsCssVariables
}>

const defaultProps = {
    separator: '/'
} satisfies Partial<BreadcrumbsProps>

const varsResolver = createVarsResolver<BreadcrumbsFactory>((_, { separatorMargin }) => ({
    root: {
        '--bc-separator-margin': getSpacing(separatorMargin)
    }
}))

export const Breadcrumbs = factory<BreadcrumbsFactory>((_props, _ref) => {
    const props = useProps('Breadcrumbs', defaultProps, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        children,
        separator,
        separatorMargin,
        attributes,
        ...others
    } = props

    const getStyles = useStyles<BreadcrumbsFactory>({
        name: 'Breadcrumbs',
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

    const items = Children.toArray(children).reduce<React.ReactNode[]>((acc, child, index, array) => {
        const item = isElement(child) ? (
            (() => {
                const breadcrumbStyles = getStyles('breadcrumb', { className: (child.props as any)?.className })
                return cloneElement(child as React.ReactElement<any>, {
                    ...breadcrumbStyles,
                    // useStyles 返回值恒含 style 键（非根选择器时为 {}），
                    // 直接展开会覆盖 child 自带的内联样式，这里合并且 child 优先
                    style: { ...breadcrumbStyles.style, ...((child.props as any)?.style ?? {}) },
                    key: index
                })
            })()
        ) : (
            <div {...getStyles('breadcrumb')} key={index}>
                {child}
            </div>
        )

        acc.push(item)

        if (index !== array.length - 1) {
            acc.push(
                <Box {...getStyles('separator')} key={`separator-${index}`}>
                    {separator}
                </Box>
            )
        }

        return acc
    }, [])

    return (
        <Box ref={_ref} {...getStyles('root')} {...others}>
            {items}
        </Box>
    )
})

Breadcrumbs.classes = classes
;(Breadcrumbs as any).varsResolver = varsResolver
Breadcrumbs.displayName = '@xiaoye-react/ui/Breadcrumbs'

export namespace Breadcrumbs {
    export type Props = BreadcrumbsProps
    export type StylesNames = BreadcrumbsStylesNames
    export type CssVariables = BreadcrumbsCssVariables
    export type Factory = BreadcrumbsFactory
}
