import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useClickOutside, useId } from '@xiaoye-react/hooks'
import {
    createVarsResolver,
    Factory,
    getDefaultZIndex,
    getFloatingPosition,
    useDirection,
    getRadius,
    getShadow,
    UIRadius,
    UIShadow,
    StylesApiProps,
    useProps,
    useStyles,
    type FloatingPosition
} from '../../core'
import { PopoverContextProvider } from './Popover.context'
import { PopoverContextMenu, type PopoverContextMenuProps } from './PopoverContextMenu'
import { PopoverDropdown, PopoverDropdownProps } from './PopoverDropdown/PopoverDropdown'
import { PopoverTarget, PopoverTargetProps } from './PopoverTarget/PopoverTarget'
import { usePopover } from './use-popover'
import type { PopoverMiddlewares, PopoverWidth } from './Popover.types'
import classes from './Popover.module.css'

export type PopoverStylesNames = 'dropdown' | 'arrow'

export type PopoverCssVariables = {
    dropdown: '--popover-radius' | '--popover-shadow'
}

export interface PopoverProps extends StylesApiProps<PopoverFactory> {
    /** Popover.Target and Popover.Dropdown components */
    children: React.ReactNode

    //** 下拉框相对于目标元素的位置 */
    position?: FloatingPosition

    /** 下拉元素的偏移量 */
    offset?: number

    /** Called when dropdown position changes */
    onPositionChange?: (position: FloatingPosition) => void

    /** Called when dropdown closes */
    onClose?: () => void

    /** Called when dropdown opens */
    onOpen?: () => void

    /** Initial opened state for uncontrolled component */
    defaultOpened?: boolean

    /** Controlled dropdown opened state */
    opened?: boolean

    /** Called with current state when dropdown opens or closes */
    onChange?: (opened: boolean) => void

    /** Dropdown width */
    width?: PopoverWidth

    /** Floating ui middlewares */
    middlewares?: PopoverMiddlewares

    /** 决定组件是否显示箭头 */
    withArrow?: boolean

    /** Arrow size in px */
    arrowSize?: number

    /** Arrow offset in px */
    arrowOffset?: number

    /** Arrow border-radius in px */
    arrowRadius?: number

    /** Arrow position */
    arrowPosition?: 'center' | 'side'

    /** 下拉层 z-index */
    zIndex?: string | number

    /** 主题圆角的键或任意有效的 CSS 值 */
    radius?: UIRadius

    /** Key of theme.shadows or any other valid CSS box-shadow value */
    shadow?: UIShadow

    /** If set, popover dropdown will not be rendered */
    disabled?: boolean

    /** If set, popover dropdown is rendered inline instead of a portal @default true */
    withinPortal?: boolean

    /** Props passed down to the underlying Portal when withinPortal is true */
    portalProps?: Record<string, any>

    /** If false, Popover.Target 不注入 aria-haspopup/aria-expanded 等 ARIA 属性 @default true */
    withRoles?: boolean

    /** Determines whether focus should be trapped within dropdown */
    trapFocus?: boolean

    /** Determines whether dropdown should be closed on outside clicks */
    closeOnClickOutside?: boolean

    /** Events that trigger outside clicks */
    clickOutsideEvents?: string[]

    /** Determines whether dropdown should be closed when Escape key is pressed */
    closeOnEscape?: boolean

    /** 创建可访问性连接的 ID 基础 */
    id?: string
}

export type PopoverFactory = Factory<{
    props: PopoverProps
    stylesNames: PopoverStylesNames
    vars: PopoverCssVariables
}>

const defaultProps = {
    position: 'bottom',
    offset: 8,
    middlewares: { flip: true, shift: true },
    arrowSize: 7,
    arrowOffset: 5,
    arrowRadius: 0,
    arrowPosition: 'side',
    closeOnClickOutside: true,
    closeOnEscape: true,
    trapFocus: false,
    zIndex: getDefaultZIndex('popover'),
    width: 'max-content'
} satisfies Partial<PopoverProps>

const varsResolver = createVarsResolver<PopoverFactory>((_, { radius, shadow }) => ({
    dropdown: {
        '--popover-radius': radius === undefined ? undefined : getRadius(radius),
        '--popover-shadow': getShadow(shadow)
    }
}))

