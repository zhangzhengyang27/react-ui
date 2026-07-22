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

export type TbodyStylesNames = 'tbody'

export interface TbodyProps extends BoxProps, CompoundStylesApiProps<TbodyFactory>, ElementProps<'tbody'> {
    children?: React.ReactNode
}

export type TbodyFactory = Factory<{
    props: TbodyProps
    ref: HTMLTableSectionElement
    stylesNames: TbodyStylesNames
    compound: true
}>

export const Tbody = factory<TbodyFactory>((props, ref) => {
    const { classNames, className, style, styles, children, ...others } = useProps('Tbody', null, props)
    const ctx = useTableContext()

    return (
        <Box
            component="tbody"
            ref={ref}
            {...others}
            {...ctx.getStyles('tbody', { className, classNames, style, styles })}
        >
            {children}
        </Box>
    )
})

Tbody.displayName = '@xiaoye-react/ui/Tbody'
Tbody.classes = classes
