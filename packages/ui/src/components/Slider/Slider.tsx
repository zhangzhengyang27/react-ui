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

    /** If true, the value label is always visible @default false */
    labelAlwaysOn?: boolean

    /** If true, the value label is shown on hover @default true */
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
    // 与 RangeSlider 及文档 configurator(libraryValue: true)保持一致,两端默认值统一为 true
    showLabelOnHover: true,
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
    // min === max 时分母为 0,返回 0 避免算出 NaN%
    if (max - min === 0) {
        return 0
    }
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

    // restrictToMarks 下原生键盘按 step 步进后会吸附回原 mark(step 小于 mark 间距一半时永远卡住),
    // 改为拦截 commit 类按键,直接在相邻 marks 之间导航
    // 记录按键前的值:keyup 时组件已用新值重渲染,直接对比 normalizedValue 检测不到变化
    const keyDownValueRef = React.useRef<number | null>(null)

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const commitKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End']
        if (!commitKeys.includes(event.key)) {
            return
        }

        if (!(restrictToMarks && marks && marks.length > 0)) {
            keyDownValueRef.current = normalizedValue
            return
        }

        event.preventDefault()

        const sorted = marks.map((m) => m.value).sort((a, b) => a - b)
        let nextValue = normalizedValue

        if (event.key === 'Home') {
            nextValue = sorted[0]
        } else if (event.key === 'End') {
            nextValue = sorted[sorted.length - 1]
        } else if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
            nextValue = sorted.find((markValue) => markValue > normalizedValue) ?? normalizedValue
        } else {
            nextValue = [...sorted].reverse().find((markValue) => markValue < normalizedValue) ?? normalizedValue
        }

        // marks 可能包含范围外的值,与拖拽路径保持一致,统一 clamp
        nextValue = clamp(nextValue, min, max)

        if (nextValue !== normalizedValue) {
            setNextValue(nextValue)
            // 键盘操作不会触发 mouseup/touchend,值变化后补发 onChangeEnd
            onChangeEnd?.(nextValue)
        }
    }

    // 非 restrictToMarks 时原生键盘行为生效,keyup 时值已提交,补发 onChangeEnd
    // (restrictToMarks 分支已在 keydown 中处理,这里跳过避免重复触发)
    const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (restrictToMarks && marks && marks.length > 0) {
            return
        }

        const commitKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End']
        if (!commitKeys.includes(event.key) || keyDownValueRef.current === null) {
            return
        }

        const nextValue = clamp(Number(event.currentTarget.value), min, max)
        if (nextValue !== keyDownValueRef.current) {
            onChangeEnd?.(nextValue)
        }
        keyDownValueRef.current = null
    }

    const renderLabel = (value: number) => {
        if (label === null) return null
        if (typeof label === 'function') return label(value)
        if (label !== undefined) return label
        return value
    }

    // bar 起点与宽度
    // 已知限制(文档已注明):设置 inverted 时 startPointValue 被忽略,
    // 故 inverted 分支在前,不再叠加 startPointValue 计算
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
                {marks?.map((mark, index) => {
                    const percent = getPercentage(mark.value, min, max)
                    return (
                        <div
                            // mark.value 可能重复,附加 index 避免撞 key
                            key={`${mark.value}-${index}`}
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
                onKeyDown={handleKeyDown}
                onKeyUp={handleKeyUp}
                onMouseUp={handleChangeEnd}
                onTouchEnd={handleChangeEnd}
                className={classes.input}
            />
        </Box>
    )
})

Slider.classes = classes
Slider.varsResolver = varsResolver
Slider.displayName = '@xiaoye-react/ui/Slider'

export namespace Slider {
    export type Props = SliderProps
    export type Factory = SliderFactory
    export type StylesNames = SliderStylesNames
    export type CssVariables = SliderCssVariables
    export type Mark = SliderMark
}
