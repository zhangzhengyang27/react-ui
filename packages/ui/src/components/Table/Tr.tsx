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

export type TrStylesNames = 'tr'

export interface TrProps extends BoxProps, CompoundStylesApiProps<TrFactory>, ElementProps<'tr'> {
    children?: React.ReactNode
}

export type TrFactory = Factory<{
    props: TrProps
    ref: HTMLTableRowElement
    stylesNames: TrStylesNames
    compound: true
}>

export const Tr = factory<TrFactory>((props, ref) => {
    const { classNames, className, style, styles, children, ...others } = useProps('Tr', null, props)
    const ctx = useTableContext()

    return (
        <Box component="tr" ref={ref} {...others} {...ctx.getStyles('tr', { className, classNames, style, styles })}>
            {children}
        </Box>
    )
})

Tr.displayName = '@react-ui/ui/Tr'
Tr.classes = classes
