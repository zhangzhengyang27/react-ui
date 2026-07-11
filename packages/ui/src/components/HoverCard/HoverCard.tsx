import { useRef } from 'react'
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
import { HoverCardContextProvider } from './HoverCard.context'
import { HoverCardDropdown, HoverCardDropdownProps } from './HoverCardDropdown/HoverCardDropdown'
import { HoverCardGroup, type HoverCardGroupProps } from './HoverCardGroup'
import { HoverCardTarget, HoverCardTargetProps } from './HoverCardTarget/HoverCardTarget'
import { HoverCardMiddlewares, useHoverCard } from './use-hover-card'
import classes from './HoverCard.module.css'

export type HoverCardStylesNames = 'dropdown' | 'arrow'

export type HoverCardCssVariables = {
    dropdown: '--hovercard-radius' | '--hovercard-shadow'
}

export interface HoverCardProps extends StylesApiProps<HoverCardFactory> {
    /** HoverCard.Target and HoverCard.Dropdown components */
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

    /** Open delay in ms */
    openDelay?: number

    /** Close delay in ms */
    closeDelay?: number

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

    /** Dropdown width */
    width?: React.CSSProperties['width']

    /** Key of theme.radius or any valid CSS value */
    radius?: MantineRadius

    /** Key of theme.shadows or any other valid CSS box-shadow value */
    shadow?: MantineShadow

    /** If set, hovercard dropdown will not be rendered */
    disabled?: boolean

    /** Changes floating ui position strategy */
    floatingStrategy?: FloatingStrategy

    /** Floating ui middlewares */
    middlewares?: HoverCardMiddlewares

    /** Props passed down to the Transition component */
    transitionProps?: import('../Transition').TransitionOverride
}

export type HoverCardFactory = Factory<{
    props: HoverCardProps
    stylesNames: HoverCardStylesNames
    vars: HoverCardCssVariables
}>

const defaultProps = {
    position: 'bottom',
    offset: 8,
    openDelay: 0,
    closeDelay: 150,
    arrowSize: 7,
    arrowOffset: 5,
    arrowRadius: 0,
    arrowPosition: 'side',
    withinPortal: true,
    zIndex: getDefaultZIndex('popover'),
    width: 'max-content',
    middlewares: { flip: true, shift: true }
} satisfies Partial<HoverCardProps>

const varsResolver = createVarsResolver<HoverCardFactory>((_, { radius, shadow }) => ({
    dropdown: {
        '--hovercard-radius': radius === undefined ? undefined : getRadius(radius),
        '--hovercard-shadow': getShadow(shadow)
    }
}))

export function HoverCard(_props: HoverCardProps) {
    const props = useProps('HoverCard', defaultProps, _props)
    const {
        children,
        position,
        offset,
        onPositionChange,
        opened,
        transitionProps,
        onClose,
        onOpen,
        openDelay,
        closeDelay,
        withArrow,
        arrowSize,
        arrowOffset,
        arrowRadius,
        arrowPosition,
        unstyled,
        classNames,
        styles,
        withinPortal,
        zIndex,
        width,
        radius,
        shadow,
        disabled,
        variant,
        vars,
        floatingStrategy,
        middlewares,
        ...others
    } = props

    const getStyles = useStyles<HoverCardFactory>({
        name: 'HoverCard',
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

    const hovercard = useHoverCard({
        position: getFloatingPosition('ltr', position!),
        offset: offset! + (withArrow ? arrowSize! / 2 : 0),
        openDelay,
        closeDelay,
        onPositionChange,
        opened,
        onOpen,
        onClose,
        arrowRef,
        arrowOffset,
        strategy: floatingStrategy,
        middlewares
    })

    return (
        <HoverCardContextProvider
            value={{
                reference: hovercard.reference,
                floating: hovercard.floating,
                getReferenceProps: hovercard.getReferenceProps,
                getFloatingProps: hovercard.getFloatingProps,
                x: hovercard.x,
                y: hovercard.y,
                arrowX: hovercard.arrowX,
                arrowY: hovercard.arrowY,
                opened: hovercard.opened,
                arrowRef,
                width,
                withArrow,
                arrowSize: arrowSize!,
                arrowOffset: arrowOffset!,
                arrowRadius: arrowRadius!,
                arrowPosition: arrowPosition!,
                placement: hovercard.placement,
                withinPortal,
                zIndex,
                onClose,
                getTargetId: () => hovercard.uid,
                getDropdownId: () => `${hovercard.uid}-dropdown`,
                controlled: typeof opened === 'boolean',
                disabled,
                transitionProps
            }}
        >
            <div {...others}>{children}</div>
        </HoverCardContextProvider>
    )
}

HoverCard.Target = HoverCardTarget
HoverCard.Dropdown = HoverCardDropdown
HoverCard.Group = HoverCardGroup
HoverCard.displayName = '@mantine/core/HoverCard'

export namespace HoverCard {
    export type Props = HoverCardProps
    export type Factory = HoverCardFactory
    export type TargetProps = HoverCardTargetProps
    export type DropdownProps = HoverCardDropdownProps
    export type GroupProps = HoverCardGroupProps
}
