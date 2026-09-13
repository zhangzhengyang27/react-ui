import { useEffect, useState } from 'react'
import { useFocusReturn, useId } from '@xiaoye-react/hooks'
import type { TransitionOverride } from '../Transition'
import { isTopmostModal, popModal, pushModal } from './modal-stack'

interface UseModalInput {
    opened: boolean
    onClose: () => void
    id: string | undefined
    transitionProps: TransitionOverride | undefined
    trapFocus: boolean | undefined
    closeOnEscape: boolean | undefined
    returnFocus: boolean | undefined
}

export function useModal({ id, transitionProps, opened, closeOnEscape, onClose, returnFocus }: UseModalInput) {
    const _id = useId(id)
    const [titleMounted, setTitleMounted] = useState(false)
    const [bodyMounted, setBodyMounted] = useState(false)

    const transitionDuration = typeof transitionProps?.duration === 'number' ? transitionProps.duration : 200

    // 关闭后把焦点还给触发元素：此前 returnFocus prop 只是透传、从未生效
    useFocusReturn({ opened, shouldReturnFocus: !!returnFocus })

    // opened 期间登记到模态栈,供嵌套模态框按打开顺序仲裁 Escape 行为
    useEffect(() => {
        if (opened) {
            pushModal(_id)
            return () => popModal(_id)
        }

        return undefined
    }, [opened, _id])

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            // 仅栈顶模态框响应 Escape,避免嵌套打开时一次按键关闭所有模态框
            if (event.key === 'Escape' && closeOnEscape && !event.isComposing && opened && isTopmostModal(_id)) {
                // 事件目标位于带 data-ui-stop-propagation 标记的元素内（浮层下拉、Menu 项等）
                // 时不响应：这些位置的 Escape 由浮层自身处理，避免 Modal+Popover 嵌套时双关
                const shouldTrigger = !(event.target as HTMLElement | null)?.closest?.(
                    '[data-ui-stop-propagation="true"]'
                )
                if (shouldTrigger) {
                    onClose()
                }
            }
        }

        window.addEventListener('keydown', handleKeyDown, true)
        return () => window.removeEventListener('keydown', handleKeyDown, true)
    }, [closeOnEscape, opened, onClose, _id])

    return {
        _id,
        titleMounted,
        bodyMounted,
        transitionDuration,
        setTitleMounted,
        setBodyMounted
    }
}
