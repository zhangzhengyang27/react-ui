import { Box, BoxProps, CompoundStylesApiProps, ElementProps, factory, Factory, useProps } from '../../../core'
import { useDataListContext } from '../DataList.context'
import classes from '../DataList.module.css'

export type DataListItemValueStylesNames = 'itemValue'

export interface DataListItemValueProps
    extends BoxProps,
        CompoundStylesApiProps<DataListItemValueFactory>,
        ElementProps<'dd'> {
    /** Value content */
    children?: React.ReactNode
}

export type DataListItemValueFactory = Factory<{
    props: DataListItemValueProps
    ref: HTMLElement
    stylesNames: DataListItemValueStylesNames
    compound: true
}>

export const DataListItemValue = factory<DataListItemValueFactory>((_props, ref) => {
    const props = useProps('DataListItemValue', null, _props)
    const { classNames, className, style, styles, vars, children, mod, ...others } = props

    const ctx = useDataListContext()
    const stylesApiProps = { classNames, styles }

    return (
        <Box
            ref={ref}
            component="dd"
            {...ctx.getStyles('itemValue', { ...stylesApiProps, className, style })}
            mod={mod}
            {...others}
        >
            {children}
        </Box>
    )
})

DataListItemValue.classes = classes
DataListItemValue.displayName = '@xiaoye-react/ui/DataListItemValue'

export namespace DataListItemValue {
    export type Props = DataListItemValueProps
    export type Factory = DataListItemValueFactory
    export type StylesNames = DataListItemValueStylesNames
}
