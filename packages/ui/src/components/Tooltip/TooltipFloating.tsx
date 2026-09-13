import * as React from 'react'
import { cloneElement, useRef, useState } from 'react'
import { useMergedRef } from '@xiaoye-react/hooks'
import {
    Box,
    createVarsResolver,
    factory,
    Factory,
    getDefaultZIndex,
    getRadius,
    getSingleElementChild,
    getThemeColor,
    useUITheme,
    useProps,
    useStyles,
    type BoxProps,
    type ElementProps,
    type UIColor,
    type UIRadius,
    type StylesApiProps
} from '../../core'
import { OptionalPortal } from '../Portal'
import classes from './Tooltip.module.css'

export interface TooltipFloatingProps extends BoxProps, StylesApiProps<TooltipFloatingFactory>, ElementProps<'div'> {
    /** Target element */
    children: React.ReactNode

    /** Tooltip content */
    label: React.ReactNode

    /** Offset from mouse in px @default 10 */
    offset?: number

    /** Tooltip position relative to mouse @default 'right' */
    position?: 'top' | 'bottom' | 'left' | 'right'

    /** Uncontrolled tooltip initial opened state */
    defaultOpened?: boolean

    /** 主题颜色的键或任意有效的 CSS 颜色 */
    color?: UIColor

    /** 主题圆角的键或任意有效的 CSS 值 */
    radius?: UIRadius

    /** If set, content is wrapped */
    multiline?: boolean

    /** Tooltip z-index */
    zIndex?: string | number

    /** If set, tooltip element will not be rendered */
    disabled?: boolean

    /** Determines whether tooltip should be rendered within Portal @default true */
    withinPortal?: boolean
}

export type TooltipFloatingFactory = Factory<{
    props: TooltipFloatingProps
    ref: HTMLDivElement
    stylesNames: 'tooltip'
    vars: { tooltip: '--tooltip-radius' | '--tooltip-bg' | '--tooltip-color' }
}>

const defaultProps = {
    offset: 10,
    position: 'right',
    zIndex: getDefaultZIndex('popover'),
    withinPortal: true
} satisfies Partial<TooltipFloatingProps>

const varsResolver = createVarsResolver<TooltipFloatingFactory>((theme, { radius, color }) => ({
    tooltip: {
        '--tooltip-radius': radius === undefined ? undefined : getRadius(radius),
        '--tooltip-bg': color ? getThemeColor(color, theme) : undefined,
        '--tooltip-color': color ? 'var(--ui-color-white)' : undefined
    }
}))

