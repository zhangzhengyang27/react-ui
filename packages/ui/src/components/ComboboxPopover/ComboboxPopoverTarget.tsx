import { cloneElement } from 'react'
import { useMergedRef } from '@xiaoye-react/hooks'
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

    // hooks 必须在条件 throw 之前调用，否则 children 变化时 hooks 数量不一致，违反 hooks 规则
    const ctx = useComboboxContext()
    const childProps = (child?.props ?? {}) as any
    // 合并 child 自带 ref 而不是覆盖（cloneElement 的 ref 会直接替换子元素原有 ref）
    const targetRef = useMergedRef(ctx.targetRef, ref, childProps.ref)

    if (!child) {
        throw new Error(
            '[@xiaoye-react/ui] ComboboxPopover.Target component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported'
        )
    }

    return cloneElement(child, {
        [refProp!]: targetRef,
        // 优先使用 child 自带的 id，让外部 label.htmlFor 能正确关联
        id: childProps.id ?? ctx.targetId,
        'aria-haspopup': 'listbox',
        'aria-expanded': ctx.opened,
        'aria-controls': ctx.opened ? ctx.dropdownId : undefined,
        'aria-activedescendant':
            ctx.opened && ctx.activeIndex >= 0 ? `${ctx.dropdownId}-${ctx.activeIndex}` : undefined,
        // 打开期间标记：焦点在目标元素上按 Escape 时，Modal 的 window 捕获监听跳过，
        // 只关下拉不同时关 Modal（对齐 PopoverTarget/ComboboxTarget 的做法）
        'data-ui-stop-propagation': ctx.opened ? 'true' : undefined,
        className: [childProps.className].filter(Boolean).join(' '),
        onClick: (event: React.MouseEvent<HTMLElement>) => {
            if (!ctx.disabled) {
                ctx.onTargetClick()
            }
            childProps.onClick?.(event)
        },
        // 与 ComboboxTarget 一致：ctx 键盘处理放捕获阶段，防止嵌套输入框 Enter 双触发
        onKeyDownCapture: (event: React.KeyboardEvent<HTMLElement>) => {
            ctx.onTargetKeyDown(event)
        },
        onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => {
            childProps.onKeyDown?.(event)
        }
    })
})

ComboboxPopoverTarget.displayName = '@xiaoye-react/ui/ComboboxPopoverTarget'
