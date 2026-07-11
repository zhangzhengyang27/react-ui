import { useEffect } from 'react'
import { Box, ElementProps, factory, useProps, type BoxProps, type Factory } from '../../core'
import { useComboboxContext } from './Combobox.context'
import classes from './Combobox.module.css'

export interface ComboboxOptionProps extends BoxProps, ElementProps<'div'> {
    /** Option value */
    value: string

    /** Option label, displayed in the dropdown */
    children: React.ReactNode

    /** Determines whether option is disabled */
    disabled?: boolean

    /** Determines whether option is active */
    active?: boolean
}

export type ComboboxOptionFactory = Factory<{
    props: ComboboxOptionProps
    ref: HTMLDivElement
    compound: true
}>

export const ComboboxOption = factory<ComboboxOptionFactory>((_props, ref) => {
    const props = useProps('ComboboxOption', null, _props)
    const { value, children, disabled, active: activeProp, className, ...others } = props
    const ctx = useComboboxContext()
    const index = ctx.options.findIndex(item => item.value === value)
    const active = index === ctx.activeIndex
    const selected = ctx.selectedValues.includes(value)

    useEffect(() => {
        ctx.registerOption(value, { value, label: typeof children === 'string' ? children : value, disabled })
        return () => {
            ctx.unregisterOption(value)
        }
    }, [children, disabled, value])

    return (
        <Box
            ref={ref}
            role="option"
            id={`${ctx.dropdownId}-${index}`}
            aria-selected={selected}
            aria-disabled={disabled}
            data-combobox-active={activeProp || active || undefined}
            data-combobox-selected={selected || undefined}
            data-combobox-disabled={disabled || undefined}
            className={[classes.option, className].filter(Boolean).join(' ')}
            {...others}
            onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                if (!disabled) {
                    ctx.onOptionSelect(value)
                }
                others.onClick?.(event)
            }}
            onMouseEnter={(event: React.MouseEvent<HTMLDivElement>) => {
                if (!disabled) {
                    ctx.setActiveIndex(index)
                }
                others.onMouseEnter?.(event)
            }}
        >
            {children}
        </Box>
    )
})

ComboboxOption.displayName = '@mantine/core/ComboboxOption'
