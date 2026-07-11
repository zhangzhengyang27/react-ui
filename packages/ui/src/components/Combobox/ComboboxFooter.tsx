import { Box, ElementProps, factory, useProps, type BoxProps, type Factory } from '../../core'
import classes from './Combobox.module.css'

export interface ComboboxFooterProps extends BoxProps, ElementProps<'div'> {
    /** Footer content */
    children: React.ReactNode
}

export type ComboboxFooterFactory = Factory<{
    props: ComboboxFooterProps
    ref: HTMLDivElement
    compound: true
}>

export const ComboboxFooter = factory<ComboboxFooterFactory>((_props, ref) => {
    const props = useProps('ComboboxFooter', null, _props)
    const { children, className, ...others } = props

    return (
        <Box ref={ref} className={[classes.footer, className].filter(Boolean).join(' ')} {...others}>
            {children}
        </Box>
    )
})

ComboboxFooter.displayName = '@mantine/core/ComboboxFooter'
