import { cloneElement } from 'react'
import { useMergedRef } from '@react-ui/hooks'
import { factory, Factory, getSingleElementChild, useProps } from '../../core'
import { useComboboxContext } from '../Combobox/Combobox.context'

export interface ComboboxPopoverTargetProps {
    /** Target element */
    children: React.ReactNode

    /** Key of the prop that is used to access element ref @default 'ref' */
    refProp?: string
}

export type ComboboxPopoverTargetFactory = Factory<{
    props: ComboboxPopoverTargetProps
    ref: HTMLElement
    compound: true
}>

const defaultProps = {
    refProp: 'ref'
} satisfies Partial<ComboboxPopoverTargetProps>

export const ComboboxPopoverTarget = factory<ComboboxPopoverTargetFactory>((props, ref) => {
    const { children, refProp } = useProps('ComboboxPopoverTarget', defaultProps, props)
    const child = getSingleElementChild(children) as React.ReactElement<any>

    if (!child) {
        throw new Error(
            '[@react-ui/ui] ComboboxPopover.Target component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported'
        )
    }

    const ctx = useComboboxContext()
    const targetRef = useMergedRef(ctx.targetRef, ref)
    const childProps = child.props as any

    return cloneElement(child, {
        [refProp!]: targetRef,
        id: ctx.targetId,
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

ComboboxPopoverTarget.displayName = '@react-ui/ui/ComboboxPopoverTarget'
