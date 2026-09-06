import { Box, ElementProps, factory, useProps, type BoxProps, type Factory } from '../../core'
import { useComboboxContext } from './Combobox.context'
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
    const { children, id, ...others } = props
    // 挂上 store 的 listId，useCombobox store 的 DOM 查询（#listId [data-combobox-option]）才能命中
    const ctx = useComboboxContext()

    return (
        <Box ref={ref} role="presentation" id={id ?? ctx.listId ?? undefined} className={classes.options} {...others}>
            {children}
        </Box>
    )
})

ComboboxOptions.displayName = '@xiaoye-react/ui/ComboboxOptions'
