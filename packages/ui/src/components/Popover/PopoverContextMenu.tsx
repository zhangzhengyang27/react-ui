import { cloneElement } from 'react'
import { getSingleElementChild, useProps } from '../../core'
import { usePopoverContext } from './Popover.context'

export interface PopoverContextMenuProps {
    /** Element that opens the popover when right-clicked. */
    children: React.ReactNode

    /** If set, the right-click trigger is disabled */
    disabled?: boolean
}

export function PopoverContextMenu(props: PopoverContextMenuProps) {
    const { children, disabled } = useProps('PopoverContextMenu', null, props)

    const child = getSingleElementChild(children)
    if (!child) {
        throw new Error(
            'Popover.ContextMenu component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported'
        )
    }

    const ctx = usePopoverContext()

    const handleContextMenu = (event: React.MouseEvent<unknown>) => {
        if (disabled || ctx.disabled) {
            return
        }
        event.preventDefault()
        if (!ctx.opened) {
            ctx.onToggle()
        }
    }

    return cloneElement(child, {
        ...child.props,
        onContextMenu: handleContextMenu
    } as any)
}

PopoverContextMenu.displayName = '@react-ui/ui/PopoverContextMenu'
