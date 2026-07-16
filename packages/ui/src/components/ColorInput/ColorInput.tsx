import { useEffect, useState } from 'react'
import { useDidUpdate, useEyeDropper, useId, useUncontrolled } from '@react-ui/hooks'
import {
    BoxProps,
    createVarsResolver,
    ElementProps,
    factory,
    Factory,
    getSize,
    UISize,
    StylesApiProps,
    useProps,
    useResolvedStylesApi,
    useStyles
} from '../../core'
import { ActionIcon } from '../ActionIcon'
import {
    __ColorPickerProps,
    ColorPicker,
    ColorPickerStylesNames,
    convertHsvaTo,
    isColorValid,
    parseColor
} from '../ColorPicker'
import { ColorSwatch } from '../ColorSwatch'
import { InputBase } from '../InputBase'
import { InputWrapper } from '../Input'
import { Popover, PopoverProps } from '../Popover'
import { EyeDropperIcon } from './EyeDropperIcon'
import classes from './ColorInput.module.css'

export type ColorInputStylesNames =
    | 'dropdown'
    | 'eyeDropperButton'
    | 'eyeDropperIcon'
    | 'colorPreview'
    | ColorPickerStylesNames
    | 'wrapper'
    | 'input'
    | 'section'
    | 'placeholder'
    | 'root'

export type ColorInputCssVariables = {
    eyeDropperIcon: '--ci-eye-dropper-icon-size'
    eyeDropperButton: '--ci-button-size'
    colorPreview: '--ci-preview-size'
}

export interface ColorInputProps
    extends BoxProps,
        __ColorPickerProps,
        StylesApiProps<ColorInputFactory>,
        ElementProps<'input', 'size' | 'onChange' | 'value' | 'defaultValue'> {
    //** 渲染在输入框上方的标签 */
    label?: React.ReactNode

    //** 渲染在标签下方的描述 */
    description?: React.ReactNode

    //** 渲染在输入框下方的错误 */
    error?: React.ReactNode

    //** 如果设置，则会在标签上添加必填星号 */
    required?: boolean

    /** If input is not allowed, the user can only pick value with color picker and swatches */
    disallowInput?: boolean

    /** If set, the input value resets to the last known valid value when the input loses focus @default true */
    fixOnBlur?: boolean

    /** Props passed down to the `Popover` component */
    popoverProps?: PopoverProps

    /** If set, the preview color swatch is displayed in the left section of the input @default true */
    withPreview?: boolean

    /** If set, the eye dropper button is displayed in the right section @default true */
    withEyeDropper?: boolean

    /** An icon to replace the default eye dropper icon */
    eyeDropperIcon?: React.ReactNode

    /** If set, the dropdown is closed when one of the color swatches is clicked @default false */
    closeOnColorSwatchClick?: boolean

    /** Props passed down to the eye dropper button */
    eyeDropperButtonProps?: Record<string, any>

    /** Props passed to the label element */
    labelProps?: React.ComponentProps<'label'>

    /** Props passed to the description element */
    descriptionProps?: React.ComponentProps<'div'>

    /** Props passed to the error element */
    errorProps?: React.ComponentProps<'div'>

    /** Controls size of the input @default 'sm' */
    size?: UISize

    /** Variant of the input */
    variant?: string

    /** If set, input will have invalid styles */
    invalid?: boolean

    /** Placeholder */
    placeholder?: string

    /** Props spread to the `InputBase` wrapper element */
    wrapperProps?: Record<string, any>

    /** Content rendered in the left section of the input */
    leftSection?: React.ReactNode

    /** Content rendered in the right section of the input */
    rightSection?: React.ReactNode
}

export type ColorInputFactory = Factory<{
    props: ColorInputProps
    ref: HTMLInputElement
    stylesNames: ColorInputStylesNames
    vars: ColorInputCssVariables
}>

const defaultProps = {
    format: 'hex',
    fixOnBlur: true,
    withPreview: true,
    swatchesPerRow: 7,
    withPicker: true,
    withEyeDropper: true,
    size: 'sm',
    closeOnColorSwatchClick: false
} satisfies Partial<ColorInputProps>

const varsResolver = createVarsResolver<ColorInputFactory>((_, { size }) => ({
    eyeDropperIcon: {
        '--ci-eye-dropper-icon-size': getSize(size, 'ci-eye-dropper-icon-size')
    },

    eyeDropperButton: {
        '--ci-button-size': getSize(size, 'ci-button-size')
    },

    colorPreview: {
        '--ci-preview-size': getSize(size, 'ci-preview-size')
    }
}))

