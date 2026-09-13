import { useState } from 'react'
import { useId, useIsomorphicEffect } from '@xiaoye-react/hooks'
import { Menu, MenuProps } from '../../Menu'
import { MenubarMenuContextProvider, useMenubarContext } from '../Menubar.context'

export interface MenubarMenuProps extends Omit<
    MenuProps,
    'opened' | 'defaultOpened' | 'onChange' | 'onOpen' | 'onClose' | 'trigger'
> {
    children?: React.ReactNode
}

export function MenubarMenu({ children, ...others }: MenubarMenuProps) {
    const ctx = useMenubarContext()
    const id = useId()
    const [index, setIndex] = useState(-1)

    useIsomorphicEffect(() => {
        // 解析过（index !== -1）就不再每次渲染全量 querySelectorAll：
        // N 个菜单的 menubar 每次开关菜单会触发 O(N²) 次 DOM 查询；
        // 仅初始未解析时查询一次
        if (index !== -1) {
            return
        }
        const next = ctx.getMenuIndex(id)
        setIndex((current) => (current === next ? current : next))
    })

    const opened = ctx.openIndex !== null && index !== -1 && ctx.openIndex === index

    const handleChange = (value: boolean) => {
        if (value) {
            ctx.openMenu(index, 'click')
            ctx.setActiveIndex(index)
        } else {
            ctx.closeMenu()
        }
    }

    return (
        <MenubarMenuContextProvider value={{ id, index, opened }}>
            <Menu
                position={ctx.position}
                loop={ctx.loop}
                unstyled={ctx.unstyled}
                menuItemTabIndex={-1}
                trapFocus={false}
                {...others}
                opened={opened}
                onChange={handleChange}
                trigger="click"
            >
                {children}
            </Menu>
        </MenubarMenuContextProvider>
    )
}

MenubarMenu.displayName = '@xiaoye-react/ui/MenubarMenu'
