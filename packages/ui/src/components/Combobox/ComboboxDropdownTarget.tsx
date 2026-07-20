import { cloneElement } from 'react'
import { useMergedRef } from '@react-ui/hooks'
import { factory, getSingleElementChild, useProps, type Factory } from '../../core'
import { useComboboxContext } from './Combobox.context'

export interface ComboboxDropdownTargetProps {
    /** Target element */
    children: React.ReactNode
}

export type ComboboxDropdownTargetFactory = Factory<{
    props: ComboboxDropdownTargetProps
    ref: HTMLElement
    compound: true
}>

export const ComboboxDropdownTarget = factory<ComboboxDropdownTargetFactory>((props, ref) => {
    const { children } = useProps('ComboboxDropdownTarget', null, props)
    const child = getSingleElementChild(children) as React.ReactElement<any>
    const ctx = useComboboxContext()

    if (!child) {
        throw new Error(
            '[@react-ui/ui] Combobox.DropdownTarget component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported'
        )
    }

    const childProps = child.props as any
    const targetRef = useMergedRef(ctx.targetRef, ref)

    return cloneElement(child, {
        ref: targetRef,
        // 优先使用 child 自带的 id（如 Select 传入的 inputId），让外部 label.htmlFor 能正确关联
        id: childProps.id ?? ctx.targetId,
        'aria-haspopup': 'listbox',
        'aria-expanded': ctx.opened,
        'aria-controls': ctx.opened ? ctx.dropdownId : undefined,
        'aria-activedescendant':
            ctx.opened && ctx.activeIndex >= 0 ? `${ctx.dropdownId}-${ctx.activeIndex}` : undefined,
        className: [childProps.className].filter(Boolean).join(' '),
        onClick: (event: React.MouseEvent<HTMLElement>) => {
            if (!ctx.disabled) {
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

ComboboxDropdownTarget.displayName = '@react-ui/ui/ComboboxDropdownTarget'
