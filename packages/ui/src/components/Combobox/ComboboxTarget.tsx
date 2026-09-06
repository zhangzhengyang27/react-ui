import { cloneElement } from 'react'
import { useMergedRef } from '@xiaoye-react/hooks'
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

    // hooks 必须在条件 throw 之前调用，否则 children 变化时 hooks 数量不一致，违反 hooks 规则
    const ctx = useComboboxContext()
    const childProps = (child?.props ?? {}) as any
    // 合并 child 自带 ref 而不是覆盖，避免丢失外部传入的 ref
    const targetRef = useMergedRef(ctx.targetRef, ref, childProps.ref)

    if (!child) {
        throw new Error('[@xiaoye-react/ui] Combobox.Target children should be an element or a component that accepts ref')
    }

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
        // ctx 的键盘处理放在捕获阶段：wrapper 内层输入框（如 TagsInput 的输入框）自身的 onKeyDown
        // 会在冒泡到 wrapper 前先执行，若 ctx 在冒泡阶段处理，Enter 会同时触发"输入框加 tag"和
        // "ctx 选中激活选项"。捕获阶段先执行 ctx 逻辑，选中激活选项时 preventDefault，
        // 内层处理器即可通过 event.defaultPrevented 放弃处理
        onKeyDownCapture: (event: React.KeyboardEvent<HTMLElement>) => {
            ctx.onTargetKeyDown(event)
        },
        onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => {
            childProps.onKeyDown?.(event)
        }
    })
})

ComboboxTarget.displayName = '@xiaoye-react/ui/ComboboxTarget'
