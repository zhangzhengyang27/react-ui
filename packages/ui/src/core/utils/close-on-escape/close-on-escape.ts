import type { KeyboardEvent } from 'react'

interface CloseOnEscapeOptions {
    /** 处理器是否处于激活状态；为 false 时按下 Escape 不会触发回调 */
    active?: boolean
    /** 在回调执行前触发（例如用于清理副作用） */
    onTrigger?: () => void
}

/**
 * 创建一个键盘事件处理器，当按下 Escape 键时调用给定回调。
 *
 * @example
 * <div onKeyDown={closeOnEscape(() => setOpened(false))} />
 *
 * @example
 * <div onKeyDown={closeOnEscape(() => setOpened(false), { active: isOpened })} />
 */
export function closeOnEscape(callback: () => void, options?: CloseOnEscapeOptions) {
    return (event: KeyboardEvent<HTMLElement>) => {
        const shouldTrigger = options?.active ?? true

        if (event.key === 'Escape' && shouldTrigger) {
            options?.onTrigger?.()
            callback()
        }
    }
}
