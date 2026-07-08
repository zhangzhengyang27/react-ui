import { useState } from 'react'
import { clamp, useId } from '@react-ui/hooks'
import {
    BoxProps,
    createVarsResolver,
    ElementProps,
    factory,
    Factory,
    getSize,
    MantineSize,
    StylesApiProps,
    useProps,
    useStyles
} from '../../core'
import { InputBase, InputWrapper } from '../InputBase'
import classes from './NumberInput.module.css'

export type NumberInputStylesNames = 'root' | 'input' | 'section' | 'control' | 'icon'

export type NumberInputCssVariables = {
    root: '--ni-control-width'
}

export interface NumberInputProps
    extends BoxProps,
        StylesApiProps<NumberInputFactory>,
        ElementProps<'input', 'size' | 'value' | 'defaultValue' | 'onChange'> {
    /** Label rendered above the input */
    label?: React.ReactNode

    /** Description rendered below the label */
    description?: React.ReactNode

    /** Error rendered below the input */
    error?: React.ReactNode

    /** Input placeholder */
    placeholder?: string

    /** Controls disabled state */
    disabled?: boolean

    /** If set, input will have invalid styles */
    invalid?: boolean

    /** Controls size of the input @default 'sm' */
    size?: MantineSize

    /** Variant of the input */
    variant?: string

    /** Minimum allowed value */
    min?: number

    /** Maximum allowed value */
    max?: number

    /** Step value for increment/decrement buttons and keyboard arrows @default 1 */
    step?: number

    /** Default value for uncontrolled component */
    defaultValue?: number | string

    /** Value for controlled component */
    value?: number | string

    /** Called when value changes */
    onChange?: (value: number | string) => void

    /** If set, stepper controls will be hidden @default false */
    hideControls?: boolean
}

export type NumberInputFactory = Factory<{
    props: NumberInputProps
    ref: HTMLInputElement
    stylesNames: NumberInputStylesNames
    vars: NumberInputCssVariables
}>

const defaultProps = {
    size: 'sm',
    step: 1,
    hideControls: false
} satisfies Partial<NumberInputProps>

const varsResolver = createVarsResolver<NumberInputFactory>((_, { size }) => ({
    root: {
        '--ni-control-width': getSize(size, 'ni-control-width')
    }
}))

function formatValue(value: number | string | undefined): string {
    if (value === undefined || value === '') {
        return ''
    }
    return String(value)
}

function parseValue(value: string): number | undefined {
    if (value === '') {
        return undefined
    }
    const parsed = Number(value)
    return Number.isNaN(parsed) ? undefined : parsed
}

function NumberInputChevronUpIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <polyline points="18 15 12 9 6 15" />
        </svg>
    )
}

function NumberInputChevronDownIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <polyline points="6 9 12 15 18 9" />
        </svg>
    )
}

export const NumberInput = factory<NumberInputFactory>((_props, ref) => {
    const props = useProps('NumberInput', defaultProps, _props)
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
        placeholder,
        disabled,
        invalid,
        size,
        variant,
        min,
        max,
        step,
        defaultValue,
        value: valueProp,
        onChange,
        hideControls,
        id,
        onKeyDown,
        ...others
    } = props

    const getStyles = useStyles<NumberInputFactory>({
        name: 'NumberInput',
        classes,
        props,
        className,
        style,
        classNames,
        styles,
        unstyled,
        vars,
        varsResolver,
        rootSelector: 'root'
    })

    const inputId = useId(id)
    const isControlled = valueProp !== undefined
    const [uncontrolledValue, setUncontrolledValue] = useState(() => formatValue(defaultValue))
    const inputValue = isControlled ? formatValue(valueProp) : uncontrolledValue

    const currentNumber = parseValue(inputValue)

    const updateValue = (nextValue: number) => {
        const clamped = clamp(nextValue, min, max)
        onChange?.(clamped)
        if (!isControlled) {
            setUncontrolledValue(String(clamped))
        }
    }

    const increment = () => {
        const base = currentNumber ?? 0
        updateValue(base + (step ?? 1))
    }

    const decrement = () => {
        const base = currentNumber ?? 0
        updateValue(base - (step ?? 1))
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'ArrowUp') {
            event.preventDefault()
            increment()
        } else if (event.key === 'ArrowDown') {
            event.preventDefault()
            decrement()
        }
        onKeyDown?.(event)
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const nextValue = event.currentTarget.value
        if (!isControlled) {
            setUncontrolledValue(nextValue)
        }
        const parsed = parseValue(nextValue)
        if (parsed !== undefined) {
            onChange?.(clamp(parsed, min, max))
        }
    }

    const controls = hideControls ? null : (
        <div {...getStyles('section')}>
            <button
                {...getStyles('control')}
                type="button"
                disabled={disabled}
                data-direction="up"
                aria-label="Increment"
                onClick={increment}
            >
                <span {...getStyles('icon')}>
                    <NumberInputChevronUpIcon />
                </span>
            </button>
            <button
                {...getStyles('control')}
                type="button"
                disabled={disabled}
                data-direction="down"
                aria-label="Decrement"
                onClick={decrement}
            >
                <span {...getStyles('icon')}>
                    <NumberInputChevronDownIcon />
                </span>
            </button>
        </div>
    )

    return (
        <InputWrapper {...getStyles('root')} label={label} description={description} error={error} inputId={inputId}>
            <InputBase
                {...getStyles('input')}
                component="input"
                ref={ref}
                id={inputId}
                type="number"
                disabled={disabled}
                invalid={invalid}
                size={size}
                variant={variant}
                placeholder={placeholder}
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                min={min}
                max={max}
                step={step}
                rightSection={controls}
                rightSectionWidth={hideControls ? undefined : 'var(--ni-control-width)'}
                {...others}
            />
        </InputWrapper>
    )
})

NumberInput.classes = classes
;(NumberInput as any).varsResolver = varsResolver
NumberInput.displayName = '@react-ui/ui/NumberInput'

export namespace NumberInput {
    export type Props = NumberInputProps
    export type StylesNames = NumberInputStylesNames
    export type Factory = NumberInputFactory
    export type CssVariables = NumberInputCssVariables
}
