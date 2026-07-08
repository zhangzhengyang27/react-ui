import { Box, ElementProps, factory, useProps, type BoxProps, type Factory } from '../../core'
import classes from './Combobox.module.css'

export interface ComboboxOptionsProps extends BoxProps, ElementProps<'div'> {
    /** Options content */
    children: React.ReactNode
}

export type ComboboxOptionsFactory = Factory<{
    props: ComboboxOptionsProps
    ref: HTMLDivElement
    compound: true
}>

export const ComboboxOptions = factory<ComboboxOptionsFactory>((_props, ref) => {
    const props = useProps('ComboboxOptions', null, _props)
    const { children, ...others } = props

    return (
        <Box ref={ref} role="presentation" className={classes.options} {...others}>
            {children}
        </Box>
    )
})

ComboboxOptions.displayName = '@mantine/core/ComboboxOptions'
