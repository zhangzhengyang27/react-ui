import { cloneElement } from 'react'
import { useMergedRef } from '@react-ui/hooks'
import { factory, getSingleElementChild, useProps, type Factory } from '../../../core'
import { useHoverCardContext } from '../HoverCard.context'

export interface HoverCardTargetProps {
    /** Target element */
    children: React.ReactNode
}

export type HoverCardTargetFactory = Factory<{
    props: HoverCardTargetProps
    ref: HTMLElement
    compound: true
}>

export const HoverCardTarget = factory<HoverCardTargetFactory>((props, ref) => {
    const { children } = useProps('HoverCardTarget', null, props)
    const child = getSingleElementChild(children)

    if (!child) {
        throw new Error('[@react-ui/ui] HoverCard.Target children should be an element or a component that accepts ref')
    }

    const ctx = useHoverCardContext()
    const targetRef = useMergedRef(ctx.reference, ref)
    const childProps = child.props as any

    return cloneElement(child, {
        'aria-haspopup': 'dialog',
        'aria-expanded': ctx.opened,
        'aria-controls': ctx.opened ? ctx.getDropdownId() : undefined,
        id: ctx.getTargetId(),
        className: [childProps.className].filter(Boolean).join(' '),
        ref: targetRef,
        ...ctx.getReferenceProps?.()
    })
})

HoverCardTarget.displayName = '@mantine/core/HoverCardTarget'
