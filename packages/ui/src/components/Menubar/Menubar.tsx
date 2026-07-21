import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { useId, useIsomorphicEffect, useMergedRef, useUncontrolled } from '@react-ui/hooks'
import {
    Box,
    BoxProps,
    ElementProps,
    factory,
    Factory,
    FloatingPosition,
    StylesApiProps,
    useProps,
    useStyles,
} from '../../core'
import { MenubarContextProvider, type MenubarContextValue } from './Menubar.context'
import { MenubarDropdown, type MenubarDropdownProps } from './MenubarDropdown/MenubarDropdown'
import { MenubarMenu, type MenubarMenuProps } from './MenubarMenu/MenubarMenu'
import { MenubarTarget, type MenubarTargetProps } from './MenubarTarget/MenubarTarget'
import classes from './Menubar.module.css'

export type MenubarStylesNames = 'root' | 'target'

export type MenubarFactory = Factory<{
    props: MenubarProps
    ref: HTMLDivElement
    stylesNames: MenubarStylesNames
    staticComponents: {
        Menu: typeof MenubarMenu
        Target: typeof MenubarTarget
        Dropdown: typeof MenubarDropdown
    }
}>

export interface MenubarProps
    extends BoxProps, StylesApiProps<MenubarFactory>, ElementProps<'div'> {
    children?: React.ReactNode
    openIndex?: number | null
    defaultOpenIndex?: number | null
    onOpenChange?: (index: number | null) => void
    trigger?: 'click' | 'hover'
    loop?: boolean
    position?: FloatingPosition
}

const defaultProps = {
    trigger: 'click',
    loop: true,
    position: 'bottom-start',
} satisfies Partial<MenubarProps>

