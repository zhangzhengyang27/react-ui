import { cloneElement, useEffect } from 'react'
import { useMergedRef } from '@xiaoye-react/hooks'
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
    const child = getSingleElementChild(children) as React.ReactElement<any> | null
    const childProps = (child?.props ?? {}) as any

    const ctx = usePopoverContext()
    // React 19 中 ref 是普通 prop，可从 child.props.ref 读取；
    // 合并 child 自带 ref 而不是覆盖，避免丢失外部传入的 ref（与 TooltipFloating 一致）
    const targetRef = useMergedRef(ctx.reference, ref, childProps.ref)

    // 优先使用 child 自带的 id（如 ColorInput 传入的 inputId），
    // 让外部 InputWrapper 的 label.htmlFor 能正确关联到 target；
    // 否则回退到 context 中由 Popover 生成的默认 uid。
    // 通过 useEffect 把 childProps.id 同步给 context，让 PopoverDropdown 的
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
        throw new Error('[@xiaoye-react/ui] Popover.Target children should be an element or a component that accepts ref')
    }

    return cloneElement(child, {
        'aria-haspopup': popupType,
        'aria-expanded': ctx.opened,
        'aria-controls': ctx.opened ? ctx.getDropdownId() : undefined,
        id: effectiveId,
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

PopoverTarget.displayName = '@xiaoye-react/ui/PopoverTarget'
