import { useMergedRef } from '@xiaoye-react/hooks'
import { Box, ElementProps, factory, rem, useProps, type BoxProps, type Factory } from '../../../core'
import { FloatingArrow } from '../../../core/utils/Floating'
import { FocusTrap } from '../../FocusTrap'
import { OptionalPortal } from '../../Portal'
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
    const { children, className, style, onKeyDown, ...others } = props

    const ctx = usePopoverContext()
    const mergedRef = useMergedRef(ref, ctx.floating)

    if (ctx.disabled) {
        return null
    }

    // 经 context 上的 styles api 接线（对齐 Menu 模式）：radius/shadow 经 varsResolver
    // 产出的 --popover-* CSS 变量与 classNames/styles/unstyled 在此生效；
    // 静态类 ui-Popover-dropdown 继续保留拼接（global.css 依它提供基础视觉）
    const { className: dropdownClassName, style: dropdownStyles } = ctx.getStyles('dropdown', {
        className,
        withStaticClass: false
    })
    const arrowStyles = ctx.getStyles('arrow', { withStaticClass: false })

    // transitionProps prop 已移除（决策 A）：过渡固定为 fade/150ms；Portal 无条件渲染
    return (
        <OptionalPortal withinPortal={ctx.withinPortal}>
            <Transition
                mounted={ctx.opened}
                transition={(ctx.transitionProps?.transition as any) ?? 'fade'}
                duration={ctx.transitionProps?.duration ?? 150}
                timingFunction={ctx.transitionProps?.timingFunction}
                onEntered={ctx.transitionProps?.onEntered}
                onExited={ctx.transitionProps?.onExited}
            >
                {transitionStyles => (
                    <FocusTrap active={ctx.trapFocus && ctx.opened} innerRef={mergedRef}>
                        <Box
                            role="dialog"
                            tabIndex={-1}
                            id={ctx.getDropdownId()}
                            aria-labelledby={ctx.getTargetId()}
                            data-position={ctx.placement}
                            data-reference-hidden={ctx.referenceHidden || undefined}
                            // Modal 的 window 捕获 Escape 监听据它跳过（use-modal 用 closest 查找），
                            // 浮层内的 Escape 由本组件 onKeyDown 处理，避免双关
                            data-ui-stop-propagation="true"
                            {...others}
                            onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) => {
                                onKeyDown?.(event)
                                // closeOnEscape 此前只进入 context 无人消费，Escape 永远无法关闭浮层；
                                // stopPropagation 避免嵌套浮层（如 Menu.Sub）一次 Escape 全部关闭
                                if (event.key === 'Escape' && ctx.closeOnEscape && !event.defaultPrevented) {
                                    event.stopPropagation()
                                    ctx.onClose?.()
                                }
                            }}
                            className={['ui-Popover-dropdown', dropdownClassName].filter(Boolean).join(' ')}
                            style={{
                                ...dropdownStyles,
                                ...transitionStyles,
                                position: 'absolute',
                                top: ctx.y ?? 0,
                                left: ctx.x ?? 0,
                                zIndex: ctx.zIndex,
                                width: rem(ctx.width),
                                // hide 中间件：触发元素滚出视口后隐藏浮层，避免常开浮层
                                // 被 shift 钳制在视口内漂浮在无关内容上（覆盖过渡样式的 visibility）
                                visibility: ctx.referenceHidden ? 'hidden' : undefined,
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
                                className={['ui-Popover-arrow', arrowStyles.className].filter(Boolean).join(' ')}
                                style={arrowStyles.style}
                            />
                        </Box>
                    </FocusTrap>
                )}
            </Transition>
        </OptionalPortal>
    )
})

PopoverDropdown.displayName = '@xiaoye-react/ui/PopoverDropdown'
