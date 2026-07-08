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
import classes from './Menu.module.css'

export type MenuStylesNames = 'item' | 'itemLabel' | 'itemSection' | 'label' | 'divider' | PopoverStylesNames

export type MenuFactory = Factory<{
    props: MenuProps
    stylesNames: MenuStylesNames
    staticComponents: {
        Item: typeof MenuItem
        Label: typeof MenuLabel
        Dropdown: typeof MenuDropdown
        Target: typeof MenuTarget
        Divider: typeof MenuDivider
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

    /** Called when menu opened state changes */
    onChange?: (opened: boolean) => void

    /** Called when Menu is opened */
    onOpen?: () => void

    /** Called when Menu is closed */
    onClose?: () => void

    /** If set, the Menu is closed when one of the items is clicked */
    closeOnItemClick?: boolean

    /** If set, arrow key presses wrap around from last item to first and vice versa */
    loop?: boolean

    /** If set, the dropdown is closed when the Escape key is pressed */
    closeOnEscape?: boolean

    /** Event trigger to open menu */
    trigger?: 'click' | 'hover' | 'click-hover'

    /** Open delay in ms, applicable only to trigger="hover" variant */
    openDelay?: number

    /** Close delay in ms, applicable only to trigger="hover" variant */
    closeDelay?: number

    /** If set, the dropdown is closed on outside clicks */
    closeOnClickOutside?: boolean

    /** Events that trigger outside click detection */
    clickOutsideEvents?: string[]

    /** Id base to create accessibility connections */
    id?: string

    /** Set the tabindex on all menu items */
    menuItemTabIndex?: -1 | 0

    /** Determines whether focus should be automatically returned to control when dropdown closes */
    returnFocus?: boolean

    /** Determines whether dropdown should be rendered within the Portal */
    withinPortal?: boolean

    /** Dropdown position relative to the target element */
    position?: import('../../core').FloatingPosition

    /** Offset of the dropdown element */
    offset?: number

    /** Determines whether component should have an arrow */
    withArrow?: boolean

    /** Dropdown width */
    width?: import('../Popover').PopoverWidth

    /** Key of theme.radius or any valid CSS value */
    radius?: import('../../core').MantineRadius

    /** Key of theme.shadows or any other valid CSS box-shadow value */
    shadow?: import('../../core').MantineShadow

    /** Dropdown z-index */
    zIndex?: string | number

    /** Props passed down to the Transition component */
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

Menu.displayName = '@mantine/core/Menu'
Menu.classes = classes
Menu.Item = MenuItem
Menu.Label = MenuLabel
Menu.Dropdown = MenuDropdown
Menu.Target = MenuTarget
Menu.Divider = MenuDivider

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
}
