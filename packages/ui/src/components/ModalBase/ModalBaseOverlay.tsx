import { forwardRef } from 'react'
import type { UIStyleProp } from '../../core'
import { Overlay, type OverlayProps } from '../Overlay'
import { Transition } from '../Transition'
import { useModalBaseContext } from './ModalBase.context'

export interface ModalBaseOverlayProps extends Omit<OverlayProps, 'styles' | 'classNames' | 'variant' | 'vars'> {
    /** 传递给 Transition 组件的属性 */
    transitionProps?: import('../Transition').TransitionOverride

    /** Determines whether the overlay should be visible */
    visible?: boolean

    /** Called when overlay is clicked */
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}

export const ModalBaseOverlay = forwardRef<HTMLDivElement, ModalBaseOverlayProps>(
    ({ onClick, transitionProps, style, visible, ...others }, ref) => {
        const ctx = useModalBaseContext()

        return (
            <Transition
                mounted={visible !== undefined ? visible : ctx.opened}
                transition="fade"
                duration={200}
                {...transitionProps}
            >
                {transitionStyles => (
                    <Overlay
                        ref={ref}
                        fixed
                        style={{ ...style, ...transitionStyles } as UIStyleProp}
                        zIndex={ctx.zIndex}
                        unstyled={ctx.unstyled}
                        onClick={event => {
                            onClick?.(event)
                            // 用户 onClick 中调用 preventDefault 时不关闭,尊重其阻止关闭的意图
                            !event.defaultPrevented && ctx.closeOnClickOutside && ctx.onClose()
                        }}
                        {...others}
                    />
                )}
            </Transition>
        )
    }
)

ModalBaseOverlay.displayName = '@react-ui/ui/ModalBaseOverlay'
