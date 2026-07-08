import { Box, ElementProps, factory, useProps, type BoxProps, type Factory } from '../../core'
import classes from './Combobox.module.css'

export interface ComboboxGroupProps extends BoxProps, ElementProps<'div'> {
    /** Group label */
    label: React.ReactNode

    /** Group options */
    children?: React.ReactNode
}

export type ComboboxGroupFactory = Factory<{
    props: ComboboxGroupProps
    ref: HTMLDivElement
    compound: true
}>

export const ComboboxGroup = factory<ComboboxGroupFactory>((_props, ref) => {
    const props = useProps('ComboboxGroup', null, _props)
    const { label, children, ...others } = props

    return (
        <Box ref={ref} role="group" aria-label={typeof label === 'string' ? label : undefined} {...others}>
            <div role="presentation" className={classes.groupLabel}>
                {label}
            </div>
            {children}
        </Box>
    )
})

ComboboxGroup.displayName = '@mantine/core/ComboboxGroup'
