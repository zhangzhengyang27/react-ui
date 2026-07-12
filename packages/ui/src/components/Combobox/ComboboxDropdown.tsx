import { Box, ElementProps, factory, useProps, type BoxProps, type Factory } from '../../core'
import { useMergedRef } from '@react-ui/hooks'
import { Portal } from '../Portal'
import { Transition } from '../Transition'
import { useComboboxContext } from './Combobox.context'
import classes from './Combobox.module.css'

export interface ComboboxDropdownProps extends BoxProps, ElementProps<'div'> {
    /** Dropdown content */
    children: React.ReactNode
}

export type ComboboxDropdownFactory = Factory<{
    props: ComboboxDropdownProps
    ref: HTMLDivElement
    compound: true
}>

export const ComboboxDropdown = factory<ComboboxDropdownFactory>((_props, ref) => {
    const props = useProps('ComboboxDropdown', null, _props)
    const { children, className, style, ...others } = props
    const ctx = useComboboxContext()
    const mergedRef = useMergedRef(ctx.dropdownRef, ref)

    return (
        <Portal>
            <Transition mounted={ctx.opened} transition="fade" duration={150}>
                {transitionStyles => (
                    <Box
                        ref={mergedRef}
                        id={ctx.dropdownId}
                        role="listbox"
                        aria-orientation="vertical"
                        className={[classes.dropdown, className].filter(Boolean).join(' ')}
                        style={{
                            ...transitionStyles,
                            position: 'absolute',
                            top: ctx.y ?? 0,
                            left: ctx.x ?? 0,
                            zIndex: 300,
                            ...style
                        }}
                        {...others}
                    >
                        {children}
                    </Box>
                )}
            </Transition>
        </Portal>
    )
})

ComboboxDropdown.displayName = '@mantine/core/ComboboxDropdown'
