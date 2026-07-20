import { cloneElement, useEffect } from 'react'
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
    const child = getSingleElementChild(children) as React.ReactElement<any>

    if (!child) {
        throw new Error('[@react-ui/ui] HoverCard.Target children should be an element or a component that accepts ref')
    }

    const ctx = useHoverCardContext()
    const targetRef = useMergedRef(ctx.reference, ref)
    const childProps = child.props as any

    // 优先使用 child 自带的 id，让外部 label.htmlFor 能正确关联；
    // 否则回退到 context 中由 HoverCard 生成的默认 uid。
    // 通过 useEffect 把 childProps.id 同步给 context，让 HoverCardDropdown 的
    // aria-labelledby 能正确指向 target（不在 render 期间调用 setTargetId，避免 setState 警告）。
    const effectiveId = childProps.id ?? ctx.getTargetId()
    useEffect(() => {
        if (childProps.id && childProps.id !== ctx.getTargetId()) {
            ctx.setTargetId(childProps.id)
        }
    }, [childProps.id])

    return cloneElement(child, {
        'aria-haspopup': 'dialog',
        'aria-expanded': ctx.opened,
        'aria-controls': ctx.opened ? ctx.getDropdownId() : undefined,
        id: effectiveId,
        className: [childProps.className].filter(Boolean).join(' '),
        ref: targetRef,
        ...ctx.getReferenceProps?.()
    })
})

HoverCardTarget.displayName = '@react-ui/ui/HoverCardTarget'
