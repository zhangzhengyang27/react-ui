import { useRef } from 'react'
import { useMergedRef } from '@xiaoye-react/hooks'
import {
    type BoxProps,
    type CompoundStylesApiProps,
    type ElementProps,
    factory,
    type Factory,
    useProps
} from '../../core'
import { Popover } from '../Popover'
import { useMenuContext } from './Menu.context'
import { useSubMenuContext } from './MenuSub.context'
import classes from './Menu.module.css'

export type MenuSubDropdownStylesNames = 'dropdown'

export interface MenuSubDropdownProps
    extends BoxProps, CompoundStylesApiProps<MenuSubDropdownFactory>, ElementProps<'div'> {}

export type MenuSubDropdownFactory = Factory<{
    props: MenuSubDropdownProps
    ref: HTMLDivElement
    stylesNames: MenuSubDropdownStylesNames
    compound: true
}>

export const MenuSubDropdown = factory<MenuSubDropdownFactory>((props, ref) => {
    const {
        classNames,
        className,
        style,
        styles,
        vars,
        onMouseEnter,
        onMouseLeave,
        onMouseDown,
        onTouchStart,
        onKeyDown,
        children,
        ...others
    } = useProps('MenuSubDropdown', null, props)

    const wrapperRef = useRef<HTMLDivElement>(null)
    const ctx = useMenuContext()
    const subCtx = useSubMenuContext()

    // 子下拉经 Portal 挂在 body 级共享节点，与父 Menu 下拉是兄弟：
    // Menu 的 clickOutsideEvents 默认含 mousedown/touchstart/keydown，事件冒泡到
    // document 会命中父 Menu 的 click-outside 判定（composedPath 不含父下拉节点），
    // closeOnItemClick={false} 也会整单误关、子下拉内非关闭型交互（搜索框等）不可用。
    // 在此截断向 document 的冒泡（元素级 handler 先于本层执行，子项自身行为不受影响）
    const stopBubbleToDocument = <T extends React.SyntheticEvent>(event: T) => {
        event.stopPropagation()
    }

    return (
        <Popover.Dropdown
            {...others}
            role="menu"
            aria-orientation="vertical"
            ref={useMergedRef(ref, wrapperRef)}
            {...ctx.getStyles('dropdown', {
                className,
                style,
                styles,
                classNames,
                withStaticClass: false
            })}
            tabIndex={-1}
            data-menu-dropdown
            onMouseEnter={event => {
                // 进入下拉时取消待定的关闭定时器，保持子菜单展开
                subCtx.openDelayed()
                onMouseEnter?.(event)
            }}
            onMouseLeave={event => {
                subCtx.closeDelayed()
                onMouseLeave?.(event)
            }}
            onMouseDown={event => {
                stopBubbleToDocument(event)
                onMouseDown?.(event)
            }}
            onTouchStart={event => {
                stopBubbleToDocument(event)
                onTouchStart?.(event)
            }}
            onKeyDown={event => {
                // keydown 不冒泡到 document 后，Escape 仍由 PopoverDropdown 的元素级
                // onKeyDown 处理（stopPropagation 只拦截冒泡，不影响同元素/内层 handler）
                stopBubbleToDocument(event)
                onKeyDown?.(event)
            }}
        >
            {children}
        </Popover.Dropdown>
    )
})

MenuSubDropdown.classes = classes
MenuSubDropdown.displayName = '@xiaoye-react/ui/MenuSubDropdown'
