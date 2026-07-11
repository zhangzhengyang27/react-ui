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

export type TfootStylesNames = 'tfoot'

export interface TfootProps extends BoxProps, CompoundStylesApiProps<TfootFactory>, ElementProps<'tfoot'> {
    children?: React.ReactNode
}

export type TfootFactory = Factory<{
    props: TfootProps
    ref: HTMLTableSectionElement
    stylesNames: TfootStylesNames
    compound: true
}>

export const Tfoot = factory<TfootFactory>((props, ref) => {
    const { classNames, className, style, styles, children, ...others } = useProps('Tfoot', null, props)
    const ctx = useTableContext()

    return (
        <Box
            component="tfoot"
            ref={ref}
            {...others}
            {...ctx.getStyles('tfoot', { className, classNames, style, styles })}
        >
            {children}
        </Box>
    )
})

Tfoot.displayName = '@react-ui/ui/Tfoot'
Tfoot.classes = classes
