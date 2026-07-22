import { BoxProps, Factory, factory, StylesApiProps, useProps, useStyles } from '../../../core'
import classes from '../List.module.css'
import { useListContext } from '../ListContext'

export interface ListItemProps extends BoxProps, StylesApiProps<ListItemFactory> {
    /** Replaces default list marker icon for this item */
    icon?: React.ReactNode

    /** Content of the list item */
    children?: React.ReactNode
}

export type ListItemFactory = Factory<{
    props: ListItemProps
    ref: HTMLLIElement
    stylesNames: 'item' | 'itemWrapper' | 'itemIcon' | 'itemLabel'
}>

const defaultProps = {} satisfies Partial<ListItemProps>

export const ListItem = factory<ListItemFactory>((_props, ref) => {
    const props = useProps('ListItem', defaultProps, _props)
    const { classNames, className, style, styles, unstyled, vars, icon, children, ...others } = props

    const ctx = useListContext()
    const getStyles = useStyles<ListItemFactory>({
        name: 'List',
        classes,
        props,
        className,
        style,
        classNames,
        styles,
        unstyled,
        vars,
        rootSelector: 'item'
    })

    const itemIcon = icon !== undefined ? icon : ctx.icon
    const isOrdered = ctx.type === 'ordered' && itemIcon === undefined

    return (
        <li
            {...getStyles('item')}
            {...others}
            ref={ref}
            data-ordered={isOrdered || undefined}
            data-center={ctx.center || undefined}
        >
            <div {...getStyles('itemIcon')} data-center={ctx.center || undefined}>
                {itemIcon}
            </div>
            <div {...getStyles('itemWrapper')}>
                <span {...getStyles('itemLabel')}>{children}</span>
            </div>
        </li>
    )
})

ListItem.classes = classes
ListItem.displayName = '@xiaoye-react/ui/ListItem'

export namespace ListItem {
    export type Props = ListItemProps
    export type Factory = ListItemFactory
}
