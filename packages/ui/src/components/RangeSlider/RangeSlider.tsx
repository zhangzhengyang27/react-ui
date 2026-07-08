import React from 'react'
import {
    Box,
    BoxProps,
    createVarsResolver,
    factory,
    Factory,
    getRadius,
    getSize,
    MantineColor,
    MantineRadius,
    MantineSize,
    StylesApiProps,
    useProps,
    useStyles
} from '../../core'
import classes from './RangeSlider.module.css'

export type RangeSliderStylesNames = 'root' | 'track' | 'bar' | 'thumb'

export type RangeSliderCssVariables = {
    root: '--slider-thumb-size' | '--slider-track-height' | '--slider-radius' | '--slider-color'
}

export interface RangeSliderProps extends BoxProps, StylesApiProps<RangeSliderFactory> {
    /** Current value array [min, max] */
    value?: [number, number]

    /** Default value for uncontrolled slider */
    defaultValue?: [number, number]

    /** Called when value changes */
    onChange?: (value: [number, number]) => void

    /** Called when user stops dragging */
    onChangeEnd?: (value: [number, number]) => void

    /** Minimum possible value @default 0 */
    min?: number

    /** Maximum possible value @default 100 */
    max?: number

    /** Step value @default 1 */
    step?: number

    /** If true, slider is disabled @default false */
    disabled?: boolean

    /** Key of theme.colors or any valid CSS color */
    color?: MantineColor

    /** Controls thumb size */
    size?: MantineSize

    /** Controls thumb size */
    thumbSize?: number | string

    /** Controls track radius */
    radius?: MantineRadius
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
    disabled: false
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
    const [start, end] = [clamp(currentValue[0], min, max), clamp(currentValue[1], min, max)]
    const sorted = start <= end ? [start, end] : [end, start]
    const startPercent = ((sorted[0] - min) / (max - min)) * 100
    const endPercent = ((sorted[1] - min) / (max - min)) * 100

    const update = (index: number, nextValue: number) => {
        const next: [number, number] = index === 0 ? [nextValue, currentValue[1]] : [currentValue[0], nextValue]
        if (!isControlled) {
            setInternalValue(next)
        }
        onChange?.(next)
    }

    const handleChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        update(index, Number(event.target.value))
    }

    const handleChangeEnd = () => {
        onChangeEnd?.(currentValue)
    }

    return (
        <Box ref={ref} {...getStyles('root')} mod={[{ disabled }, mod]} {...others}>
            <div {...getStyles('track')}>
                <div
                    {...getStyles('bar')}
                    style={{ left: `${startPercent}%`, width: `${endPercent - startPercent}%` }}
                />
                <div {...getStyles('thumb')} style={{ left: `${startPercent}%` }} />
                <div {...getStyles('thumb')} style={{ left: `${endPercent}%` }} />
            </div>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={start}
                disabled={disabled}
                onChange={handleChange(0)}
                onMouseUp={handleChangeEnd}
                onTouchEnd={handleChangeEnd}
                className={classes.input}
                data-thumb="0"
            />
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={end}
                disabled={disabled}
                onChange={handleChange(1)}
                onMouseUp={handleChangeEnd}
                onTouchEnd={handleChangeEnd}
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
