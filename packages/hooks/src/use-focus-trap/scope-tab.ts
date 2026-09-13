import { findTabbableDescendants } from './tabbable'

export function scopeTab(node: HTMLElement, event: KeyboardEvent) {
    const tabbable = findTabbableDescendants(node)
    if (!tabbable.length) {
        event.preventDefault()
        return
    }
    const root = node.getRootNode() as unknown as DocumentOrShadowRoot
    const activeElement = root.activeElement as Element | null

    // 焦点漂移到陷阱外的 body/documentElement（点击 Modal 非焦点区后 activeElement=body）时，
    // 浏览器默认把 Tab 移入被遮罩的背景页面：拦截并拉回陷阱内。
    // 只拦这一类漂移——多陷阱嵌套时另一陷阱内的焦点仍靠下方
    // leavingFinalTabbable 早退互不干扰，在这里拦截会抢走对方焦点
    if (
        (!activeElement || activeElement === document.body || activeElement === document.documentElement) &&
        !node.contains(activeElement)
    ) {
        event.preventDefault()
        const target = tabbable[event.shiftKey ? tabbable.length - 1 : 0]
        target?.focus()
        return
    }

    const finalTabbable = tabbable[event.shiftKey ? 0 : tabbable.length - 1]
    let leavingFinalTabbable = finalTabbable === root.activeElement || node === root.activeElement

    const activeElementIsRadio =
        activeElement?.tagName === 'INPUT' && activeElement.getAttribute('type') === 'radio'
    if (activeElementIsRadio) {
        const activeRadioGroup = tabbable.filter(
            element =>
                element.getAttribute('type') === 'radio' &&
                element.getAttribute('name') === activeElement.getAttribute('name')
        )
        leavingFinalTabbable = activeRadioGroup.includes(finalTabbable)
    }

    if (!leavingFinalTabbable) {
        return
    }

    event.preventDefault()

    const target = tabbable[event.shiftKey ? tabbable.length - 1 : 0]

    if (target) {
        target.focus()
    }
}
