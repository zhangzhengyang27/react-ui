import { Box, ElementProps, factory, useProps, type BoxProps, type Factory } from '../../core'
import { useMergedRef } from '@xiaoye-react/hooks'
import { FloatingArrow } from '../../core/utils/Floating'
import { Portal } from '../Portal'
import { Transition } from '../Transition'
import type { UITransitionName } from '../Transition/transitions'
import { useComboboxContext } from './Combobox.context'
import classes from './Combobox.module.css'

export interface ComboboxDropdownProps extends BoxProps, ElementProps<'div'> {
    /** Dropdown content */
    children: React.ReactNode
}

export type ComboboxDropdownFactory = Factory<{
    props: ComboboxDropdownProps
    ref: HTMLDivElement
    compound: true
}>

/**
 * 下拉浮层：定位/过渡配置统一由 Combobox 根组件经 context 下发（对齐 Popover.Dropdown），
 * 因此 withArrow / transitionProps / keepMounted / floatingHeight 都写在 <Combobox> 上。
 */
export const ComboboxDropdown = factory<ComboboxDropdownFactory>((_props, ref) => {
    const props = useProps('ComboboxDropdown', null, _props)
    const { children, className, style, ...others } = props
    const ctx = useComboboxContext()
    const mergedRef = useMergedRef(ctx.dropdownRef, ref)

    // transitionProps 未传时表达式回落为 fade / 150ms，与改动前的固定值完全一致。
    // UITransitionName 收窄是因为库内过渡名是字面量联合，未知名由 getTransitionStyles 兜底为无样式
    const transition = (ctx.transitionProps?.transition ?? 'fade') as UITransitionName

    return (
        <Portal>
            <Transition
                mounted={ctx.opened}
                keepMounted={ctx.keepMounted}
                transition={transition}
                duration={ctx.transitionProps?.duration ?? 150}
                timingFunction={ctx.transitionProps?.timingFunction}
                onEntered={ctx.transitionProps?.onEntered}
                onExited={ctx.transitionProps?.onExited}
            >
                {transitionStyles => (
                    <Box
                        ref={mergedRef}
                        id={ctx.dropdownId}
                        role="listbox"
                        aria-orientation="vertical"
                        // 打开期间标记：焦点在下拉内按 Escape 时，Modal 的 window 捕获监听跳过，
                        // 只关下拉不同时关 Modal（对齐 PopoverDropdown 的做法）
                        data-ui-stop-propagation="true"
                        className={[classes.dropdown, className].filter(Boolean).join(' ')}
                        style={{
                            ...transitionStyles,
                            position: 'absolute',
                            top: ctx.y ?? 0,
                            left: ctx.x ?? 0,
                            zIndex: 300,
                            // 仅 floatingHeight 生效时注入：面板限高 + 把同一高度交给内部
                            // ScrollArea/Autosize（mah="var(--combobox-floating-options-max-height)"）
                            ...(ctx.floatingHeight
                                ? {
                                      maxHeight: ctx.floatingHeight,
                                      '--combobox-floating-options-max-height': `${ctx.floatingHeight}px`
                                  }
                                : null),
                            // 消费者 style 保持最后展开：现有覆盖顺序（含上面的 maxHeight）不变
                            ...style
                        }}
                        {...others}
                    >
                        {children}
                        {/* FloatingArrow 在 visible 为假时直接返回 null：默认（withArrow=false）DOM 与改动前一致 */}
                        <FloatingArrow
                            ref={ctx.arrowRef}
                            arrowX={ctx.arrowX}
                            arrowY={ctx.arrowY}
                            visible={ctx.withArrow}
                            position={ctx.placement}
                            arrowSize={ctx.arrowSize}
                            arrowRadius={0}
                            arrowOffset={ctx.arrowOffset}
                            arrowPosition="side"
                            className={classes.arrow}
                        />
                    </Box>
                )}
            </Transition>
        </Portal>
    )
})

ComboboxDropdown.displayName = '@xiaoye-react/ui/ComboboxDropdown'
