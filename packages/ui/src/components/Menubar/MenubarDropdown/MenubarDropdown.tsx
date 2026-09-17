import { useEffect, useRef } from 'react'
import { Menu, MenuDropdownProps } from '../../Menu'
import { useDirection } from '../../../core'
import { useMenubarContext, useMenubarMenuContext } from '../Menubar.context'

export interface MenubarDropdownProps extends MenuDropdownProps {}

function createEventHandler<T>(handler: ((event: T) => void) | undefined, fn: (event: T) => void) {
    return (event: T) => {
        handler?.(event)
        fn(event)
    }
}

export function MenubarDropdown(props: MenubarDropdownProps) {
    const { onKeyDown, onMouseEnter, onMouseLeave, ...others } = props
    const ctx = useMenubarContext()
    const menuCtx = useMenubarMenuContext()
    const { dir } = useDirection()

    // Escape 后延迟归还焦点的定时器 id，卸载时清理，避免卸载后仍触发 focusTarget
    const focusTimeoutRef = useRef(-1)
    useEffect(() => () => window.clearTimeout(focusTimeoutRef.current), [])

    const handleMouseEnter = createEventHandler<any>(onMouseEnter, () => ctx.cancelClose())

    const handleMouseLeave = createEventHandler<any>(onMouseLeave, () => {
        if (ctx.trigger === 'hover') {
            ctx.scheduleClose()
        }
    })

    const switchToAdjacent = (direction: 1 | -1) => {
        const nextIndex = ctx.getAdjacentIndex(menuCtx.index, direction)
        if (nextIndex !== menuCtx.index) {
            ctx.setActiveIndex(nextIndex)
            ctx.openMenu(nextIndex, 'click')
            ctx.focusMenuItem(nextIndex, 'first')
        }
    }

    const handleKeyDown = createEventHandler<any>(onKeyDown, (event) => {
        const target = event.target as HTMLElement

        if (event.key === 'Tab') {
            ctx.focusTarget(menuCtx.index)
            ctx.closeMenu()
            return
        }

        if (target.closest('[data-menu-dropdown]') !== event.currentTarget) {
            return
        }

        // 横向切换到相邻菜单的前进/后退键随 dir 翻转：RTL 下视觉上的「下一个」在左侧
        const forwardKey = dir === 'rtl' ? 'ArrowLeft' : 'ArrowRight'
        const backKey = dir === 'rtl' ? 'ArrowRight' : 'ArrowLeft'

        if (event.key === forwardKey) {
            if (target.closest('[data-menu-item]')?.hasAttribute('data-sub-menu-item')) {
                return
            }
            event.preventDefault()
            switchToAdjacent(1)
        } else if (event.key === backKey) {
            event.preventDefault()
            switchToAdjacent(-1)
        } else if (event.key === 'Escape') {
            // ARIA menubar 模式：Escape 应关闭菜单并把焦点归还到 menubar target（原实现只归还焦点不关闭）。
            // 本 handler 经 onKeyDown 链先于 PopoverDropdown 的 Escape 关闭逻辑执行，
            // preventDefault 后 PopoverDropdown 的 !event.defaultPrevented 判断会跳过其关闭，避免重复关闭
            event.preventDefault()
            ctx.closeMenu()
            const index = menuCtx.index
            ctx.setActiveIndex(index)
            window.clearTimeout(focusTimeoutRef.current)
            focusTimeoutRef.current = window.setTimeout(() => ctx.focusTarget(index), 0)
        }
    })

    return (
        <Menu.Dropdown
            {...others}
            data-menubar-dropdown={ctx.id}
            data-ui-stop-propagation
            onKeyDown={handleKeyDown}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        />
    )
}

MenubarDropdown.displayName = '@xiaoye-react/ui/MenubarDropdown'
