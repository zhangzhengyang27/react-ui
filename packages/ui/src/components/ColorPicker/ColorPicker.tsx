import { useRef, useState } from 'react'
import { useDidUpdate, useUncontrolled } from '@react-ui/hooks'
import {
    Box,
    BoxProps,
    createVarsResolver,
    DataAttributes,
    ElementProps,
    factory,
    Factory,
    getSize,
    getSpacing,
    UISize,
    StylesApiProps,
    useProps,
    useStyles
} from '../../core'
import { ColorSwatch } from '../ColorSwatch'
import { AlphaSlider } from './AlphaSlider/AlphaSlider'
import { ColorPickerContextProvider } from './ColorPicker.context'
import { ColorFormat, HsvaColor } from './ColorPicker.types'
import { convertHsvaTo, isColorValid, parseColor } from './converters'
import { HueSlider } from './HueSlider/HueSlider'
import { Saturation } from './Saturation/Saturation'
import { Swatches } from './Swatches/Swatches'
import classes from './ColorPicker.module.css'

export type ColorPickerStylesNames =
    | 'wrapper'
    | 'preview'
    | 'body'
    | 'sliders'
    | 'slider'
    | 'sliderOverlay'
    | 'thumb'
    | 'saturation'
    | 'saturationOverlay'
    | 'swatches'
    | 'swatch'

export type ColorPickerCssVariables = {
    wrapper:
        | '--cp-preview-size'
        | '--cp-width'
        | '--cp-body-spacing'
        | '--cp-swatch-size'
        | '--cp-thumb-size'
        | '--cp-saturation-height'
}

export interface __ColorPickerProps {
    /** Controlled component value */
    value?: string

    /** Uncontrolled component default value */
    defaultValue?: string

    //** 值变化时调用 */
    onChange?: (value: string) => void

    /** Called when the user stops dragging one of the sliders or changes the value with keyboard */
    onChangeEnd?: (value: string) => void

    /** Color format. `hexa`, `rgba`, `hsla` values render alpha channel slider @default 'hex' */
    format?: ColorFormat

    /** If `false`, the component displays only swatches @default true */
    withPicker?: boolean

    /** A list of colors used to display swatches list below the color picker */
    swatches?: string[]

    /** Number of swatches per row @default 7 */
    swatchesPerRow?: number

    /** Component size @default 'md' */
    size?: UISize | (string & {})
}

export interface ColorPickerProps
    extends BoxProps,
        __ColorPickerProps,
        StylesApiProps<ColorPickerFactory>,
        ElementProps<'div', 'onChange' | 'value' | 'defaultValue'> {
    __staticSelector?: string

    /** If set, the component takes 100% width of its container @default false */
    fullWidth?: boolean

    /** If set, interactive elements (sliders thumbs and swatches) are focusable with keyboard @default true */
    focusable?: boolean

    /** Saturation slider `aria-label` */
    saturationLabel?: string

    /** Hue slider `aria-label` */
    hueLabel?: string

    /** Alpha slider `aria-label` */
    alphaLabel?: string

    /** Called when one of the color swatches is clicked */
    onColorSwatchClick?: (color: string) => void

    /** Hidden input `name` attribute, if not set, the input will not be rendered */
    name?: string

    /** Props spread to the hidden input */
    hiddenInputProps?: React.ComponentProps<'input'> & DataAttributes
}

export type ColorPickerFactory = Factory<{
    props: ColorPickerProps
    ref: HTMLDivElement
    stylesNames: ColorPickerStylesNames
    vars: ColorPickerCssVariables
}>

const defaultProps = {
    swatchesPerRow: 7,
    withPicker: true,
    focusable: true,
    size: 'md',
    __staticSelector: 'ColorPicker'
} satisfies Partial<ColorPickerProps>

const varsResolver = createVarsResolver<ColorPickerFactory>((_, { size, swatchesPerRow }) => ({
    wrapper: {
        '--cp-preview-size': getSize(size, 'cp-preview-size'),
        '--cp-width': getSize(size, 'cp-width'),
        '--cp-body-spacing': getSpacing(size),
        '--cp-swatch-size': `${100 / swatchesPerRow!}%`,
        '--cp-thumb-size': getSize(size, 'cp-thumb-size'),
        '--cp-saturation-height': getSize(size, 'cp-saturation-height')
    }
}))

