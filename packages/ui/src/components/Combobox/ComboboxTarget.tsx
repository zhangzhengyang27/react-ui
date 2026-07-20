import { cloneElement } from 'react'
import { useMergedRef } from '@react-ui/hooks'
import { factory, getSingleElementChild, useProps, type Factory } from '../../core'
import { useComboboxContext } from './Combobox.context'

export interface ComboboxTargetProps {
    /** Target element */
    children: React.ReactNode
}

export type ComboboxTargetFactory = Factory<{
    props: ComboboxTargetProps
    ref: HTMLElement
    compound: true
}>

export const ComboboxTarget = factory<ComboboxTargetFactory>((props, ref) => {
    const { children } = useProps('ComboboxTarget', null, props)
    const child = getSingleElementChild(children) as React.ReactElement<any>

    if (!child) {
        throw new Error('[@react-ui/ui] Combobox.Target children should be an element or a component that accepts ref')
    }

    const ctx = useComboboxContext()
    const targetRef = useMergedRef(ctx.targetRef, ref)
    const childProps = child.props as any

    const isTextInput = childProps.component === 'input' || child.type === 'input' || child.type === 'textarea'
    const ignoreClick = isTextInput && childProps.readOnly !== true

    return cloneElement(child, {
        ref: targetRef,
        // 优先使用 child 自带的 id（如 Select 传入的 inputId），让外部 label.htmlFor 能正确关联；
        // 否则回退到 ctx.targetId，保持 Combobox 内部的默认行为
        id: childProps.id ?? ctx.targetId,
        'aria-haspopup': 'listbox',
        'aria-expanded': ctx.opened,
        'aria-controls': ctx.opened ? ctx.dropdownId : undefined,
        'aria-activedescendant':
            ctx.opened && ctx.activeIndex >= 0 ? `${ctx.dropdownId}-${ctx.activeIndex}` : undefined,
        className: [childProps.className].filter(Boolean).join(' '),
        onClick: (event: React.MouseEvent<HTMLElement>) => {
            if (!ctx.disabled && !ignoreClick) {
                ctx.onTargetClick()
            }
            childProps.onClick?.(event)
        },
        onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => {
            ctx.onTargetKeyDown(event)
            childProps.onKeyDown?.(event)
        }
    })
})

ComboboxTarget.displayName = '@react-ui/ui/ComboboxTarget'
