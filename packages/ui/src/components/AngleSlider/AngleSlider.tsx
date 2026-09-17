import { useRef } from 'react'
import { normalizeRadialValue, useMergedRef, useRadialMove, useUncontrolled } from '@xiaoye-react/hooks'
import {
    Box,
    BoxProps,
    createVarsResolver,
    ElementProps,
    factory,
    Factory,
    rem,
    StylesApiProps,
    useProps,
    useStyles
} from '../../core'
import classes from './AngleSlider.module.css'

export type AngleSliderStylesNames = 'root' | 'thumb' | 'label' | 'marks' | 'mark'
export type AngleSliderCssVariables = {
    root: '--angle-slider-size' | '--angle-slider-thumb-size'
}

export interface AngleSliderProps
    extends BoxProps, StylesApiProps<AngleSliderFactory>, ElementProps<'div', 'onChange'> {
    step?: number
    value?: number
    defaultValue?: number
    onChange?: (value: number) => void
    onChangeEnd?: (value: number) => void
    onScrubStart?: () => void
    onScrubEnd?: () => void
    withLabel?: boolean
    marks?: { value: number; label?: string }[]
    size?: number
    thumbSize?: number
    formatLabel?: (value: number) => React.ReactNode
    disabled?: boolean
    restrictToMarks?: boolean
    hiddenInputProps?: React.ComponentProps<'input'>
    name?: string
}

export type AngleSliderFactory = Factory<{
    props: AngleSliderProps
    ref: HTMLDivElement
    stylesNames: AngleSliderStylesNames
    vars: AngleSliderCssVariables
}>

const defaultProps = {
    step: 1,
    withLabel: true
} satisfies Partial<AngleSliderProps>

function findClosestNumber(value: number, numbers: number[]): number {
    if (numbers.length === 0) {
        return value
    }

    return numbers.reduce((prev, curr) =>
        Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
    )
}

const varsResolver = createVarsResolver<AngleSliderFactory>((_, { size, thumbSize }) => ({
    root: {
        '--angle-slider-size': rem(size),
        '--angle-slider-thumb-size': rem(thumbSize)
    }
}))

export const AngleSlider = factory<AngleSliderFactory>((_props, ref) => {
    const props = useProps('AngleSlider', defaultProps, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        step,
        value,
        defaultValue,
        onChange,
        onMouseDown,
        withLabel,
        marks,
        thumbSize,
        restrictToMarks,
        formatLabel,
        onChangeEnd,
        disabled,
        onTouchStart,
        name,
        hiddenInputProps,
        'aria-label': ariaLabel,
        tabIndex,
        onScrubStart,
        onScrubEnd,
        mod,
        attributes,
        ...others
    } = props

    const rootRef = useRef<HTMLDivElement | null>(null)

    const [_value, setValue] = useUncontrolled({
        value,
        defaultValue,
        finalValue: 0,
        onChange
    })

    const update = (val: number) => {
        if (rootRef.current && !disabled) {
            const newValue =
                restrictToMarks && Array.isArray(marks)
                    ? findClosestNumber(val, marks.map((mark) => mark.value))
                    : val

            setValue(newValue)
        }
    }

    const { ref: radialMoveRef } = useRadialMove(update, {
        step,
        onChangeEnd,
        onScrubStart,
        onScrubEnd
    })

    const getStyles = useStyles<AngleSliderFactory>({
        name: 'AngleSlider',
        classes,
        props,
        className,
        style,
        classNames,
        styles,
        unstyled,
        attributes,
        vars,
        varsResolver
    })

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (disabled) {
            return
        }

        // 未处理的按键直接返回,避免任意键都触发 setValue + onChangeEnd
        const commitKeys = ['ArrowLeft', 'ArrowDown', 'ArrowRight', 'ArrowUp', 'Home', 'End']
        if (!commitKeys.includes(event.key)) {
            return
        }

        let newValue = _value

        if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
            event.preventDefault()
            if (_value === 0) {
                // 回绕按 step 网格:0 的前一个是 360 - step 归一化后的值,而非硬编码 359
                newValue = normalizeRadialValue(360 - step, step)
            } else {
                newValue = normalizeRadialValue(_value - step, step)
            }
        }

        if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
            event.preventDefault()
            // 网格最大值的下一个经归一化回到 0(360 会被归一化为 0),无需硬编码 359 判断
            newValue = normalizeRadialValue(_value + step, step)
        }

        if (event.key === 'Home') {
            // Home/End 同样会触发页面滚动（聚焦容器可滚动时），与方向键一致拦截默认行为
            event.preventDefault()
            newValue = 0
        }

        if (event.key === 'End') {
            event.preventDefault()
            // 值域为 [0, 360) 的 step 网格,End 取网格上的最大值而非不可达的 359/360
            newValue = normalizeRadialValue(360 - step, step)
        }

        if (restrictToMarks && Array.isArray(marks)) {
            const markValues = marks.map((mark) => mark.value)
            const currentIndex = markValues.indexOf(_value)

            if (currentIndex !== -1) {
                if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
                    newValue = markValues[currentIndex === 0 ? markValues.length - 1 : currentIndex - 1]
                } else if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
                    newValue = markValues[currentIndex === markValues.length - 1 ? 0 : currentIndex + 1]
                } else {
                    newValue = findClosestNumber(newValue, markValues)
                }
            } else {
                newValue = findClosestNumber(newValue, markValues)
            }
        }

        setValue(newValue)
        onChangeEnd?.(newValue)
    }

    const marksItems = marks?.map((mark, index) => (
        <div
            {...getStyles('mark', { style: { '--angle': `${mark.value}deg` } })}
            data-label={mark.label || undefined}
            key={`${mark.value}-${index}`}
        />
    ))

    return (
        <Box
            ref={useMergedRef(ref, rootRef, radialMoveRef)}
            {...getStyles('root', { focusable: true })}
            mod={[{ disabled }, mod]}
            {...others}
            // useRadialMove 通过原生事件监听实现拖拽,用户的 onMouseDown/onTouchStart 需在此链式调用,
            // 否则解构后从未触发
            onMouseDown={(event) => {
                onMouseDown?.(event)
            }}
            onTouchStart={(event) => {
                onTouchStart?.(event)
            }}
        >
            {marksItems && marksItems.length > 0 && <div {...getStyles('marks')}>{marksItems}</div>}

            {withLabel && (
                <div {...getStyles('label')}>
                    {typeof formatLabel === 'function' ? formatLabel(_value) : _value}
                </div>
            )}
            <div
                tabIndex={tabIndex ?? (disabled ? -1 : 0)}
                role="slider"
                // 值域为 [0, 360),360 会被归一化为 0 而不可达,aria-valuemax 取 359 诚实表达上界
                aria-valuemax={359}
                aria-valuemin={0}
                aria-valuenow={_value}
                onKeyDown={handleKeyDown}
                aria-label={ariaLabel}
                {...getStyles('thumb', { style: { transform: `rotate(${_value}deg)` } })}
            />
            <input type="hidden" name={name} value={_value} {...hiddenInputProps} />
        </Box>
    )
})

AngleSlider.displayName = '@xiaoye-react/ui/AngleSlider'
AngleSlider.classes = classes
AngleSlider.varsResolver = varsResolver

export namespace AngleSlider {
    export type Props = AngleSliderProps
    export type StylesNames = AngleSliderStylesNames
    export type CssVariables = AngleSliderCssVariables
    export type Factory = AngleSliderFactory
}