export const ColorPicker = factory<ColorPickerFactory>((_props, ref) => {
    const props = useProps('ColorPicker', defaultProps, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        format = 'hex',
        value,
        defaultValue,
        onChange,
        onChangeEnd,
        withPicker,
        size,
        saturationLabel,
        hueLabel,
        alphaLabel,
        focusable,
        swatches,
        swatchesPerRow,
        fullWidth,
        onColorSwatchClick,
        __staticSelector,
        mod,
        name,
        hiddenInputProps,
        ...others
    } = props

    const getStyles = useStyles<ColorPickerFactory>({
        name: __staticSelector,
        props,
        classes,
        className,
        style,
        classNames,
        styles,
        unstyled,
        rootSelector: 'wrapper',
        vars,
        varsResolver
    })

    const formatRef = useRef(format || 'hex')
    const valueRef = useRef<string>('')
    const scrubTimeoutRef = useRef<number>(-1)
    const isScrubbingRef = useRef(false)
    const withAlpha = format === 'hexa' || format === 'rgba' || format === 'hsla'

    const [_value, setValue, controlled] = useUncontrolled({
        value,
        defaultValue,
        finalValue: '#FFFFFF',
        onChange
    })

    const [parsed, setParsed] = useState<HsvaColor>(() => parseColor(_value))
    // 跟踪最新的 parsed,避免 onChangeEnd 闭包捕获过期值
    const parsedRef = useRef(parsed)
    parsedRef.current = parsed

    const startScrubbing = () => {
        window.clearTimeout(scrubTimeoutRef.current)
        isScrubbingRef.current = true
    }

    const stopScrubbing = () => {
        window.clearTimeout(scrubTimeoutRef.current)
        scrubTimeoutRef.current = window.setTimeout(() => {
            isScrubbingRef.current = false
        }, 200)
    }

    const handleChange = (color: Partial<HsvaColor>) => {
        setParsed(current => {
            const next = { ...current, ...color }
            valueRef.current = convertHsvaTo(formatRef.current, next)
            return next
        })

        setValue(valueRef.current)
    }

    useDidUpdate(() => {
        if (typeof value === 'string' && isColorValid(value) && !isScrubbingRef.current) {
            setParsed(parseColor(value))
        }
    }, [value])

    useDidUpdate(() => {
        formatRef.current = format || 'hex'
        // 优先用 _value 重新解析,避免 value 与 format 同时变化时 parsed 状态滞后导致引用过期值
        const nextParsed = isColorValid(_value) ? parseColor(_value) : parsed
        setValue(convertHsvaTo(formatRef.current, nextParsed))
    }, [format])

    return (
        <ColorPickerContextProvider value={{ getStyles, unstyled }}>
            <Box {...getStyles('wrapper')} size={size} mod={[{ 'full-width': fullWidth }, mod]} {...others} ref={ref}>
                {name && <input type="hidden" name={name} value={_value} {...hiddenInputProps} />}

                {withPicker && (
                    <>
                        <Saturation
                            value={parsed}
                            onChange={handleChange}
                            onChangeEnd={({ s, v }) =>
                                onChangeEnd?.(convertHsvaTo(formatRef.current, { ...parsedRef.current, s: s!, v: v! }))
                            }
                            color={_value}
                            size={size!}
                            focusable={focusable}
                            saturationLabel={saturationLabel}
                            onScrubStart={startScrubbing}
                            onScrubEnd={stopScrubbing}
                        />

                        <div {...getStyles('body')}>
                            <div {...getStyles('sliders')}>
                                <HueSlider
                                    value={parsed.h}
                                    onChange={h => handleChange({ h })}
                                    onChangeEnd={h => onChangeEnd?.(convertHsvaTo(formatRef.current, { ...parsedRef.current, h }))}
                                    size={size}
                                    focusable={focusable}
                                    aria-label={hueLabel}
                                    onScrubStart={startScrubbing}
                                    onScrubEnd={stopScrubbing}
                                />

                                {withAlpha && (
                                    <AlphaSlider
                                        value={parsed.a}
                                        onChange={a => handleChange({ a })}
                                        onChangeEnd={a => {
                                            onChangeEnd?.(convertHsvaTo(formatRef.current, { ...parsedRef.current, a }))
                                        }}
                                        size={size}
                                        color={convertHsvaTo('hex', parsed)}
                                        focusable={focusable}
                                        aria-label={alphaLabel}
                                        onScrubStart={startScrubbing}
                                        onScrubEnd={stopScrubbing}
                                    />
                                )}
                            </div>

                            {withAlpha && (
                                <ColorSwatch
                                    color={_value}
                                    radius="sm"
                                    size="var(--cp-preview-size)"
                                    {...getStyles('preview')}
                                />
                            )}
                        </div>
                    </>
                )}

                {Array.isArray(swatches) && (
                    <Swatches
                        data={swatches}
                        swatchesPerRow={swatchesPerRow}
                        focusable={focusable}
                        setValue={setValue}
                        value={_value}
                        onChangeEnd={color => {
                            const convertedColor = convertHsvaTo(format, parseColor(color))
                            onColorSwatchClick?.(convertedColor)
                            onChangeEnd?.(convertedColor)
                            if (!controlled) {
                                setParsed(parseColor(color))
                            }
                        }}
                    />
                )}
            </Box>
        </ColorPickerContextProvider>
    )
})

ColorPicker.classes = classes
;(ColorPicker as any).varsResolver = varsResolver
ColorPicker.displayName = '@react-ui/ui/ColorPicker'

export namespace ColorPicker {
    export type Props = ColorPickerProps
    export type CssVariables = ColorPickerCssVariables
    export type Factory = ColorPickerFactory
    export type StylesNames = ColorPickerStylesNames
}
