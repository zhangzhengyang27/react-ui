import { cloneElement } from 'react'
import { getSingleElementChild, useProps } from '../../core'
import { usePopoverContext } from './Popover.context'

export interface PopoverContextMenuProps {
    /** Element that opens the popover when right-clicked. */
    children: React.ReactNode

    /** If set, the right-click trigger is disabled */
    disabled?: boolean
}

function createEventHandler<T>(handler: ((event: T) => void) | undefined, fn: (event: T) => void) {
    return (event: T) => {
        handler?.(event)
        fn(event)
    }
}

export function PopoverContextMenu(props: PopoverContextMenuProps) {
    const { children, disabled } = useProps('PopoverContextMenu', null, props)

    const child = getSingleElementChild(children) as React.ReactElement<any> | null
    const childProps = (child?.props ?? {}) as any

    const ctx = usePopoverContext()

    // throw 必须在全部 hooks 之后：children 由有效变无效时，hooks 数量不能随条件变化（Rules of Hooks）
    if (!child) {
        throw new Error(
            'Popover.ContextMenu component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported'
        )
    }

    // 与 MenuContextMenu 保持一致：链式调用 child 自带的 onContextMenu，而不是直接覆盖
    const onContextMenu = createEventHandler<any>(childProps.onContextMenu, (event: React.MouseEvent<unknown>) => {
        if (disabled || ctx.disabled) {
            return
        }
        event.preventDefault()
        if (!ctx.opened) {
            ctx.onToggle()
        }
    })

    return cloneElement(child, {
        onContextMenu
    } as any)
}

PopoverContextMenu.displayName = '@xiaoye-react/ui/PopoverContextMenu'
