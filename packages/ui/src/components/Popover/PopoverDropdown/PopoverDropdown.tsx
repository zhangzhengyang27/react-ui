import { useMergedRef } from '@react-ui/hooks'
import { Box, ElementProps, factory, rem, useProps, type BoxProps, type Factory } from '../../../core'
import { FloatingArrow } from '../../../core/utils/Floating'
import { FocusTrap } from '../../FocusTrap'
import { Portal } from '../../Portal'
import { Transition } from '../../Transition'
import { usePopoverContext } from '../Popover.context'

export interface PopoverDropdownProps extends BoxProps, ElementProps<'div'> {
    /** Dropdown content */
    children: React.ReactNode
}

export type PopoverDropdownFactory = Factory<{
    props: PopoverDropdownProps
    ref: HTMLDivElement
    compound: true
}>

export const PopoverDropdown = factory<PopoverDropdownFactory>((_props, ref) => {
    const props = useProps('PopoverDropdown', null, _props)
    const { children, className, style, ...others } = props

    const ctx = usePopoverContext()
    const mergedRef = useMergedRef(ref, ctx.floating)

    if (ctx.disabled) {
        return null
    }

    return (
        <Portal>
            <Transition mounted={ctx.opened} transition="fade" duration={150}>
                {transitionStyles => (
                    <FocusTrap active={ctx.trapFocus && ctx.opened} innerRef={mergedRef}>
                        <Box
                            role="dialog"
                            tabIndex={-1}
                            id={ctx.getDropdownId()}
                            aria-labelledby={ctx.getTargetId()}
                            data-position={ctx.placement}
                            {...others}
                            className={['ui-Popover-dropdown', className].filter(Boolean).join(' ')}
                            style={{
                                ...transitionStyles,
                                position: 'absolute',
                                top: ctx.y ?? 0,
                                left: ctx.x ?? 0,
                                zIndex: ctx.zIndex,
                                width: rem(ctx.width),
                                ...style
                            }}
                        >
                            {children}
                            <FloatingArrow
                                ref={ctx.arrowRef}
                                arrowX={ctx.arrowX}
                                arrowY={ctx.arrowY}
                                visible={ctx.withArrow}
                                position={ctx.placement}
                                arrowSize={ctx.arrowSize}
                                arrowRadius={ctx.arrowRadius}
                                arrowOffset={ctx.arrowOffset}
                                arrowPosition={ctx.arrowPosition}
                                className="ui-Popover-arrow"
                                style={{ backgroundColor: 'var(--ui-color-body)' }}
                            />
                        </Box>
                    </FocusTrap>
                )}
            </Transition>
        </Portal>
    )
})

PopoverDropdown.displayName = '@react-ui/ui/PopoverDropdown'
