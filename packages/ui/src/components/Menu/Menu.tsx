import { useRef, useState } from 'react'
import { useUncontrolled } from '@react-ui/hooks'
import { factory, Factory, StylesApiProps, useProps, useResolvedStylesApi, useStyles } from '../../core'
import { Popover, PopoverStylesNames } from '../Popover'
import { MenuContextProvider, type MenuContextValue } from './Menu.context'
import { MenuDivider, type MenuDividerProps } from './MenuDivider'
import { MenuDropdown, type MenuDropdownProps } from './MenuDropdown'
import { MenuItem, type MenuItemProps } from './MenuItem'
import { MenuLabel, type MenuLabelProps } from './MenuLabel'
import { MenuTarget, type MenuTargetProps } from './MenuTarget'
import { MenuSub, type MenuSubProps } from './MenuSub'
import { MenuCheckboxGroup, type MenuCheckboxGroupProps } from './MenuCheckboxGroup'
import { MenuCheckboxItem, type MenuCheckboxItemProps } from './MenuCheckboxItem'
import { MenuRadioGroup, type MenuRadioGroupProps } from './MenuRadioGroup'
import { MenuRadioItem, type MenuRadioItemProps } from './MenuRadioItem'
import { MenuSearch, type MenuSearchProps } from './MenuSearch'
import { MenuContextMenu, type MenuContextMenuProps } from './MenuContextMenu'
import classes from './Menu.module.css'

export type MenuStylesNames = 'item' | 'itemLabel' | 'itemSection' | 'label' | 'divider' | 'search' | PopoverStylesNames

export type MenuFactory = Factory<{
    props: MenuProps
    stylesNames: MenuStylesNames
    static_components: {
        Item: typeof MenuItem
        Label: typeof MenuLabel
        Dropdown: typeof MenuDropdown
        Target: typeof MenuTarget
        Divider: typeof MenuDivider
        Sub: typeof MenuSub
        CheckboxGroup: typeof MenuCheckboxGroup
        CheckboxItem: typeof MenuCheckboxItem
        RadioGroup: typeof MenuRadioGroup
        RadioItem: typeof MenuRadioItem
        Search: typeof MenuSearch
        ContextMenu: typeof MenuContextMenu
    }
}>

export interface MenuProps extends StylesApiProps<MenuFactory> {
    /** Menu children */
    children?: React.ReactNode

    /** Controlled menu opened state */
    opened?: boolean

    /** Uncontrolled menu initial opened state */
    defaultOpened?: boolean

    /** If set, focus is trapped within the menu dropdown when it is opened */
    trapFocus?: boolean

    /** 菜单打开状态变化时调用 */
    onChange?: (opened: boolean) => void

    /** 菜单打开时调用 */
    onOpen?: () => void

    /** 菜单关闭时调用 */
    onClose?: () => void

    /** If set, the Menu is closed when one of the items is clicked */
    closeOnItemClick?: boolean

    /** If set, arrow key presses wrap around from last item to first and vice versa */
    loop?: boolean

    /** If set, the dropdown is closed when the Escape key is pressed */
    closeOnEscape?: boolean

    /** 打开菜单的事件触发器 */
    trigger?: 'click' | 'hover' | 'click-hover'

    /** Open delay in ms, applicable only to trigger="hover" variant */
    openDelay?: number

    /** Close delay in ms, applicable only to trigger="hover" variant */
    closeDelay?: number

    /** If set, the dropdown is closed on outside clicks */
    closeOnClickOutside?: boolean

    /** 触发外部点击检测的事件 */
    clickOutsideEvents?: string[]

    /** 创建可访问性连接的 ID 基础 */
    id?: string

    /** 设置所有菜单项的 tabindex */
    menuItemTabIndex?: -1 | 0

    /** 决定下拉框关闭时是否自动将焦点返回到控件 */
    returnFocus?: boolean

    /** 决定下拉框是否在 Portal 中渲染 */
    withinPortal?: boolean

    //** 下拉框相对于目标元素的位置 */
    position?: import('../../core').FloatingPosition

    /** 下拉元素的偏移量 */
    offset?: number

    /** 决定组件是否显示箭头 */
    withArrow?: boolean

    /** Dropdown width */
    width?: import('../Popover').PopoverWidth

    /** 主题圆角的键或任意有效的 CSS 值 */
    radius?: import('../../core').UIRadius

    /** Key of theme.shadows or any other valid CSS box-shadow value */
    shadow?: import('../../core').UIShadow

    /** 下拉层 z-index */
    zIndex?: string | number

    /** 传递给 Transition 组件的属性 */
    transitionProps?: import('../Transition').TransitionOverride
}

const defaultProps = {
    trapFocus: true,
    closeOnItemClick: true,
    clickOutsideEvents: ['mousedown', 'touchstart', 'keydown'],
    loop: true,
    trigger: 'click',
    openDelay: 0,
    closeDelay: 100,
    menuItemTabIndex: -1,
    closeOnEscape: true,
    closeOnClickOutside: true
} satisfies Partial<MenuProps>

