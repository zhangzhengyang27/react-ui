import { Box, factory, rem, useProps, type BoxProps, type Factory } from '../../../core'
import { FloatingArrow } from '../../../core/utils/Floating'
import { Portal } from '../../Portal'
import { Transition } from '../../Transition'
import { useHoverCardContext } from '../HoverCard.context'

export interface HoverCardDropdownProps extends BoxProps {
    /** Dropdown content */
    children: React.ReactNode
}

export type HoverCardDropdownFactory = Factory<{
    props: HoverCardDropdownProps
    ref: HTMLDivElement
    compound: true
}>

export const HoverCardDropdown = factory<HoverCardDropdownFactory>((_props, ref) => {
    const props = useProps('HoverCardDropdown', null, _props)
    const { children, className, style, ...others } = props

    const ctx = useHoverCardContext()

    if (ctx.disabled) {
        return null
    }

    return (
        <Portal>
            <Transition mounted={ctx.opened || false} transition="fade" duration={150}>
                {transitionStyles => (
                    <Box
                        ref={ctx.floating}
                        role="dialog"
                        tabIndex={-1}
                        id={ctx.getDropdownId()}
                        aria-labelledby={ctx.getTargetId()}
                        data-position={ctx.placement}
                        {...others}
                        className={['mantine-HoverCard-dropdown', className].filter(Boolean).join(' ')}
                        style={{
                            ...transitionStyles,
                            position: 'absolute',
                            top: ctx.y ?? 0,
                            left: ctx.x ?? 0,
                            zIndex: ctx.zIndex,
                            width: rem(ctx.width),
                            ...style
                        }}
                        {...ctx.getFloatingProps?.()}
                    >
                        {children}
                        <FloatingArrow
                            ref={ctx.arrowRef as React.RefObject<HTMLDivElement>}
                            arrowX={ctx.arrowX}
                            arrowY={ctx.arrowY}
                            visible={ctx.withArrow}
                            position={ctx.placement}
                            arrowSize={ctx.arrowSize}
                            arrowRadius={ctx.arrowRadius}
                            arrowOffset={ctx.arrowOffset}
                            arrowPosition={ctx.arrowPosition}
                            className="mantine-HoverCard-arrow"
                            style={{ backgroundColor: 'var(--hovercard-bg, white)' }}
                        />
                    </Box>
                )}
            </Transition>
        </Portal>
    )
})

HoverCardDropdown.displayName = '@mantine/core/HoverCardDropdown'
