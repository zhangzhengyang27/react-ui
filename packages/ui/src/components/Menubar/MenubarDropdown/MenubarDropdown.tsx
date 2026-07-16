import { Menu, MenuDropdownProps } from '../../Menu'
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

        const forwardKey = 'ArrowRight'
        const backKey = 'ArrowLeft'

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
            const index = menuCtx.index
            ctx.setActiveIndex(index)
            window.setTimeout(() => ctx.focusTarget(index), 0)
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

MenubarDropdown.displayName = '@react-ui/ui/MenubarDropdown'
