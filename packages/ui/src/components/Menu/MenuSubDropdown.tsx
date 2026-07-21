import { useRef } from 'react'
import { useMergedRef } from '@react-ui/hooks'
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
        onKeyDown,
        children,
        ...others
    } = useProps('MenuSubDropdown', null, props)

    const wrapperRef = useRef<HTMLDivElement>(null)
    const ctx = useMenuContext()
    const subCtx = useSubMenuContext()

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
        >
            {children}
        </Popover.Dropdown>
    )
})

MenuSubDropdown.classes = classes
MenuSubDropdown.displayName = '@react-ui/ui/MenuSubDropdown'
