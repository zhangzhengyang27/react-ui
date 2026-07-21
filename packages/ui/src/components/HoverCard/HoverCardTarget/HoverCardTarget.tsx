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
    const child = getSingleElementChild(children) as React.ReactElement<any> | null
    const childProps = (child?.props ?? {}) as any

    const ctx = useHoverCardContext()
    // React 19 中 ref 是普通 prop，可从 child.props.ref 读取；
    // 合并 child 自带 ref 而不是覆盖，避免丢失外部传入的 ref（与 TooltipFloating 一致）
    const targetRef = useMergedRef(ctx.reference, ref, childProps.ref)

    // 优先使用 child 自带的 id，让外部 label.htmlFor 能正确关联；
    // 否则回退到 context 中由 HoverCard 生成的默认 uid。
    // 通过 useEffect 把 childProps.id 同步给 context，让 HoverCardDropdown 的
    // aria-labelledby 能正确指向 target（不在 render 期间调用 setTargetId，避免 setState 警告）。
    // child id 为 falsy 时必须回退到默认 uid：否则 context 残留旧 id，aria-labelledby 指向失效 id
    const effectiveId = childProps.id ?? ctx.uid
    useEffect(() => {
        const nextId = childProps.id ?? ctx.uid
        if (nextId !== ctx.getTargetId()) {
            ctx.setTargetId(nextId)
        }
    }, [childProps.id])

    // throw 必须在全部 hooks 之后：children 由有效变无效时，hooks 数量不能随条件变化（Rules of Hooks）
    if (!child) {
        throw new Error('[@react-ui/ui] HoverCard.Target children should be an element or a component that accepts ref')
    }

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
