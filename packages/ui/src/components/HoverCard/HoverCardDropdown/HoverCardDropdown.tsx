import { Box, factory, rem, useProps, type BoxProps, type Factory } from '../../../core'
import { useMergedRef } from '@xiaoye-react/hooks'
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

    // 经 context 上的 styles api 接线（对齐 Menu 模式）：radius/shadow 经 varsResolver
    // 产出的 --hovercard-* CSS 变量与 classNames/styles/unstyled 在此生效；
    // 静态类 ui-HoverCard-dropdown 继续保留拼接（global.css 依它提供基础视觉）
    const { className: dropdownClassName, style: dropdownStyles } = ctx.getStyles('dropdown', {
        className,
        withStaticClass: false
    })
    const arrowStyles = ctx.getStyles('arrow', { withStaticClass: false })

    return (
        <Portal>
            <Transition mounted={ctx.opened || false} transition="fade" duration={150} {...ctx.transitionProps}>
                {transitionStyles => (
                    <Box
                        ref={mergedRef}
                        role="dialog"
                        tabIndex={-1}
                        id={ctx.getDropdownId()}
                        aria-labelledby={ctx.getTargetId()}
                        data-position={ctx.placement}
                        {...others}
                        className={['ui-HoverCard-dropdown', dropdownClassName].filter(Boolean).join(' ')}
                        style={{
                            ...dropdownStyles,
                            ...transitionStyles,
                            // floatingStrategy prop 已移除（决策 A）：useFloating 固定为默认 absolute 策略，
                            // x/y 为文档绝对坐标，与 position: 'absolute' 保持一致（改为 fixed 会导致坐标错位）
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
                            className={['ui-HoverCard-arrow', arrowStyles.className].filter(Boolean).join(' ')}
                            style={arrowStyles.style}
                        />
                    </Box>
                )}
            </Transition>
        </Portal>
    )
})

HoverCardDropdown.displayName = '@xiaoye-react/ui/HoverCardDropdown'