export const ColorInput = factory<ColorInputFactory>((_props, ref) => {
    const props = useProps('ColorInput', defaultProps, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        label,
        description,
        error,
        required,
        labelProps,
        descriptionProps,
        errorProps,
        disallowInput,
        fixOnBlur,
        popoverProps,
        withPreview,
        withEyeDropper,
        eyeDropperIcon,
        closeOnColorSwatchClick,
        eyeDropperButtonProps,
        value,
        defaultValue,
        onChange,
        onChangeEnd,
        onClick,
        onFocus,
        onBlur,
        format = 'hex',
        wrapperProps,
        readOnly,
        withPicker,
        swatches,
        disabled,
        leftSection,
        rightSection,
        swatchesPerRow,
        size,
        variant,
        invalid,
        placeholder,
        id,
        ...others
    } = props

    const getStyles = useStyles<ColorInputFactory>({
        name: 'ColorInput',
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

    const { resolvedClassNames, resolvedStyles } = useResolvedStylesApi<ColorInputFactory>({
        classNames,
        styles,
        props
    })

    const [dropdownOpened, setDropdownOpened] = useState(false)
    const [lastValidValue, setLastValidValue] = useState('')
    const [_value, setValue] = useUncontrolled({
        value,
        defaultValue,
        finalValue: '',
        onChange
    })

    const { supported: eyeDropperSupported, open: openEyeDropper } = useEyeDropper()
    const inputId = useId(id)
    const hasWrapper = label || description || error

    const eyeDropper = (
        <ActionIcon
            {...eyeDropperButtonProps}
            {...getStyles('eyeDropperButton', {
                className: eyeDropperButtonProps?.className,
                style: eyeDropperButtonProps?.style
            })}
            variant="subtle"
            color="gray"
            unstyled={unstyled}
            onClick={() =>
                openEyeDropper()
                    .then(payload => {
                        if (payload?.sRGBHex) {
                            const color = convertHsvaTo(format, parseColor(payload.sRGBHex))
                            setValue(color)
                            onChangeEnd?.(color)
                        }
                    })
                    .catch(() => {})
            }
        >
            {eyeDropperIcon || <EyeDropperIcon {...getStyles('eyeDropperIcon')} />}
        </ActionIcon>
    )

    const handleInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        onFocus?.(event)
        setDropdownOpened(true)
    }

    const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        if (fixOnBlur) {
            setValue(lastValidValue)
        }
        onBlur?.(event)
        setDropdownOpened(false)
    }

    const handleInputClick = (event: React.MouseEvent<HTMLInputElement>) => {
        onClick?.(event)
        setDropdownOpened(true)
    }

    useEffect(() => {
        if (isColorValid(_value) || _value.trim() === '') {
            setLastValidValue(_value)
        }
    }, [_value])

    useDidUpdate(() => {
        if (isColorValid(_value)) {
            setValue(convertHsvaTo(format, parseColor(_value)))
        }
    }, [format])

    const input = (
        <Popover
            position="bottom-start"
            offset={5}
            opened={dropdownOpened}
            {...popoverProps}
            classNames={resolvedClassNames}
            styles={resolvedStyles}
            unstyled={unstyled}
            disabled={
                readOnly || disabled || (withPicker === false && (!Array.isArray(swatches) || swatches.length === 0))
            }
        >
            <Popover.Target>
                <InputBase
                    autoComplete="off"
                    {...others}
                    id={inputId}
                    ref={ref}
                    classNames={resolvedClassNames}
                    styles={resolvedStyles}
                    disabled={disabled}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    onClick={handleInputClick}
                    spellCheck={false}
                    value={_value}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        const inputValue = event.currentTarget.value
                        setValue(inputValue)
                        if (isColorValid(inputValue)) {
                            onChangeEnd?.(convertHsvaTo(format, parseColor(inputValue)))
                        }
                    }}
                    leftSection={
                        leftSection ||
                        (withPreview ? (
                            <ColorSwatch
                                color={isColorValid(_value) ? _value : '#fff'}
                                size="var(--ci-preview-size)"
                                {...getStyles('colorPreview')}
                            />
                        ) : null)
                    }
                    readOnly={disallowInput || readOnly}
                    unstyled={unstyled}
                    rightSection={
                        rightSection ||
                        (withEyeDropper && !disabled && !readOnly && eyeDropperSupported ? eyeDropper : null)
                    }
                    size={size}
                    variant={variant}
                    invalid={invalid}
                    placeholder={placeholder}
                    wrapperProps={hasWrapper ? wrapperProps : { ...getStyles('wrapper'), ...wrapperProps }}
                />
            </Popover.Target>

            <Popover.Dropdown onMouseDown={event => event.preventDefault()} className={classes.dropdown}>
                <ColorPicker
                    value={_value}
                    onChange={setValue}
                    onChangeEnd={onChangeEnd}
                    format={format}
                    swatches={swatches}
                    swatchesPerRow={swatchesPerRow}
                    withPicker={withPicker}
                    size={size}
                    focusable={false}
                    unstyled={unstyled}
                    styles={resolvedStyles}
                    classNames={resolvedClassNames}
                    onColorSwatchClick={() => closeOnColorSwatchClick && setDropdownOpened(false)}
                />
            </Popover.Dropdown>
        </Popover>
    )

    if (!hasWrapper) {
        return input
    }

    return (
        <InputWrapper
            {...getStyles('root')}
            label={label}
            description={description}
            error={error}
            required={required}
            inputId={inputId}
            labelProps={labelProps}
            descriptionProps={descriptionProps}
            errorProps={errorProps}
        >
            {input}
        </InputWrapper>
    )
})

ColorInput.classes = classes
ColorInput.displayName = '@react-ui/ui/ColorInput'

export namespace ColorInput {
    export type Props = ColorInputProps
    export type StylesNames = ColorInputStylesNames
    export type Factory = ColorInputFactory
}