export const Menubar = factory<MenubarFactory>((_props, ref) => {
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars: _vars,
        children,
        openIndex,
        defaultOpenIndex,
        onOpenChange,
        trigger,
        loop,
        position,
        attributes,
        mod,
        ...others
    } = useProps('Menubar', defaultProps, _props)

    const getStyles = useStyles<MenubarFactory>({
        name: 'Menubar',
        classes,
        props: _props,
        className,
        style,
        classNames,
        styles,
        unstyled,
        attributes,
    })

    const rootRef = useRef<HTMLDivElement>(null)
    const menubarId = useId()

    const [_openIndex, setOpenIndex] = useUncontrolled<number | null>({
        value: openIndex,
        defaultValue: defaultOpenIndex,
        finalValue: null,
        onChange: onOpenChange,
    })

    const [activeIndex, setActiveIndex] = useState(0)
    const openSourceRef = useRef<'click' | 'hover' | null>(null)

    const openMenu = useCallback(
        (index: number, source: 'click' | 'hover') => {
            openSourceRef.current = source
            setOpenIndex(index)
        },
        [setOpenIndex]
    )

    const closeMenu = useCallback(() => {
        openSourceRef.current = null
        setOpenIndex(null)
    }, [setOpenIndex])

    const closeTimeoutRef = useRef(-1)
    // focusMenuItem 的延迟 focus 定时器 id，卸载时需清理，避免卸载后仍触发 focus
    const focusMenuItemTimeoutRef = useRef(-1)

    const cancelClose = useCallback(() => {
        window.clearTimeout(closeTimeoutRef.current)
    }, [])

    const scheduleClose = useCallback(() => {
        window.clearTimeout(closeTimeoutRef.current)
        closeTimeoutRef.current = window.setTimeout(closeMenu, 120)
    }, [closeMenu])

    useIsomorphicEffect(
        () => () => {
            window.clearTimeout(closeTimeoutRef.current)
            window.clearTimeout(focusMenuItemTimeoutRef.current)
        },
        []
    )

    const getOpenSource = useCallback(() => openSourceRef.current, [])

    const previousOpenIndexRef = useRef<number | null>(_openIndex)
    const getPreviousOpenIndex = useCallback(() => previousOpenIndexRef.current, [])

    useIsomorphicEffect(() => {
        previousOpenIndexRef.current = _openIndex
    })

    // target 不再走注册表：节点从 DOM 查询（MenubarTarget 渲染 data-menubar-target 与
    // data-menubar-id），index 按 DOM 顺序解析。原注册机制存在首次挂载死锁——
    // MenubarMenu 的 index 初始 -1 且仅能由 getMenuIndex 查注册表得到，而 MenubarTarget
    // 在 index === -1 时跳过注册，二者互相等待导致菜单永远无法打开（对齐 Mantine 上游方案）
    const getTargets = useCallback(
        () =>
            Array.from(
                rootRef.current?.querySelectorAll<HTMLButtonElement>('[data-menubar-target]') ?? []
            ),
        []
    )

    const getMenuIndex = useCallback(
        (id: string) => getTargets().findIndex(target => target.getAttribute('data-menubar-id') === id),
        [getTargets]
    )

    const getEnabledIndexes = useCallback(
        () =>
            getTargets().reduce<number[]>((acc, node, index) => {
                if (!node.disabled && !node.hasAttribute('data-disabled')) {
                    acc.push(index)
                }
                return acc
            }, []),
        [getTargets]
    )

    const focusTarget = useCallback(
        (index: number) => {
            getTargets()[index]?.focus()
        },
        [getTargets]
    )

    const focusMenuItem = useCallback(
        (index: number, itemPosition: 'first' | 'last') => {
            // id 存入 ref：重调时取消上一个待执行的 focus，卸载时统一清理
            window.clearTimeout(focusMenuItemTimeoutRef.current)
            focusMenuItemTimeoutRef.current = window.setTimeout(() => {
                const target = getTargets()[index]
                const controls = target?.getAttribute('aria-controls')
                const dropdown = controls
                    ? document.getElementById(controls)
                    : document.querySelector<HTMLElement>(`[data-menubar-dropdown="${menubarId}"]`)
                const items = dropdown?.querySelectorAll<HTMLElement>(
                    '[data-menu-item]:not([data-disabled])'
                )

                if (items && items.length > 0) {
                    const item = itemPosition === 'first' ? items[0] : items[items.length - 1]
                    item?.focus()
                }
            }, 40)
        },
        [getTargets]
    )

    const getAdjacentIndex = useCallback(
        (current: number, direction: 1 | -1) => {
            const enabled = getEnabledIndexes()

            if (enabled.length === 0) {
                return current
            }

            const currentPosition = enabled.indexOf(current)
            let nextPosition = currentPosition === -1 ? 0 : currentPosition + direction

            if (loop) {
                nextPosition = (nextPosition + enabled.length) % enabled.length
            } else {
                nextPosition = Math.max(0, Math.min(enabled.length - 1, nextPosition))
            }

            return enabled[nextPosition] ?? current
        },
        [getEnabledIndexes, loop]
    )

    useIsomorphicEffect(() => {
        const enabled = getEnabledIndexes()
        if (enabled.length === 0) {
            return
        }

        if (_openIndex !== null && enabled.includes(_openIndex)) {
            if (activeIndex !== _openIndex) {
                setActiveIndex(_openIndex)
            }
            return
        }

        if (!enabled.includes(activeIndex)) {
            setActiveIndex(enabled[0])
        }
    })

    const contextValue: MenubarContextValue = {
        getStyles,
        id: menubarId,
        openIndex: _openIndex,
        setOpenIndex,
        openMenu,
        closeMenu,
        scheduleClose,
        cancelClose,
        getOpenSource,
        getPreviousOpenIndex,
        activeIndex,
        setActiveIndex,
        trigger: trigger!,
        loop: loop!,
        position: position!,
        unstyled,
        getMenuIndex,
        getTargets,
        getEnabledIndexes,
        getAdjacentIndex,
        focusTarget,
        focusMenuItem,
    }

    const mergedRootRef = useMergedRef(ref, rootRef)

    return (
        <MenubarContextProvider value={contextValue}>
            <Box
                ref={mergedRootRef}
                role="menubar"
                aria-orientation="horizontal"
                mod={mod}
                {...getStyles('root')}
                {...others}
                data-menubar
            >
                {children}
            </Box>
        </MenubarContextProvider>
    )
})

Menubar.classes = classes
Menubar.displayName = '@react-ui/ui/Menubar'
Menubar.Menu = MenubarMenu
Menubar.Target = MenubarTarget
Menubar.Dropdown = MenubarDropdown

export namespace Menubar {
    export type Props = MenubarProps
    export type StylesNames = MenubarStylesNames
    export type Factory = MenubarFactory

    export namespace Menu {
        export type Props = MenubarMenuProps
    }

    export namespace Target {
        export type Props = MenubarTargetProps
    }

    export namespace Dropdown {
        export type Props = MenubarDropdownProps
    }
}
