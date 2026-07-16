import React from 'react'
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
import classes from './Slider.module.css'

export type SliderStylesNames = 'root' | 'track' | 'bar' | 'thumb' | 'label' | 'mark' | 'markLabel'

export type SliderCssVariables = {
    root: '--slider-thumb-size' | '--slider-track-height' | '--slider-radius' | '--slider-color'
}

export type SliderMark = {
    value: number
    label?: React.ReactNode
}

export interface SliderProps extends BoxProps, StylesApiProps<SliderFactory> {
    /** Current slider value */
    value?: number

    /** Default value for uncontrolled slider */
    defaultValue?: number

    //** 值变化时调用 */
    onChange?: (value: number) => void

    /** Called when user stops dragging */
    onChangeEnd?: (value: number) => void

    /** Minimum possible value @default 0 */
    min?: number

    /** Maximum possible value @default 100 */
    max?: number

    /** Step value @default 1 */
    step?: number

    /** If true, slider is disabled @default false */
    disabled?: boolean

    /** 主题颜色的键或任意有效的 CSS 颜色 */
    color?: UIColor

    /** Controls thumb size */
    size?: UISize

    /** Controls thumb size */
    thumbSize?: number | string

    /** Controls track radius */
    radius?: UIRadius

    /** Function to format label value or null to disable */
    label?: ((value: number) => React.ReactNode) | React.ReactNode | null

    /** 传递给 Transition 组件的属性 */
    labelTransitionProps?: object

    /** If true, the value label is always visible @default false */
    labelAlwaysOn?: boolean

    /** If true, the value label is shown on hover @default false */
    showLabelOnHover?: boolean

    /** Hidden input name */
    name?: string

    /** Accessible label for the slider thumb */
    thumbLabel?: string

    /** Content rendered inside thumb */
    thumbChildren?: React.ReactNode

    /** Marks displayed on the track */
    marks?: SliderMark[]

    /** A transformation function to change the scale of the slider */
    scale?: (value: number) => number

    /** Determines whether track values representation should be inverted @default false */
    inverted?: boolean

    /** Value at which the filled bar starts */
    startPointValue?: number

    /** Determines whether the selection should be only allowed from the given marks array @default false */
    restrictToMarks?: boolean
}

export type SliderFactory = Factory<{
    props: SliderProps
    ref: HTMLDivElement
    stylesNames: SliderStylesNames
    vars: SliderCssVariables
}>

const defaultProps = {
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
    labelAlwaysOn: false,
    showLabelOnHover: false,
    inverted: false,
    restrictToMarks: false
} satisfies Partial<SliderProps>

const varsResolver = createVarsResolver<SliderFactory>((_, { color, size, thumbSize, radius }) => ({
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

function findClosestMark(value: number, marks: SliderMark[]) {
    const values = marks.map((m) => m.value)
    return values.reduce((prev, curr) => (Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev))
}

export const Slider = factory<SliderFactory>((_props, ref) => {
    const props = useProps('Slider', defaultProps, _props)
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
        labelTransitionProps,
        labelAlwaysOn,
        showLabelOnHover,
        name,
        thumbLabel,
        thumbChildren,
        marks,
        scale,
        inverted,
        startPointValue,
        restrictToMarks,
        mod,
        ...others
    } = props

    const getStyles = useStyles<SliderFactory>({
        name: 'Slider',
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
    const [internalValue, setInternalValue] = React.useState(defaultValue ?? min)
    const currentValue = isControlled ? value! : internalValue
    const normalizedValue = clamp(currentValue, min, max)
    const [hovered, setHovered] = React.useState(false)

    const scaledValue = scale ? scale(normalizedValue) : normalizedValue
    const percentage = getPercentage(normalizedValue, min, max)

    const setNextValue = (next: number) => {
        const clamped = clamp(next, min, max)
        if (!isControlled) {
            setInternalValue(clamped)
        }
        onChange?.(clamped)
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let nextValue = Number(event.target.value)
        if (restrictToMarks && marks && marks.length > 0) {
            nextValue = findClosestMark(nextValue, marks)
        }
        setNextValue(nextValue)
    }

    // 从事件对象读取最新值:拖拽结束时 onChange 已执行 setState,
    // 但 React 重渲染前闭包中的 normalizedValue 仍是旧值,会导致 onChangeEnd 报告滞后值
    const handleChangeEnd = (event: React.MouseEvent<HTMLInputElement> | React.TouchEvent<HTMLInputElement>) => {
        let nextValue = Number(event.currentTarget.value)
        if (restrictToMarks && marks && marks.length > 0) {
            nextValue = findClosestMark(nextValue, marks)
        }
        onChangeEnd?.(clamp(nextValue, min, max))
    }

    const renderLabel = (value: number) => {
        if (label === null) return null
        if (typeof label === 'function') return label(value)
        if (label !== undefined) return label
        return value
    }

    // bar 起点与宽度
    let barStyle: React.CSSProperties
    if (inverted) {
        barStyle = { right: `${100 - percentage}%`, width: `${percentage}%` }
    } else if (typeof startPointValue === 'number') {
        const startPercent = getPercentage(clamp(startPointValue, min, max), min, max)
        const left = Math.min(startPercent, percentage)
        const width = Math.abs(percentage - startPercent)
        barStyle = { left: `${left}%`, width: `${width}%` }
    } else {
        barStyle = { left: 0, width: `${percentage}%` }
    }

    const thumbPositionStyle = { [inverted ? 'right' : 'left']: `${percentage}%` }
    const isLabelVisible = labelAlwaysOn || (showLabelOnHover && hovered)

    return (
        <Box
            ref={ref}
            {...getStyles('root')}
            mod={[{ disabled, inverted }, mod]}
            onMouseEnter={showLabelOnHover ? () => setHovered(true) : undefined}
            onMouseLeave={showLabelOnHover ? () => setHovered(false) : undefined}
            {...others}
        >
            <div {...getStyles('track')}>
                <div {...getStyles('bar')} style={barStyle} />
                <div
                    {...getStyles('thumb')}
                    style={thumbPositionStyle}
                    data-label-visible={isLabelVisible || undefined}
                    data-label-hover={showLabelOnHover || undefined}
                >
                    {label !== null && (
                        <div {...getStyles('label')}>{renderLabel(scaledValue)}</div>
                    )}
                    {thumbChildren}
                </div>
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
                value={normalizedValue}
                disabled={disabled}
                name={name}
                aria-label={thumbLabel}
                onChange={handleChange}
                onMouseUp={handleChangeEnd}
                onTouchEnd={handleChangeEnd}
                className={classes.input}
            />
        </Box>
    )
})

Slider.classes = classes
;(Slider as any).varsResolver = varsResolver
Slider.displayName = '@react-ui/ui/Slider'

export namespace Slider {
    export type Props = SliderProps
    export type Factory = SliderFactory
    export type StylesNames = SliderStylesNames
    export type CssVariables = SliderCssVariables
    export type Mark = SliderMark
}