export const TooltipFloating = factory<TooltipFloatingFactory>((_props, ref) => {
    const props = useProps('TooltipFloating', defaultProps, _props)
    const {
        children,
        style,
        className,
        classNames,
        styles,
        unstyled,
        radius,
        color,
        label,
        offset,
        position,
        multiline,
        zIndex,
        disabled,
        vars,
        withinPortal,
        defaultOpened,
        ...others
    } = props

    const theme = useUITheme()
    const getStyles = useStyles<TooltipFloatingFactory>({
        name: 'TooltipFloating',
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

    const [opened, setOpened] = useState(!!defaultOpened)
    const [coords, setCoords] = useState({ x: 0, y: 0 })
    const boundaryRef = useRef<HTMLElement | null>(null)
    const tooltipRef = useRef<HTMLDivElement | null>(null)
    const isPortaled = withinPortal !== false

    const child = getSingleElementChild(children)
    if (!child) {
        throw new Error(
            '[@xiaoye-react/ui] Tooltip.Floating component children should be an element or a component that accepts ref, fragments, strings, numbers and other primitive values are not supported'
        )
    }

    const REACT_MAJOR = parseInt(React.version, 10)
// React 19 的 ref 在 child.props 上（访问 element.ref 会触发弃用告警）；
// React 18 的 ref 不进 props，按版本兼容读取，避免丢掉 child 自带的 ref
    const childPropsRef = ((child.props as any)?.ref ?? null) as React.Ref<any> | null
    const childElementRef = REACT_MAJOR >= 19 ? null : ((child as any).ref ?? null)
    const targetRef = useMergedRef(boundaryRef, childPropsRef, childElementRef, ref)

    const handleMouseMove = (event: React.MouseEvent<unknown>) => {
        (child.props as any)?.onMouseMove?.(event)
        const rect = boundaryRef.current?.getBoundingClientRect()

        if (isPortaled || !rect) {
            // Portal 模式：tooltip 挂在 body 上，必须用视口坐标定位（配合 position:fixed）；
            // clientX/Y - rect.left 只是相对目标左上角的偏移，直接当绝对坐标用会在
            // 目标不在视口原点或页面有滚动时完全错位
            const tooltipRect = tooltipRef.current?.getBoundingClientRect()
            const width = tooltipRect?.width ?? 0
            const height = tooltipRect?.height ?? 0
            const cursorX = event.clientX
            const cursorY = event.clientY

            let nextX = cursorX
            let nextY = cursorY

            if (position === 'right') {
                nextX = cursorX + (offset ?? 10)
                nextY = cursorY - height / 2
            } else if (position === 'left') {
                nextX = cursorX - (offset ?? 10) - width
                nextY = cursorY - height / 2
            } else if (position === 'top') {
                nextX = cursorX - width / 2
                nextY = cursorY - (offset ?? 10) - height
            } else if (position === 'bottom') {
                nextX = cursorX - width / 2
                nextY = cursorY + (offset ?? 10)
            }

            setCoords({ x: nextX, y: nextY })
            return
        }

        // 非 Portal：tooltip 与目标同容器渲染，定位基准是最近的定位祖先，
        // 沿用相对目标左上角的偏移
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top

        let nextX = x
        let nextY = y

        if (position === 'right') {
            nextX = x + (offset ?? 10)
            nextY = y
        } else if (position === 'left') {
            nextX = x - (offset ?? 10)
            nextY = y
        } else if (position === 'top') {
            nextX = x
            nextY = y - (offset ?? 10)
        } else if (position === 'bottom') {
            nextX = x
            nextY = y + (offset ?? 10)
        }

        setCoords({ x: nextX, y: nextY })
    }

    const handleMouseEnter = (event: React.MouseEvent<unknown>) => {
        (child.props as any)?.onMouseEnter?.(event)
        setOpened(true)
    }

    const handleMouseLeave = (event: React.MouseEvent<unknown>) => {
        (child.props as any)?.onMouseLeave?.(event)
        setOpened(false)
    }

    return (
        <>
            <OptionalPortal withinPortal={withinPortal}>
                <Box
                    ref={tooltipRef}
                    {...others}
                    {...getStyles('tooltip', {
                        style: {
                            zIndex: zIndex as React.CSSProperties['zIndex'],
                            display: !disabled && opened ? 'block' : 'none',
                            // Portal 到 body 后 absolute 的定位基准是 body，跟随光标需要 fixed
                            position: isPortaled ? 'fixed' : undefined,
                            top: Math.round(coords.y),
                            left: Math.round(coords.x)
                        }
                    })}
                    mod={{ multiline }}
                >
                    {label}
                </Box>
            </OptionalPortal>

            {cloneElement(child, {
                ...(child.props as any),
                ref: targetRef,
                onMouseMove: handleMouseMove,
                onMouseEnter: handleMouseEnter,
                onMouseLeave: handleMouseLeave
            } as any)}
        </>
    )
})

TooltipFloating.classes = classes
;(TooltipFloating as any).varsResolver = varsResolver
TooltipFloating.displayName = '@xiaoye-react/ui/TooltipFloating'

export namespace TooltipFloating {
    export type Props = TooltipFloatingProps
    export type Factory = TooltipFloatingFactory
}
