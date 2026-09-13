import { useMemo } from 'react'
import {
    Box,
    BoxProps,
    createVarsResolver,
    getFontSize,
    getLineHeight,
    getSpacing,
    UISize,
    UISpacing,
    polymorphicFactory,
    PolymorphicFactory,
    StylesApiProps,
    useProps,
    useStyles
} from '../../core'
import classes from './List.module.css'
import { ListContext, ListContextValue } from './ListContext'
import { ListItem } from './ListItem/ListItem'

export type ListStylesNames = 'root' | 'item' | 'itemWrapper' | 'itemIcon' | 'itemLabel'

export interface ListProps extends BoxProps, StylesApiProps<ListFactory> {
    /** List type @default 'unordered' */
    type?: 'ordered' | 'unordered'

    /** Controls font-size of list items @default 'md' */
    size?: UISize

    /** Replaces default list marker icon in all child items */
    icon?: React.ReactNode

    /** Adds left padding to the list @default false */
    withPadding?: boolean

    /** Centers item icon and content vertically @default false */
    center?: boolean

    /** Space between list items @default 0 */
    spacing?: UISpacing

    /** Sets list-style-type CSS property, overrides default type marker */
    listStyleType?: React.CSSProperties['listStyleType']

    /** Content of the list */
    children?: React.ReactNode
}

export type ListFactory = PolymorphicFactory<{
    props: ListProps
    defaultComponent: 'ul'
    defaultRef: HTMLUListElement
    stylesNames: ListStylesNames
    staticComponents: {
        Item: typeof ListItem
    }
}>

const defaultProps = {
    type: 'unordered',
    size: 'md',
    withPadding: false,
    center: false
} satisfies Partial<ListProps>

const varsResolver = createVarsResolver<ListFactory>((theme, { size, spacing, listStyleType }) => ({
    root: {
        '--list-fz': getFontSize(size),
        '--list-lh': getLineHeight(size),
        '--list-spacing': getSpacing(spacing),
        // 覆盖默认 marker（disc/decimal/square 等原生标记），此前该 prop 被解构丢弃
        '--list-style-type': listStyleType
    }
}))

export const List = polymorphicFactory<ListFactory>((_props, _ref) => {
    const props = useProps('List', defaultProps, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        type,
        size,
        icon,
        withPadding,
        center,
        spacing,
        listStyleType,
        mod,
        attributes,
        children,
        ...others
    } = props

    const getStyles = useStyles<ListFactory>({
        name: 'List',
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

    const ctxValue = useMemo<ListContextValue>(() => ({ icon, center, type }), [icon, center, type])

    return (
        <ListContext.Provider value={ctxValue}>
            <Box<any>
                component={type === 'ordered' ? 'ol' : 'ul'}
                ref={_ref}
                mod={[{ 'with-padding': withPadding, center }, mod]}
                // listStyleType 生效时切换为原生标记：flex 布局的 .item 不渲染原生
                // marker，且须隐藏 counter/dot 自绘标记避免双重显示
                data-native-markers={listStyleType === undefined ? undefined : true}
                {...getStyles('root')}
                {...others}
            >
                {children}
            </Box>
        </ListContext.Provider>
    )
})

List.Item = ListItem
List.classes = classes
;(List as any).varsResolver = varsResolver
List.displayName = '@xiaoye-react/ui/List'

export namespace List {
    export type Props = ListProps
    export type Factory = ListFactory
    export type StylesNames = ListStylesNames
}
