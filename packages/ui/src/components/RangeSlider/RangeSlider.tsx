import React, { useCallback, useRef } from 'react'
import { useMergedRef, useMove } from '@react-ui/hooks'
import {
    Box,
    BoxProps,
    createVarsResolver,
    factory,
    Factory,
    getRadius,
    getSize,
    UIColor,
    UIRadius,
    UISize,
    StylesApiProps,
    useProps,
    useStyles
} from '../../core'
import classes from './RangeSlider.module.css'

export type RangeSliderStylesNames = 'root' | 'track' | 'bar' | 'thumb' | 'label' | 'mark' | 'markLabel'

export type RangeSliderCssVariables = {
    root: '--slider-thumb-size' | '--slider-track-height' | '--slider-radius' | '--slider-color'
}

export type RangeSliderMark = {
    value: number
    label?: React.ReactNode
}

export interface RangeSliderProps extends BoxProps, StylesApiProps<RangeSliderFactory> {
    /** 当前值数组 [min, max] */
    value?: [number, number]

    /** 非受控滑块的默认值 */
    defaultValue?: [number, number]

    /** 值变化时调用 */
    onChange?: (value: [number, number]) => void

    /** 用户停止拖动时调用 */
    onChangeEnd?: (value: [number, number]) => void

    /** 最小可能值 @default 0 */
    min?: number

    /** 最大可能值 @default 100 */
    max?: number

    /** 步进值 @default 1 */
    step?: number

    /** 如果为 true，滑块将被禁用 @default false */
    disabled?: boolean

    /** 主题色键或任意有效 CSS 颜色 */
    color?: UIColor

    /** 控制滑块大小 */
    size?: UISize

    /** 控制滑块大小 */
    thumbSize?: number | string

    /** 控制轨道圆角 */
    radius?: UIRadius

    /** 生成标签的函数，设为 null 可禁用 */
    label?: ((value: number) => React.ReactNode) | React.ReactNode | null

    /** 传递给 Transition 组件的属性 */
    labelTransitionProps?: object

    /** 如果为 true，值标签始终可见 @default false */
    labelAlwaysOn?: boolean

    /** 如果为 true，悬停时显示值标签 @default true */
    showLabelOnHover?: boolean

    /** 两个滑块之间的最小范围间隔 @default 0 */
    minRange?: number

    /** 最大范围间隔 @default Infinity */
    maxRange?: number

    /** 是否反转轨道值的表示 @default false */
    inverted?: boolean

    /** 轨道上显示的标记 */
    marks?: RangeSliderMark[]

    /** 是否仅允许从给定标记数组中选择 @default false */
    restrictToMarks?: boolean

    /** 当达到 minRange/maxRange 时是否推动另一个滑块 @default true */
    pushOnOverlap?: boolean

    /** 渲染在滑块内部的内容，可以是两个节点的数组 */
    thumbChildren?: React.ReactNode | React.ReactNode[]

    /** 改变滑块比例的转换函数 */
    scale?: (value: number) => number
}

export type RangeSliderFactory = Factory<{
    props: RangeSliderProps
    ref: HTMLDivElement
    stylesNames: RangeSliderStylesNames
    vars: RangeSliderCssVariables
}>

const defaultProps = {
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
    minRange: 0,
    maxRange: Infinity,
    pushOnOverlap: true,
    labelAlwaysOn: false,
    showLabelOnHover: true,
    inverted: false,
    restrictToMarks: false
} satisfies Partial<RangeSliderProps>

const varsResolver = createVarsResolver<RangeSliderFactory>((_, { color, size, thumbSize, radius }) => ({
    root: {
        '--slider-thumb-size':
            thumbSize === undefined ? getSize(size, 'slider-thumb-size') : getSize(thumbSize, 'slider-thumb-size'),
        '--slider-track-height': getSize(size, 'slider-track-height'),
        '--slider-radius': radius === undefined ? undefined : getRadius(radius),
        '--slider-color': color === undefined ? undefined : `var(--ui-color-${color}-filled)`
    }
}))

