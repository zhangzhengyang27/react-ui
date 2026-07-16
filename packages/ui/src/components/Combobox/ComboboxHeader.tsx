import { Box, ElementProps, factory, useProps, type BoxProps, type Factory } from '../../core'
import classes from './Combobox.module.css'

export interface ComboboxHeaderProps extends BoxProps, ElementProps<'div'> {
    /** Header content */
    children: React.ReactNode
}

export type ComboboxHeaderFactory = Factory<{
    props: ComboboxHeaderProps
    ref: HTMLDivElement
    compound: true
}>

export const ComboboxHeader = factory<ComboboxHeaderFactory>((_props, ref) => {
    const props = useProps('ComboboxHeader', null, _props)
    const { children, className, ...others } = props

    return (
        <Box ref={ref} className={[classes.header, className].filter(Boolean).join(' ')} {...others}>
            {children}
        </Box>
    )
})

ComboboxHeader.displayName = '@react-ui/ui/ComboboxHeader'
