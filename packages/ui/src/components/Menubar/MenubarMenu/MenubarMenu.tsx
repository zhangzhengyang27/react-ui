import { useState } from 'react'
import { useId, useIsomorphicEffect } from '@react-ui/hooks'
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

MenubarMenu.displayName = '@react-ui/ui/MenubarMenu'
