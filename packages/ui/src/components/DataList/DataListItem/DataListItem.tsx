import { Box, BoxProps, CompoundStylesApiProps, ElementProps, factory, Factory, useProps } from '../../../core'
import { useDataListContext } from '../DataList.context'
import classes from '../DataList.module.css'

export type DataListItemStylesNames = 'item'

export interface DataListItemProps extends BoxProps, CompoundStylesApiProps<DataListItemFactory>, ElementProps<'div'> {
    /** Item content */
    children?: React.ReactNode
}

export type DataListItemFactory = Factory<{
    props: DataListItemProps
    ref: HTMLDivElement
    stylesNames: DataListItemStylesNames
    compound: true
}>

export const DataListItem = factory<DataListItemFactory>((_props, ref) => {
    const props = useProps('DataListItem', null, _props)
    const { classNames, className, style, styles, vars, children, mod, ...others } = props

    const ctx = useDataListContext()
    const stylesApiProps = { classNames, styles }

    return (
        <Box ref={ref} {...ctx.getStyles('item', { ...stylesApiProps, className, style })} mod={mod} {...others}>
            {children}
        </Box>
    )
})

DataListItem.classes = classes
DataListItem.displayName = '@react-ui/ui/DataListItem'

export namespace DataListItem {
    export type Props = DataListItemProps
    export type Factory = DataListItemFactory
    export type StylesNames = DataListItemStylesNames
}
