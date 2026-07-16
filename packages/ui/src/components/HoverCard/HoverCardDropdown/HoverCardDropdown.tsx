import { Box, factory, rem, useProps, type BoxProps, type Factory } from '../../../core'
import { useMergedRef } from '@react-ui/hooks'
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
    const mergedRef = useMergedRef(ctx.floating, ref)

    if (ctx.disabled) {
        return null
    }

    return (
        <Portal>
            <Transition mounted={ctx.opened || false} transition="fade" duration={150}>
                {transitionStyles => (
                    <Box
                        ref={mergedRef}
                        role="dialog"
                        tabIndex={-1}
                        id={ctx.getDropdownId()}
                        aria-labelledby={ctx.getTargetId()}
                        data-position={ctx.placement}
                        {...others}
                        className={['ui-HoverCard-dropdown', className].filter(Boolean).join(' ')}
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
                            className="ui-HoverCard-arrow"
                            style={{ backgroundColor: 'var(--ui-color-body)' }}
                        />
                    </Box>
                )}
            </Transition>
        </Portal>
    )
})

HoverCardDropdown.displayName = '@react-ui/ui/HoverCardDropdown'
