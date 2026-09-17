import { useRef } from 'react'
import { useMergedRef } from '@xiaoye-react/hooks'
import { BoxProps, CompoundStylesApiProps, ElementProps, factory, Factory, useProps } from '../../core'
import { Popover } from '../Popover'
import { useMenuContext } from './Menu.context'
import classes from './Menu.module.css'

export type MenuDropdownStylesNames = 'dropdown'

export interface MenuDropdownProps extends BoxProps, CompoundStylesApiProps<MenuDropdownFactory>, ElementProps<'div'> {}

export type MenuDropdownFactory = Factory<{
    props: MenuDropdownProps
    ref: HTMLDivElement
    stylesNames: MenuDropdownStylesNames
    compound: true
}>

export const MenuDropdown = factory<MenuDropdownFactory>((props, ref) => {
    const { classNames, className, style, styles, vars, onMouseEnter, onMouseLeave, onKeyDown, children, ...others } =
        useProps('MenuDropdown', null, props)

    const wrapperRef = useRef<HTMLDivElement>(null)
    const ctx = useMenuContext()

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        onKeyDown?.(event)

        if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
            event.preventDefault()
            // 与 MenuItem 键盘导航选择器同口径：data-disabled 同时覆盖原生禁用与仅标记禁用的项；
            // ARIA APG menu 模式：ArrowDown 聚焦第一项、ArrowUp 聚焦最后一项（与 MenubarTarget 口径一致）
            const items = wrapperRef.current?.querySelectorAll<HTMLButtonElement>(
                '[data-menu-item]:not([data-disabled])'
            )
            const nextItem = event.key === 'ArrowDown' ? items?.[0] : items?.[items.length - 1]
            nextItem?.focus()
        }
    }

    const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
        if (ctx.trigger === 'hover' || ctx.trigger === 'click-hover') {
            ctx.openDropdown()
        }
        onMouseEnter?.(event)
    }

    const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
        if (ctx.trigger === 'hover' || ctx.trigger === 'click-hover') {
            ctx.closeDropdown()
        }
        onMouseLeave?.(event)
    }

    return (
        <Popover.Dropdown
            {...others}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
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
            onKeyDown={handleKeyDown}
        >
            {children}
        </Popover.Dropdown>
    )
})

MenuDropdown.classes = classes
MenuDropdown.displayName = '@xiaoye-react/ui/MenuDropdown'
