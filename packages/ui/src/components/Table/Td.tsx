import {
    Box,
    factory,
    useProps,
    type BoxProps,
    type CompoundStylesApiProps,
    type ElementProps,
    type Factory
} from '../../core'
import { useTableContext } from './Table.context'
import classes from './Table.module.css'

export type TdStylesNames = 'td'

export interface TdProps extends BoxProps, CompoundStylesApiProps<TdFactory>, ElementProps<'td'> {
    children?: React.ReactNode
}

export type TdFactory = Factory<{
    props: TdProps
    ref: HTMLTableDataCellElement
    stylesNames: TdStylesNames
    compound: true
}>

export const Td = factory<TdFactory>((props, ref) => {
    const { classNames, className, style, styles, children, ...others } = useProps('Td', null, props)
    const ctx = useTableContext()

    return (
        <Box component="td" ref={ref} {...others} {...ctx.getStyles('td', { className, classNames, style, styles })}>
            {children}
        </Box>
    )
})

Td.displayName = '@react-ui/ui/Td'
Td.classes = classes
