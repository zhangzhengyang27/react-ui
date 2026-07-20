import { cloneElement, useEffect } from 'react'
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

    // 优先使用 child 自带的 id（如 ColorInput 传入的 inputId），
    // 让外部 InputWrapper 的 label.htmlFor 能正确关联到 target；
    // 否则回退到 context 中由 Popover 生成的默认 uid。
    // 通过 useEffect 把 childProps.id 同步给 context，让 PopoverDropdown 的
    // aria-labelledby 能正确指向 target（不在 render 期间调用 setTargetId，避免 setState 警告）。
    const effectiveId = childProps.id ?? ctx.getTargetId()
    useEffect(() => {
        if (childProps.id && childProps.id !== ctx.getTargetId()) {
            ctx.setTargetId(childProps.id)
        }
    }, [childProps.id])

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

PopoverTarget.displayName = '@react-ui/ui/PopoverTarget'