export function Popover(_props: PopoverProps) {
    const props = useProps('Popover', defaultProps, _props)
    const {
        children,
        position,
        offset,
        onPositionChange,
        opened,
        onClose,
        onOpen,
        onChange,
        width,
        middlewares,
        withArrow,
        arrowSize,
        arrowOffset,
        arrowRadius,
        arrowPosition,
        unstyled,
        classNames,
        styles,
        closeOnClickOutside,
        closeOnEscape,
        clickOutsideEvents,
        trapFocus,
        zIndex,
        withinPortal = true,
        portalProps,
        withRoles = true,
        radius,
        shadow,
        id,
        defaultOpened,
        disabled,
        variant,
        vars,
        ...others
    } = props

    const getStyles = useStyles<PopoverFactory>({
        name: 'Popover',
        props,
        classes,
        classNames,
        styles,
        unstyled,
        rootSelector: 'dropdown',
        vars,
        varsResolver
    })

    const arrowRef = useRef<HTMLDivElement | null>(null)
    const [targetNode, setTargetNode] = useState<HTMLElement | null>(null)
    const [dropdownNode, setDropdownNode] = useState<HTMLElement | null>(null)
    const uid = useId(id)
    // targetId 动态管理：当 Popover.Target 的 child 自带 id 时（如 ColorInput 传入的 inputId），
    // 用 child 的 id 替代默认 uid，让外部 label.htmlFor 能正确关联到 target input。
    // 同时 PopoverDropdown 的 aria-labelledby 也会通过 getTargetId() 拿到正确的 id。
    const [targetId, setTargetId] = useState(uid)
    // uid 可能因 id prop 变化而变化，同步重置
    useEffect(() => {
        setTargetId(uid)
    }, [uid])

    const { dir } = useDirection()

    const popover = usePopover({
        middlewares,
        position: getFloatingPosition(dir, position!),
        offset: offset! + (withArrow ? arrowSize! / 2 : 0),
        arrowRef,
        arrowOffset,
        onPositionChange,
        opened,
        defaultOpened,
        onChange,
        onOpen,
        onClose,
        disabled
    })

    // useClickOutside 内部 effect 依赖 [callback, nodes]：
    // 内联 callback 与每次渲染新建的 nodes 数组会导致 document 监听被反复卸载/重订阅，
    // 因此用 useCallback/useMemo 稳定化这两个参数
    const handleOutsideClick = useCallback(() => {
        if (closeOnClickOutside) {
            popover.onClose()
        }
    }, [closeOnClickOutside, popover.onClose])

    const clickOutsideNodes = useMemo(() => [targetNode, dropdownNode], [targetNode, dropdownNode])

    useClickOutside(handleOutsideClick, clickOutsideEvents, clickOutsideNodes)

    const reference = useCallback(
        (node: HTMLElement | null) => {
            setTargetNode(node)
            popover.floating.refs.setReference(node)
        },
        [popover.floating.refs.setReference]
    )

    const floating = useCallback(
        (node: HTMLElement | null) => {
            setDropdownNode(node)
            popover.floating.refs.setFloating(node)
        },
        [popover.floating.refs.setFloating]
    )

    return (
        <PopoverContextProvider
            value={{
                reference,
                floating,
                x: popover.floating.x,
                y: popover.floating.y,
                arrowX: popover.floating.middlewareData?.arrow?.x,
                arrowY: popover.floating.middlewareData?.arrow?.y,
                opened: popover.opened,
                arrowRef,
                width,
                withArrow,
                arrowSize: arrowSize!,
                arrowOffset: arrowOffset!,
                arrowRadius: arrowRadius!,
                arrowPosition: arrowPosition!,
                placement: popover.floating.placement,
                trapFocus,
                zIndex,
                withinPortal,
                portalProps,
                withRoles,
                onClose: popover.onClose,
                onToggle: popover.onToggle,
                getTargetId: () => targetId,
                setTargetId,
                uid,
                getDropdownId: () => `${uid}-dropdown`,
                controlled: popover.controlled,
                closeOnEscape,
                disabled
            }}
        >
            <div {...others}>{children}</div>
        </PopoverContextProvider>
    )
}

Popover.Target = PopoverTarget
Popover.Dropdown = PopoverDropdown
Popover.ContextMenu = PopoverContextMenu
Popover.displayName = '@xiaoye-react/ui/Popover'

export namespace Popover {
    export type Props = PopoverProps
    export type Factory = PopoverFactory
    export type TargetProps = PopoverTargetProps
    export type DropdownProps = PopoverDropdownProps
    export type ContextMenuProps = PopoverContextMenuProps
}