function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max)
}

function getPercentage(value: number, min: number, max: number) {
    return ((value - min) / (max - min)) * 100
}

function findClosestMark(value: number, marks: RangeSliderMark[]) {
    const values = marks.map((m) => m.value)
    return values.reduce((prev, curr) => (Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev))
}

function precisionRound(value: number, step: number) {
    const decimals = step.toString().split('.')[1]?.length || 0
    return Number(value.toFixed(decimals))
}

export const RangeSlider = factory<RangeSliderFactory>((_props, ref) => {
    const props = useProps('RangeSlider', defaultProps, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        value,
        defaultValue,
        onChange,
        onChangeEnd,
        min,
        max,
        step,
        disabled,
        color,
        size,
        thumbSize,
        radius,
        label,
        labelAlwaysOn,
        showLabelOnHover,
        labelTransitionProps,
        minRange,
        maxRange,
        pushOnOverlap,
        inverted,
        marks,
        restrictToMarks,
        thumbChildren,
        scale,
        mod,
        ...others
    } = props

    const getStyles = useStyles<RangeSliderFactory>({
        name: 'RangeSlider',
        props,
        classes,
        className,
        style,
        classNames,
        styles,
        unstyled,
        vars,
        varsResolver
    })

    const isControlled = value !== undefined
    const [internalValue, setInternalValue] = React.useState<[number, number]>(defaultValue ?? [min, max])
    const currentValue = isControlled ? value! : internalValue
    const valueRef = useRef(currentValue)
    valueRef.current = currentValue
    const [hovered, setHovered] = React.useState(false)
    const [focused, setFocused] = React.useState(-1)

    const sorted = currentValue[0] <= currentValue[1] ? currentValue : [currentValue[1], currentValue[0]]
    const startPercent = getPercentage(sorted[0], min, max)
    const endPercent = getPercentage(sorted[1], min, max)

    const setValue = useCallback(
        (next: [number, number]) => {
            if (!isControlled) {
                setInternalValue(next)
            }
            onChange?.(next)
        },
        [isControlled, onChange]
    )

    const update = useCallback(
        (index: number, rawValue: number) => {
            let nextValue = clamp(rawValue, min, max)

            if (restrictToMarks && marks && marks.length > 0) {
                nextValue = findClosestMark(nextValue, marks)
            }

            const next: [number, number] = [...currentValue]
            next[index] = nextValue

            const otherIndex = index === 0 ? 1 : 0

            // minRange / maxRange 约束
            if (minRange > 0 || maxRange !== Infinity) {
                const distance = Math.abs(next[index] - next[otherIndex])

                if (minRange > 0 && distance < minRange) {
                    if (pushOnOverlap) {
                        if (index === 0) {
                            next[1] = Math.min(max, next[0] + minRange)
                        } else {
                            next[0] = Math.max(min, next[1] - minRange)
                        }
                    } else {
                        next[index] = currentValue[index]
                    }
                }

                if (maxRange !== Infinity && distance > maxRange) {
                    if (pushOnOverlap) {
                        if (index === 0) {
                            next[1] = Math.min(max, next[0] + maxRange)
                        } else {
                            next[0] = Math.max(min, next[1] - maxRange)
                        }
                    } else {
                        next[index] = currentValue[index]
                    }
                }
            }

            // 保持 [0] <= [1]
            if (next[0] > next[1]) {
                const temp = next[0]
                next[0] = next[1]
                next[1] = temp
            }

            setValue(next)
        },
        [currentValue, min, max, minRange, maxRange, pushOnOverlap, restrictToMarks, marks, setValue]
    )

    const thumbIndexRef = useRef<number | null>(null)
    const trackRef = useRef<HTMLDivElement>(null)

    const handleMove = useCallback(
        ({ x }: { x: number; y: number }) => {
            if (disabled) return
            const factor = inverted ? 1 - x : x
            let rawValue = min + factor * (max - min)
            rawValue = min + Math.round((rawValue - min) / step) * step
            rawValue = clamp(rawValue, min, max)
            rawValue = precisionRound(rawValue, step)

            if (thumbIndexRef.current === null) {
                const latest = valueRef.current
                const dist0 = Math.abs(rawValue - latest[0])
                const dist1 = Math.abs(rawValue - latest[1])
                thumbIndexRef.current = dist0 <= dist1 ? 0 : 1
            }

            update(thumbIndexRef.current, rawValue)
        },
        [disabled, inverted, min, max, step, update]
    )

    const { ref: moveRef } = useMove(
        handleMove,
        {
            onScrubStart: () => {
                thumbIndexRef.current = null
            },
            onScrubEnd: () => {
                thumbIndexRef.current = null
                onChangeEnd?.(valueRef.current)
            }
        },
        'ltr'
    )

    const setTrackRef = useMergedRef(trackRef, moveRef)

    const handleInputChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        update(index, Number(event.target.value))
    }

    const handleInputBlur = () => {
        setFocused(-1)
        onChangeEnd?.(currentValue)
    }

    const renderLabel = (rawValue: number) => {
        if (label === null) return null
        const displayValue = scale ? scale(rawValue) : rawValue
        if (typeof label === 'function') return label(displayValue)
        if (label !== undefined) return label
        return displayValue
    }

    const hasArrayThumbChildren = Array.isArray(thumbChildren)

    const renderThumb = (index: number, rawValue: number, percent: number) => {
        const isVisible = labelAlwaysOn || (showLabelOnHover && hovered) || focused === index
        const positionStyle = { [inverted ? 'right' : 'left']: `${percent}%` }
        const child = hasArrayThumbChildren ? thumbChildren[index] : thumbChildren

        return (
            <div
                key={index}
                {...getStyles('thumb')}
                style={positionStyle}
                data-label-hover={showLabelOnHover || undefined}
            >
                {label !== null && (
                    <div {...getStyles('label')} data-label-visible={isVisible || undefined}>
                        {renderLabel(rawValue)}
                    </div>
                )}
                {child}
            </div>
        )
    }

    return (
        <Box
            ref={ref}
            {...getStyles('root')}
            mod={[{ disabled, inverted }, mod]}
            onMouseEnter={showLabelOnHover ? () => setHovered(true) : undefined}
            onMouseLeave={showLabelOnHover ? () => setHovered(false) : undefined}
            {...others}
        >
            <div {...getStyles('track')} ref={setTrackRef}>
                <div
                    {...getStyles('bar')}
                    style={
                        inverted
                            ? { right: `${100 - endPercent}%`, width: `${endPercent - startPercent}%` }
                            : { left: `${startPercent}%`, width: `${endPercent - startPercent}%` }
                    }
                />
                {renderThumb(0, sorted[0], startPercent)}
                {renderThumb(1, sorted[1], endPercent)}
                {marks?.map((mark) => {
                    const percent = getPercentage(mark.value, min, max)
                    return (
                        <div
                            key={mark.value}
                            {...getStyles('mark')}
                            style={{ [inverted ? 'right' : 'left']: `${percent}%` }}
                        >
                            {mark.label && <span {...getStyles('markLabel')}>{mark.label}</span>}
                        </div>
                    )
                })}
            </div>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={currentValue[0]}
                disabled={disabled}
                onChange={handleInputChange(0)}
                onFocus={() => setFocused(0)}
                onBlur={handleInputBlur}
                className={classes.input}
                data-thumb="0"
            />
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={currentValue[1]}
                disabled={disabled}
                onChange={handleInputChange(1)}
                onFocus={() => setFocused(1)}
                onBlur={handleInputBlur}
                className={classes.input}
                data-thumb="1"
            />
        </Box>
    )
})

RangeSlider.classes = classes
;(RangeSlider as any).varsResolver = varsResolver
RangeSlider.displayName = '@react-ui/ui/RangeSlider'

export namespace RangeSlider {
    export type Props = RangeSliderProps
    export type Factory = RangeSliderFactory
    export type StylesNames = RangeSliderStylesNames
    export type CssVariables = RangeSliderCssVariables
}
