import { useEffect, useRef, useState } from 'react'
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
import { HoverCardContextProvider } from './HoverCard.context'
import { HoverCardDropdown, HoverCardDropdownProps } from './HoverCardDropdown/HoverCardDropdown'
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

    /** Open delay in ms */
    openDelay?: number

    /** Close delay in ms */
    closeDelay?: number

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

    /** Dropdown width */
    width?: React.CSSProperties['width']

    /** 主题圆角的键或任意有效的 CSS 值 */
    radius?: UIRadius

    /** Key of theme.shadows or any other valid CSS box-shadow value */
    shadow?: UIShadow

    /** If set, hovercard dropdown will not be rendered */
    disabled?: boolean

    /** Floating ui middlewares */
    middlewares?: HoverCardMiddlewares

    /** 传递给 Transition 组件的属性 */
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
        defaultOpened,
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
        zIndex,
        width,
        radius,
        shadow,
        disabled,
        variant,
        vars,
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

    const { dir } = useDirection()

    const hovercard = useHoverCard({
        position: getFloatingPosition(dir, position!),
        offset: offset! + (withArrow ? arrowSize! / 2 : 0),
        openDelay,
        closeDelay,
        onPositionChange,
        opened,
        defaultOpened,
        onOpen,
        onClose,
        arrowRef,
        arrowOffset,
        middlewares
    })

    // targetId 动态管理：当 HoverCard.Target 的 child 自带 id 时（如外部 label 关联的 input），
    // 用 child 的 id 替代默认 uid，让外部 label.htmlFor 能正确关联到 target input。
    // 同时 HoverCardDropdown 的 aria-labelledby 也会通过 getTargetId() 拿到正确的 id。
    const [targetId, setTargetId] = useState(hovercard.uid)
    // uid 变化时同步重置 targetId。挂载时必须跳过且不能无条件覆盖：
    // HoverCard.Target 的 child 自带 id 会在子组件 effect 中同步进 context，
    // 父组件的挂载重置晚于子 effect 执行，会把自定义 id 抹掉；
    // 仅当 targetId 仍等于旧 uid（未被 child id 接管）时才跟随新 uid
    const prevUidRef = useRef(hovercard.uid)
    useEffect(() => {
        setTargetId(current => (current === prevUidRef.current ? hovercard.uid : current))
        prevUidRef.current = hovercard.uid
    }, [hovercard.uid])

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
                zIndex,
                onClose,
                getTargetId: () => targetId,
                setTargetId,
                uid: hovercard.uid,
                getDropdownId: () => `${hovercard.uid}-dropdown`,
                controlled: typeof opened === 'boolean',
                disabled,
                transitionProps,
                getStyles
            }}
        >
            <div {...others}>{children}</div>
        </HoverCardContextProvider>
    )
}

HoverCard.Target = HoverCardTarget
HoverCard.Dropdown = HoverCardDropdown
HoverCard.displayName = '@xiaoye-react/ui/HoverCard'

export namespace HoverCard {
    export type Props = HoverCardProps
    export type Factory = HoverCardFactory
    export type TargetProps = HoverCardTargetProps
    export type DropdownProps = HoverCardDropdownProps
}
