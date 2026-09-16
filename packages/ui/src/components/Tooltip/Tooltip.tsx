import { cloneElement, useEffect, useRef } from 'react'
import { useMergedRef } from '@xiaoye-react/hooks'
import {
    Box,
    createVarsResolver,
    factory,
    FloatingArrow,
    getDefaultZIndex,
    getFloatingPosition,
    useDirection,
    getRadius,
    getSingleElementChild,
    useProps,
    useStyles,
    type BoxProps,
    type ElementProps,
    type Factory,
    type FloatingPosition,
    type FloatingStrategy,
    type UIColor,
    type UIRadius,
    type StylesApiProps
} from '../../core'
import { Portal } from '../Portal'
import { Transition } from '../Transition'
import { useTooltip, type TooltipMiddlewares } from './use-tooltip'
import { useTooltipGroupContext } from './Tooltip.context'
import { TooltipFloating, type TooltipFloatingProps, type TooltipFloatingFactory } from './TooltipFloating'
import { TooltipGroup, type TooltipGroupProps } from './TooltipGroup'
import classes from './Tooltip.module.css'

export type TooltipStylesNames = 'tooltip' | 'arrow'

export type TooltipCssVariables = {
    tooltip: '--tooltip-radius' | '--tooltip-bg' | '--tooltip-color'
}

export interface TooltipProps extends BoxProps, StylesApiProps<TooltipFactory>, ElementProps<'div'> {
    /** Target element */
    children: React.ReactNode

    /** Tooltip content */
    label: React.ReactNode

    /** Tooltip position relative to target element */
    position?: FloatingPosition

    /** Open delay in ms */
    openDelay?: number

    /** Close delay in ms */
    closeDelay?: number

    /** Controlled opened state */
    opened?: boolean

    /** Uncontrolled tooltip initial opened state */
    defaultOpened?: boolean

    /** Space between target element and tooltip in px */
    offset?: number

    /** If set, the tooltip has an arrow */
    withArrow?: boolean

    /** Arrow size in px */
    arrowSize?: number

    /** Arrow offset in px */
    arrowOffset?: number

    /** Arrow border-radius in px */
    arrowRadius?: number

    /** Arrow position relative to the tooltip */
    arrowPosition?: 'center' | 'side'

    /** 主题颜色的键或任意有效的 CSS 颜色 */
    color?: UIColor

    /** 主题圆角的键或任意有效的 CSS 值 */
    radius?: UIRadius

    /** Determines whether content should be wrapped */
    multiline?: boolean

    /** Tooltip z-index */
    zIndex?: string | number

    /** If set, tooltip element will not be rendered */
    disabled?: boolean

    /** Determines which events will be used to show tooltip */
    events?: { hover: boolean; focus: boolean; touch: boolean }

    /** Floating ui position strategy */
    floatingStrategy?: FloatingStrategy

    /** Floating ui middlewares */
    middlewares?: TooltipMiddlewares

    /** Called when tooltip position changes */
    onPositionChange?: (position: FloatingPosition) => void

    /** Target element, can be a ref, HTMLElement or CSS selector string. If set, children are not required. */
    target?: React.RefObject<HTMLElement | null> | HTMLElement | null | string
}

export type TooltipFactory = Factory<{
    props: TooltipProps
    ref: HTMLDivElement
    stylesNames: TooltipStylesNames
    vars: TooltipCssVariables
    staticComponents: {
        Group: typeof TooltipGroup
        Floating: typeof TooltipFloating
    }
}>

const defaultProps = {
    position: 'top',
    arrowSize: 4,
    arrowOffset: 5,
    arrowRadius: 0,
    arrowPosition: 'side',
    offset: 5,
    events: { hover: true, focus: false, touch: false },
    zIndex: getDefaultZIndex('popover'),
    middlewares: { flip: true, shift: true, inline: false }
} satisfies Partial<TooltipProps>

const varsResolver = createVarsResolver<TooltipFactory>((theme, { radius, color, variant }) => {
    const colors = theme.variantColorResolver({
        theme,
        color: color || theme.primaryColor,
        variant: variant || 'filled'
    })

    return {
        tooltip: {
            '--tooltip-radius': radius === undefined ? undefined : getRadius(radius),
            '--tooltip-bg': color ? colors.background : undefined,
            '--tooltip-color': color ? colors.color : undefined
        }
    }
})

