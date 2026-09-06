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
        if (!rect) return

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
                    {...others}
                    {...getStyles('tooltip', {
                        style: {
                            zIndex: zIndex as React.CSSProperties['zIndex'],
                            display: !disabled && opened ? 'block' : 'none',
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
