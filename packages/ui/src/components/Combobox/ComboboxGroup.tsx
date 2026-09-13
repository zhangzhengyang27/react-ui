import { Box, ElementProps, factory, useProps, type BoxProps, type Factory } from '../../core'
import classes from './Combobox.module.css'

export interface ComboboxGroupProps extends BoxProps, ElementProps<'div'> {
    /** Group label */
    label: React.ReactNode

    /** Group options */
    children?: React.ReactNode

    /** Props spread onto the group label element（用于 Styles API 的 groupLabel 选择器接线） */
    groupLabelProps?: React.ComponentProps<'div'>
}

export type ComboboxGroupFactory = Factory<{
    props: ComboboxGroupProps
    ref: HTMLDivElement
    compound: true
}>

export const ComboboxGroup = factory<ComboboxGroupFactory>((_props, ref) => {
    const props = useProps('ComboboxGroup', null, _props)
    const { label, children, className, groupLabelProps, ...others } = props

    return (
        <Box
            ref={ref}
            role="group"
            aria-label={typeof label === 'string' ? label : undefined}
            className={[classes.group, className].filter(Boolean).join(' ')}
            {...others}
        >
            <div role="presentation" className={classes.groupLabel} {...groupLabelProps}>
                {label}
            </div>
            {children}
        </Box>
    )
})

ComboboxGroup.displayName = '@xiaoye-react/ui/ComboboxGroup'
