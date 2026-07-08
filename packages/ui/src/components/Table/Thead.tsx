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

export type TheadStylesNames = 'thead'

export interface TheadProps extends BoxProps, CompoundStylesApiProps<TheadFactory>, ElementProps<'thead'> {
    children?: React.ReactNode
}

export type TheadFactory = Factory<{
    props: TheadProps
    ref: HTMLTableSectionElement
    stylesNames: TheadStylesNames
    compound: true
}>

export const Thead = factory<TheadFactory>((props, ref) => {
    const { classNames, className, style, styles, children, ...others } = useProps('Thead', null, props)
    const ctx = useTableContext()

    return (
        <Box
            component="thead"
            ref={ref}
            {...others}
            {...ctx.getStyles('thead', { className, classNames, style, styles })}
        >
            {children}
        </Box>
    )
})

Thead.displayName = '@react-ui/ui/Thead'
Thead.classes = classes
