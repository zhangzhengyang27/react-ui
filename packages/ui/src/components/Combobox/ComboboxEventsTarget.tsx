import { cloneElement } from 'react'
import { useMergedRef } from '@react-ui/hooks'
import { factory, getSingleElementChild, useProps, type Factory } from '../../core'
import { useComboboxContext } from './Combobox.context'

export interface ComboboxEventsTargetProps {
    /** Target element */
    children: React.ReactNode

    /** Key of the prop used to access element ref */
    refProp?: string

    /** Input autocomplete attribute */
    autoComplete?: string
}

export type ComboboxEventsTargetFactory = Factory<{
    props: ComboboxEventsTargetProps
    ref: HTMLElement
    compound: true
}>

const defaultProps = {
    refProp: 'ref',
    autoComplete: 'off'
} satisfies Partial<ComboboxEventsTargetProps>

export const ComboboxEventsTarget = factory<ComboboxEventsTargetFactory>((props, ref) => {
    const { children, refProp, autoComplete, ...others } = useProps('ComboboxEventsTarget', defaultProps, props)
    const child = getSingleElementChild(children) as React.ReactElement<any>

    if (!child) {
        throw new Error(
            '[@react-ui/ui] Combobox.EventsTarget children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported'
        )
    }

    const ctx = useComboboxContext()
    const childProps = child.props as any

    return cloneElement(child, {
        ...others,
        [refProp!]: useMergedRef(ref, ctx.targetRef),
        // 优先使用 child 自带的 id，让外部 label.htmlFor 能正确关联
        id: childProps.id ?? ctx.targetId,
        'aria-haspopup': 'listbox',
        'aria-expanded': ctx.opened,
        'aria-controls': ctx.opened ? ctx.dropdownId : undefined,
        'aria-activedescendant':
            ctx.opened && ctx.activeIndex >= 0 ? `${ctx.dropdownId}-${ctx.activeIndex}` : undefined,
        autoComplete,
        onClick: (event: React.MouseEvent<HTMLElement>) => {
            childProps.onClick?.(event)
        },
        onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => {
            ctx.onTargetKeyDown(event)
            childProps.onKeyDown?.(event)
        }
    })
})

ComboboxEventsTarget.displayName = '@react-ui/ui/ComboboxEventsTarget'