export const Tooltip = factory<TooltipFactory>((_props, ref) => {
    const groupCtx = useTooltipGroupContext()
    const props = useProps('Tooltip', defaultProps, _props)
    const {
        children,
        position,
        label,
        openDelay,
        closeDelay,
        onPositionChange,
        opened,
        defaultOpened,
        radius,
        color,
        classNames,
        styles,
        unstyled,
        style,
        className,
        withArrow,
        arrowSize,
        arrowOffset,
        arrowRadius,
        arrowPosition,
        offset,
        multiline,
        events,
        zIndex,
        disabled,
        variant,
        vars,
        mod,
        floatingStrategy,
        middlewares,
        target,
        ...others
    } = props

    const resolvedOpenDelay = openDelay ?? groupCtx.openDelay
    const resolvedCloseDelay = closeDelay ?? groupCtx.closeDelay

    const arrowRef = useRef<HTMLDivElement>(null)

    const { dir } = useDirection()

    const tooltip = useTooltip({
        position: getFloatingPosition(dir, position!),
        closeDelay: resolvedCloseDelay,
        openDelay: resolvedOpenDelay,
        onPositionChange,
        opened,
        defaultOpened,
        events,
        arrowRef,
        arrowOffset,
        offset: offset! + (withArrow ? arrowSize! / 2 : 0),
        strategy: floatingStrategy,
        middlewares
    })

    // reference 来自 floating-ui 的 refs.setReference,引用稳定;
    // 依赖数组只保留 target,避免 tooltip 对象每渲染变化导致 effect 重复执行
    const setReference = tooltip.reference
    useEffect(() => {
        // 注意：字符串选择器/ref 仅在本 effect 执行时（mount 及 target 变化）解析一次，
        // target 元素必须此时已存在于 DOM 中；后挂载的元素不会被重新解析。
        // 该模式下事件监听依赖 reference，仅支持受控 opened，故无需按打开状态重解析。
        const targetNode: HTMLElement | null =
            target instanceof HTMLElement
                ? target
                : typeof target === 'string'
                    ? (document.querySelector(target) as HTMLElement | null)
                    : target?.current || null

        if (targetNode) {
            setReference(targetNode)
        }
    }, [target, setReference])

    const getStyles = useStyles<TooltipFactory>({
        name: 'Tooltip',
        props,
        classes,
        className,
        style,
        classNames,
        styles,
        unstyled,
        rootSelector: 'tooltip',
        vars,
        varsResolver
    })

    const child = getSingleElementChild(children) as React.ReactElement<any>
    if (!target && !child) {
        throw new Error(
            '[@xiaoye-react/ui] Tooltip component children should be an element or a component that accepts ref. Use target prop to specify target element without children.'
        )
    }

    // React 19 中 child 的 ref 是普通 prop：合并而非覆盖，否则子元素自带 ref 时
    // floating-ui 的 reference setter 永远不被调用，tooltip 定位失效。
    // floating-ui 的 setReference 必须并入合并链（对齐 PopoverTarget/HoverCardTarget）：
    // 缺失时 useFloating 注册不到 reference 元素，定位（x/y 恒为 0）与 hover/focus 监听全部失效
    const childProps = (child?.props ?? {}) as any
    const mergedRef = useMergedRef(tooltip.reference, ref as React.Ref<any>, childProps.ref)

    const tooltipStyles = getStyles('tooltip')

    if (target) {
        return (
            <Portal>
                <Transition mounted={!disabled && !!tooltip.opened} transition="fade" duration={100}>
                    {transitionStyles => (
                        <Box
                            {...others}
                            variant={variant}
                            mod={[{ multiline }, mod]}
                            {...tooltip.getFloatingProps({
                                ref: tooltip.floating,
                                className: tooltipStyles.className,
                                style: {
                                    ...tooltipStyles.style,
                                    ...transitionStyles,
                                    zIndex: zIndex as React.CSSProperties['zIndex'],
                                    top: tooltip.y ?? 0,
                                    left: tooltip.x ?? 0
                                }
                            })}
                        >
                            {label}
                            <FloatingArrow
                                ref={arrowRef}
                                arrowX={tooltip.arrowX}
                                arrowY={tooltip.arrowY}
                                visible={withArrow}
                                position={tooltip.placement}
                                arrowSize={arrowSize!}
                                arrowOffset={arrowOffset!}
                                arrowRadius={arrowRadius!}
                                arrowPosition={arrowPosition!}
                                {...getStyles('arrow')}
                            />
                        </Box>
                    )}
                </Transition>
            </Portal>
        )
    }

    return (
        <>
            <Portal>
                <Transition mounted={!disabled && !!tooltip.opened} transition="fade" duration={100}>
                    {transitionStyles => (
                        <Box
                            {...others}
                            variant={variant}
                            mod={[{ multiline }, mod]}
                            {...tooltip.getFloatingProps({
                                ref: tooltip.floating,
                                className: tooltipStyles.className,
                                style: {
                                    ...tooltipStyles.style,
                                    ...transitionStyles,
                                    zIndex: zIndex as React.CSSProperties['zIndex'],
                                    top: tooltip.y ?? 0,
                                    left: tooltip.x ?? 0
                                }
                            })}
                        >
                            {label}
                            <FloatingArrow
                                ref={arrowRef}
                                arrowX={tooltip.arrowX}
                                arrowY={tooltip.arrowY}
                                visible={withArrow}
                                position={tooltip.placement}
                                arrowSize={arrowSize!}
                                arrowOffset={arrowOffset!}
                                arrowRadius={arrowRadius!}
                                arrowPosition={arrowPosition!}
                                {...getStyles('arrow')}
                            />
                        </Box>
                    )}
                </Transition>
            </Portal>

            {cloneElement(
                child!,
                tooltip.getReferenceProps({
                    ...childProps,
                    // ref 必须在展开 childProps 之后：避免被 childProps.ref 覆盖
                    ref: mergedRef,
                    className: [className, childProps.className].filter(Boolean).join(' ')
                })
            )}
        </>
    )
})

Tooltip.classes = classes
Tooltip.displayName = '@xiaoye-react/ui/Tooltip'
Tooltip.Group = TooltipGroup
Tooltip.Floating = TooltipFloating
