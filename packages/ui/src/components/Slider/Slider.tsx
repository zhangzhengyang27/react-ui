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
import classes from './Slider.module.css'

export type SliderStylesNames = 'root' | 'track' | 'bar' | 'thumb' | 'label'

export type SliderCssVariables = {
    root: '--slider-thumb-size' | '--slider-track-height' | '--slider-radius' | '--slider-color'
}

export interface SliderProps extends BoxProps, StylesApiProps<SliderFactory> {
    /** Current slider value */
    value?: number

    /** Default value for uncontrolled slider */
    defaultValue?: number

    /** Called when value changes */
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

    /** Key of theme.colors or any valid CSS color */
    color?: MantineColor

    /** Controls thumb size */
    size?: MantineSize

    /** Controls track height */
    thumbSize?: number | string

    /** Controls track radius */
    radius?: MantineRadius

    /** If true, the value label is always visible @default false */
    labelAlwaysOn?: boolean

    /** If true, the value label is shown on hover @default false */
    showLabelOnHover?: boolean

    /** Function to format label value */
    label?: (value: number) => React.ReactNode

    /** Accessible name for the slider */
    name?: string
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
    showLabelOnHover: false
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
        labelAlwaysOn,
        showLabelOnHover,
        label,
        name,
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
    const percentage = ((normalizedValue - min) / (max - min)) * 100

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const nextValue = Number(event.target.value)
        if (!isControlled) {
            setInternalValue(nextValue)
        }
        onChange?.(nextValue)
    }

    const handleChangeEnd = (event: React.SyntheticEvent<HTMLInputElement>) => {
        onChangeEnd?.(Number(event.currentTarget.value))
    }

    return (
        <Box ref={ref} {...getStyles('root')} mod={[{ disabled }, mod]} {...others}>
            <div {...getStyles('track')}>
                <div {...getStyles('bar')} style={{ width: `${percentage}%` }} />
                <div
                    {...getStyles('thumb')}
                    style={{ left: `${percentage}%` }}
                    data-label-visible={labelAlwaysOn || undefined}
                    data-label-hover={showLabelOnHover || undefined}
                >
                    <div {...getStyles('label')}>{label ? label(normalizedValue) : normalizedValue}</div>
                </div>
            </div>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={normalizedValue}
                disabled={disabled}
                name={name}
                onChange={handleChange}
                onMouseUp={handleChangeEnd}
                onTouchEnd={handleChangeEnd}
                className={classes.input}
                aria-valuemin={min}
                aria-valuemax={max}
                aria-valuenow={normalizedValue}
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
}
