import { cloneElement } from 'react'
import { useMergedRef } from '@react-ui/hooks'
import { factory, getSingleElementChild, useProps, type Factory } from '../../../core'
import { usePopoverContext } from '../Popover.context'

export interface PopoverTargetProps {
    /** Target element */
    children: React.ReactNode

    /** Popup accessible type */
    popupType?: string
}

const defaultProps = {
    popupType: 'dialog'
} satisfies Partial<PopoverTargetProps>

export type PopoverTargetFactory = Factory<{
    props: PopoverTargetProps
    ref: HTMLElement
    compound: true
}>

export const PopoverTarget = factory<PopoverTargetFactory>((props, ref) => {
    const { children, popupType } = useProps('PopoverTarget', defaultProps, props)
    const child = getSingleElementChild(children) as React.ReactElement<any>

    if (!child) {
        throw new Error('[@react-ui/ui] Popover.Target children should be an element or a component that accepts ref')
    }

    const ctx = usePopoverContext()
    const targetRef = useMergedRef(ctx.reference, ref)
    const childProps = child.props as any

    return cloneElement(child, {
        'aria-haspopup': popupType,
        'aria-expanded': ctx.opened,
        'aria-controls': ctx.opened ? ctx.getDropdownId() : undefined,
        id: ctx.getTargetId(),
        className: [childProps.className].filter(Boolean).join(' '),
        ref: targetRef,
        onClick: (event: React.MouseEvent<HTMLElement>) => {
            if (!ctx.controlled) {
                ctx.onToggle()
            }
            childProps.onClick?.(event)
        }
    })
})

PopoverTarget.displayName = '@react-ui/ui/PopoverTarget'
