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

export type ThStylesNames = 'th'

export interface ThProps extends BoxProps, CompoundStylesApiProps<ThFactory>, ElementProps<'th'> {
    children?: React.ReactNode
}

export type ThFactory = Factory<{
    props: ThProps
    ref: HTMLTableHeaderCellElement
    stylesNames: ThStylesNames
    compound: true
}>

export const Th = factory<ThFactory>((props, ref) => {
    const { classNames, className, style, styles, children, ...others } = useProps('Th', null, props)
    const ctx = useTableContext()

    return (
        <Box component="th" ref={ref} {...others} {...ctx.getStyles('th', { className, classNames, style, styles })}>
            {children}
        </Box>
    )
})

Th.displayName = '@react-ui/ui/Th'
Th.classes = classes
