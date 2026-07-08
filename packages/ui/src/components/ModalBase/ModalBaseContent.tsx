import { FocusTrap } from '../FocusTrap'
import { Paper } from '../Paper'
import { Transition } from '../Transition'
import { useModalBaseContext } from './ModalBase.context'
import classes from './ModalBase.module.css'

export interface ModalBaseContentProps {
    /** Props passed down to the Transition component */
    transitionProps?: import('../Transition').TransitionOverride

    /** Content */
    children?: React.ReactNode

    /** Inner element props */
    innerProps?: React.ComponentProps<'div'>
}

export function ModalBaseContent({
    transitionProps,
    className,
    innerProps,
    style,
    children,
    ref,
    ...others
}: ModalBaseContentProps & React.ComponentProps<'div'>) {
    const ctx = useModalBaseContext()

    return (
        <Transition
            mounted={ctx.opened}
            transition="pop"
            {...ctx.transitionProps}
            onExited={() => {
                ctx.onExitTransitionEnd?.()
                ctx.transitionProps?.onExited?.()
            }}
            onEntered={() => {
                ctx.onEnterTransitionEnd?.()
                ctx.transitionProps?.onEntered?.()
            }}
            {...transitionProps}
        >
            {transitionStyles => (
                <div {...innerProps} className={[classes.inner, innerProps?.className].filter(Boolean).join(' ')}>
                    <FocusTrap active={ctx.opened && ctx.trapFocus}>
                        <Paper
                            {...others}
                            component="section"
                            role="dialog"
                            tabIndex={-1}
                            aria-modal
                            aria-describedby={ctx.bodyMounted ? ctx.getBodyId() : undefined}
                            aria-labelledby={ctx.titleMounted ? ctx.getTitleId() : undefined}
                            style={{ ...style, ...transitionStyles }}
                            className={[classes.content, className].filter(Boolean).join(' ')}
                            unstyled={ctx.unstyled}
                        >
                            {children}
                        </Paper>
                    </FocusTrap>
                </div>
            )}
        </Transition>
    )
}

ModalBaseContent.displayName = '@mantine/core/ModalBaseContent'
