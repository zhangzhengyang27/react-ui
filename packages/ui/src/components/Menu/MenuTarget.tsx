import { cloneElement } from 'react'
import { getSingleElementChild, useProps } from '../../core'
import { Popover } from '../Popover'
import { useMenuContext } from './Menu.context'

export interface MenuTargetProps {
    /** Target element */
    children: React.ReactNode

    /** Key of the prop used to get element ref */
    refProp?: string
}

const defaultProps = {
    refProp: 'ref'
} satisfies Partial<MenuTargetProps>

export function MenuTarget(props: MenuTargetProps) {
    const { children, refProp, ...others } = useProps('MenuTarget', defaultProps, props)

    const child = getSingleElementChild(children)
    if (!child) {
        throw new Error('[@react-ui/ui] Menu.Target children should be an element or a component that accepts ref')
    }

    const ctx = useMenuContext()
    const _childProps = child.props as any

    const onClick = (event: React.MouseEvent<HTMLElement>) => {
        if (ctx.trigger === 'click') {
            ctx.toggleDropdown()
        } else if (ctx.trigger === 'click-hover') {
            ctx.setOpenedViaClick(true)
            if (!ctx.opened) {
                ctx.openDropdown()
            }
        }
        _childProps.onClick?.(event)
    }

    const onMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
        if (ctx.trigger === 'hover' || ctx.trigger === 'click-hover') {
            ctx.openDropdown()
        }
        _childProps.onMouseEnter?.(event)
    }

    const onMouseLeave = (event: React.MouseEvent<HTMLElement>) => {
        if (ctx.trigger === 'hover') {
            ctx.closeDropdown()
        } else if (ctx.trigger === 'click-hover' && !ctx.openedViaClick) {
            ctx.closeDropdown()
        }
        _childProps.onMouseLeave?.(event)
    }

    return (
        <Popover.Target popupType="menu" {...others}>
            {cloneElement(child, {
                onClick,
                onMouseEnter,
                onMouseLeave,
                'data-expanded': ctx.opened ? true : undefined
            } as any)}
        </Popover.Target>
    )
}

MenuTarget.displayName = '@mantine/core/MenuTarget'
