import { Box, ElementProps, factory, useProps, type BoxProps, type Factory } from '../../core'
import classes from './Combobox.module.css'

export interface ComboboxEmptyProps extends BoxProps, ElementProps<'div'> {
    /** Empty state content */
    children: React.ReactNode
}

export type ComboboxEmptyFactory = Factory<{
    props: ComboboxEmptyProps
    ref: HTMLDivElement
    compound: true
}>

export const ComboboxEmpty = factory<ComboboxEmptyFactory>((_props, ref) => {
    const props = useProps('ComboboxEmpty', null, _props)
    const { children, className, ...others } = props

    return (
        <Box
            ref={ref}
            role="presentation"
            className={[classes.empty, className].filter(Boolean).join(' ')}
            {...others}
        >
            {children}
        </Box>
    )
})

ComboboxEmpty.displayName = '@xiaoye-react/ui/ComboboxEmpty'