function useDelayedHover({
    open,
    close,
    openDelay,
    closeDelay
}: {
    open: () => void
    close: () => void
    openDelay: number
    closeDelay: number
}) {
    const openTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const clearTimeouts = () => {
        if (openTimeoutRef.current) {
            clearTimeout(openTimeoutRef.current)
            openTimeoutRef.current = null
        }
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current)
            closeTimeoutRef.current = null
        }
    }

    const openDropdown = () => {
        clearTimeouts()
        openTimeoutRef.current = setTimeout(() => {
            open()
        }, openDelay)
    }

    const closeDropdown = () => {
        clearTimeouts()
        closeTimeoutRef.current = setTimeout(() => {
            close()
        }, closeDelay)
    }

    return { openDropdown, closeDropdown, clearTimeouts }
}

export const Menu = factory<MenuFactory>((_props, _ref) => {
    const props = useProps('Menu', defaultProps, _props)
    const {
        children,
        onOpen,
        onClose,
        opened,
        defaultOpened,
        trapFocus,
        onChange,
        closeOnItemClick,
        loop,
        closeOnEscape,
        trigger,
        openDelay,
        closeDelay,
        classNames,
        styles,
        unstyled,
        variant,
        vars,
        menuItemTabIndex,
        returnFocus,
        ...others
    } = props

    const getStyles = useStyles<MenuFactory>({
        name: 'Menu',
        classes,
        props,
        classNames,
        styles,
        unstyled,
        vars
    })

    const [_opened, setOpened] = useUncontrolled({
        value: opened,
        defaultValue: defaultOpened,
        finalValue: false,
        onChange
    })
    const [openedViaClick, setOpenedViaClick] = useState(false)

    const close = () => {
        setOpened(false)
        setOpenedViaClick(false)
        _opened && onClose?.()
    }

    const open = () => {
        setOpened(true)
        !_opened && onOpen?.()
    }

    const toggleDropdown = () => {
        _opened ? close() : open()
    }

    const { openDropdown, closeDropdown } = useDelayedHover({
        open,
        close,
        closeDelay: closeDelay!,
        openDelay: openDelay!
    })

    const getItemIndex = (node: HTMLButtonElement) => {
        const dropdown = node.closest('[data-menu-dropdown]')
        if (!dropdown) {
            return null
        }
        const items = Array.from(dropdown.querySelectorAll<HTMLButtonElement>('[data-menu-item]'))
        return items.indexOf(node)
    }

    const { resolvedClassNames, resolvedStyles } = useResolvedStylesApi<MenuFactory>({
        classNames,
        styles,
        props
    })

    return (
        <MenuContextProvider
            value={{
                getStyles,
                opened: _opened,
                toggleDropdown,
                getItemIndex,
                openedViaClick,
                setOpenedViaClick,
                closeOnItemClick,
                closeDropdown: trigger === 'click' ? close : closeDropdown,
                openDropdown: trigger === 'click' ? open : openDropdown,
                closeDropdownImmediately: close,
                loop,
                trigger,
                unstyled,
                menuItemTabIndex
            }}
        >
            <Popover
                returnFocus={returnFocus}
                {...others}
                opened={_opened}
                onChange={toggleDropdown}
                defaultOpened={defaultOpened}
                trapFocus={trapFocus}
                closeOnEscape={closeOnEscape}
                classNames={resolvedClassNames}
                styles={resolvedStyles}
                unstyled={unstyled}
                variant={variant}
            >
                {children}
            </Popover>
        </MenuContextProvider>
    )
})

Menu.displayName = '@react-ui/ui/Menu'
Menu.classes = classes
Menu.Item = MenuItem
Menu.Label = MenuLabel
Menu.Dropdown = MenuDropdown
Menu.Target = MenuTarget
Menu.Divider = MenuDivider
Menu.Sub = MenuSub
Menu.CheckboxGroup = MenuCheckboxGroup
Menu.CheckboxItem = MenuCheckboxItem
Menu.RadioGroup = MenuRadioGroup
Menu.RadioItem = MenuRadioItem
Menu.Search = MenuSearch
Menu.ContextMenu = MenuContextMenu

export namespace Menu {
    export type Props = MenuProps
    export type StylesNames = MenuStylesNames
    export type Factory = MenuFactory
    export type ContextValue = MenuContextValue

    export namespace Item {
        export type Props = MenuItemProps
    }

    export namespace Label {
        export type Props = MenuLabelProps
    }

    export namespace Divider {
        export type Props = MenuDividerProps
    }

    export namespace Dropdown {
        export type Props = MenuDropdownProps
    }

    export namespace Target {
        export type Props = MenuTargetProps
    }

    export namespace Sub {
        export type Props = MenuSubProps
    }

    export namespace CheckboxGroup {
        export type Props = MenuCheckboxGroupProps
    }

    export namespace CheckboxItem {
        export type Props = MenuCheckboxItemProps
    }

    export namespace RadioGroup {
        export type Props = MenuRadioGroupProps
    }

    export namespace RadioItem {
        export type Props = MenuRadioItemProps
    }

    export namespace Search {
        export type Props = MenuSearchProps
    }

    export namespace ContextMenu {
        export type Props = MenuContextMenuProps
    }
}
