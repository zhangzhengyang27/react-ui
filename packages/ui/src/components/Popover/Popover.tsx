import { useCallback, useRef, useState } from 'react'
import { useClickOutside, useId } from '@react-ui/hooks'
import {
    createVarsResolver,
    Factory,
    getDefaultZIndex,
    getFloatingPosition,
    getRadius,
    getShadow,
    MantineRadius,
    MantineShadow,
    StylesApiProps,
    useProps,
    useStyles,
    type FloatingPosition,
    type FloatingStrategy
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

    /** Dropdown position relative to the target element */
    position?: FloatingPosition

    /** Offset of the dropdown element */
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

    /** Determines whether component should have an arrow */
    withArrow?: boolean

    /** Arrow size in px */
    arrowSize?: number

    /** Arrow offset in px */
    arrowOffset?: number

    /** Arrow border-radius in px */
    arrowRadius?: number

    /** Arrow position */
    arrowPosition?: 'center' | 'side'

    /** Determines whether dropdown should be rendered within the Portal */
    withinPortal?: boolean

    /** Dropdown z-index */
    zIndex?: string | number

    /** Key of theme.radius or any valid CSS value */
    radius?: MantineRadius

    /** Key of theme.shadows or any other valid CSS box-shadow value */
    shadow?: MantineShadow

    /** If set, popover dropdown will not be rendered */
    disabled?: boolean

    /** Determines whether focus should be trapped within dropdown */
    trapFocus?: boolean

    /** Changes floating ui position strategy */
    floatingStrategy?: FloatingStrategy

    /** Determines whether dropdown should be closed on outside clicks */
    closeOnClickOutside?: boolean

    /** Events that trigger outside clicks */
    clickOutsideEvents?: string[]

    /** Determines whether dropdown should be closed when Escape key is pressed */
    closeOnEscape?: boolean

    /** Id base to create accessibility connections */
    id?: string

    /** Props passed down to the Transition component */
    transitionProps?: import('../Transition').TransitionOverride

    /** Determines whether focus should be returned to the target element when dropdown closes */
    returnFocus?: boolean
}

export type PopoverFactory = Factory<{
    props: PopoverProps
    stylesNames: PopoverStylesNames
    vars: PopoverCssVariables
}>

const defaultProps = {
    position: 'bottom',
    offset: 8,
    middlewares: { flip: true, shift: true, inline: false },
    arrowSize: 7,
    arrowOffset: 5,
    arrowRadius: 0,
    arrowPosition: 'side',
    closeOnClickOutside: true,
    withinPortal: true,
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
        transitionProps,
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
        withinPortal,
        closeOnEscape,
        clickOutsideEvents,
        trapFocus,
        zIndex,
        radius,
        shadow,
        id,
        defaultOpened,
        disabled,
        variant,
        vars,
        floatingStrategy,
        returnFocus,
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

    const arrowRef = useRef<HTMLDivElement>(null)
    const [targetNode, setTargetNode] = useState<HTMLElement | null>(null)
    const [dropdownNode, setDropdownNode] = useState<HTMLElement | null>(null)
    const uid = useId(id)

    const popover = usePopover({
        middlewares,
        width,
        position: getFloatingPosition('ltr', position!),
        offset: offset! + (withArrow ? arrowSize! / 2 : 0),
        arrowRef,
        arrowOffset,
        onPositionChange,
        opened,
        defaultOpened,
        onChange,
        onOpen,
        onClose,
        strategy: floatingStrategy,
        disabled
    })

    useClickOutside(
        () => {
            if (closeOnClickOutside) {
                popover.onClose()
            }
        },
        clickOutsideEvents,
        [targetNode, dropdownNode]
    )

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
                transitionProps,
                width,
                withArrow,
                arrowSize: arrowSize!,
                arrowOffset: arrowOffset!,
                arrowRadius: arrowRadius!,
                arrowPosition: arrowPosition!,
                placement: popover.floating.placement,
                trapFocus,
                withinPortal,
                zIndex,
                onClose: popover.onClose,
                onToggle: popover.onToggle,
                getTargetId: () => uid,
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
Popover.displayName = '@mantine/core/Popover'

export namespace Popover {
    export type Props = PopoverProps
    export type Factory = PopoverFactory
    export type TargetProps = PopoverTargetProps
    export type DropdownProps = PopoverDropdownProps
    export type ContextMenuProps = PopoverContextMenuProps
}
