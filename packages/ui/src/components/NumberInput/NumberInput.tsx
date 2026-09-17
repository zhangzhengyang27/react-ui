import { useEffect, useRef, useState } from 'react'
import { clamp, useId } from '@xiaoye-react/hooks'
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
    useStyles
} from '../../core'
import { InputBase } from '../InputBase'
import { InputWrapper } from '../Input'
import classes from './NumberInput.module.css'

export type NumberInputStylesNames = 'root' | 'input' | 'section' | 'control' | 'icon'

export type NumberInputCssVariables = {
    root: '--ni-control-width'
}

export interface NumberInputProps
    extends BoxProps,
        StylesApiProps<NumberInputFactory>,
        ElementProps<'input', 'size' | 'value' | 'defaultValue' | 'onChange'> {
    /** 渲染在输入框上方的标签 */
    label?: React.ReactNode

    /** 渲染在标签下方的描述 */
    description?: React.ReactNode

    /** 渲染在输入框下方的错误 */
    error?: React.ReactNode

    /** Input placeholder */
    placeholder?: string

    /** Controls disabled state */
    disabled?: boolean

    /** If set, input will have invalid styles */
    invalid?: boolean

    /** Controls size of the input @default 'sm' */
    size?: UISize

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

    /** 值变化时调用 */
    onChange?: (value: number | string) => void

    /** If set, required asterisk is added to the label even if `required` is not set */
    withAsterisk?: boolean

    /** If set, stepper controls will be hidden @default false */
    hideControls?: boolean

    /** Value prefix, for example $ */
    prefix?: string

    /** Value suffix, for example USD */
    suffix?: string

    /** Thousands separator */
    thousandSeparator?: string | boolean
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

function parseRawValue(value: number | string | undefined): string {
    if (value === undefined || value === '') {
        return ''
    }
    return String(value).replace(/[^\d.-]/g, '')
}

function parseValue(value: string): number | undefined {
    if (value === '' || value === '-') {
        return undefined
    }
    const parsed = Number(value)
    return Number.isNaN(parsed) ? undefined : parsed
}

// step 的小数位数（科学计数法安全：1e-7 的 toString 含 'e'，split('.') 数不出小数位）
function getStepDecimals(step: number): number {
    const [mantissa, exponentPart] = step.toExponential().split('e')
    const mantissaDecimals = mantissa.split('.')[1]?.length ?? 0
    return Math.max(0, mantissaDecimals - parseInt(exponentPart, 10))
}

// 裸浮点加法在 step=0.1 时会产出 0.30000000000000004 之类的尾渣，
// 按 step 小数位数做十进制整数化计算后再回除
function addStep(base: number, step: number, sign: 1 | -1): number {
    const decimals = getStepDecimals(step)
    return Math.round((base + sign * step) * 10 ** decimals) / 10 ** decimals
}

function formatDisplayValue(
    value: string,
    prefix?: string,
    suffix?: string,
    thousandSeparator?: string | boolean
): string {
    if (value === '' || value === '-') {
        return value
    }

    const [intPart, decPart] = value.split('.')
    const separator = typeof thousandSeparator === 'string' ? thousandSeparator : thousandSeparator ? ',' : ''
    const formattedInt = separator ? intPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator) : intPart
    const formatted = decPart !== undefined ? `${formattedInt}.${decPart}` : formattedInt
    return `${prefix || ''}${formatted}${suffix || ''}`
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
        required,
        withAsterisk,
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
        prefix,
        suffix,
        thousandSeparator,
        id,
        onKeyDown,
        onFocus,
        onBlur,
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
    const [focused, setFocused] = useState(false)
    // 本地文本 state 作为输入框显示值的唯一来源：受控模式下中间态（空串、"-"、"1."）
    // 解析不出合法数值、不触发 onChange，若直接绑定 value prop 会导致 DOM 与 React 值追踪器
    // 失同步，重渲染时输入被弹回（无法清空、无法键入负号）
    const [localText, setLocalText] = useState(() => parseRawValue(defaultValue ?? valueProp))

    // value prop 外部变化且与本地解析值不同时，同步本地文本（本地输入导致的 onChange 不回写）
    useEffect(() => {
        if (isControlled && parseValue(localText) !== parseValue(parseRawValue(valueProp))) {
            setLocalText(parseRawValue(valueProp))
        }
    }, [isControlled, valueProp])

    const rawValue = localText
    const inputValue = focused ? rawValue : formatDisplayValue(rawValue, prefix, suffix, thousandSeparator)

    const currentNumber = parseValue(rawValue)
    // 记录最近一次合法数值：受控模式下文本解析失败（空串、"-" 等中间态）时，
    // 步进以其为基准，避免回退到 0 导致结果违背用户预期
    const lastValidNumberRef = useRef<number | undefined>(undefined)
    if (currentNumber !== undefined) {
        lastValidNumberRef.current = currentNumber
    }

    const updateValue = (nextValue: number) => {
        const clamped = clamp(nextValue, min, max)
        onChange?.(clamped)
        setLocalText(parseRawValue(clamped))
    }

    const increment = () => {
        const base = currentNumber ?? lastValidNumberRef.current ?? 0
        updateValue(addStep(base, step ?? 1, 1))
    }

    const decrement = () => {
        const base = currentNumber ?? lastValidNumberRef.current ?? 0
        updateValue(addStep(base, step ?? 1, -1))
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
        const nextValue = event.currentTarget.value.replace(/[^\d.-]/g, '')
        const parts = nextValue.split('.')
        const normalized = parts.length > 2 ? `${parts[0]}.${parts.slice(1).join('')}` : nextValue
        const hasLeadingMinus = normalized.startsWith('-')
        const withoutMinus = normalized.replace(/-/g, '')
        const sanitized = hasLeadingMinus ? `-${withoutMinus}` : withoutMinus

        // 先更新本地文本，中间态（空串、"-"、"1."）也能正常显示
        setLocalText(sanitized)

        // 仅在能解析出合法数值时才通知外部
        const parsed = parseValue(sanitized)
        if (parsed !== undefined) {
            onChange?.(clamp(parsed, min, max))
        }
    }

    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        setFocused(true)
        onFocus?.(event)
    }

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        setFocused(false)
        if (isControlled) {
            const parsed = parseValue(rawValue)
            if (parsed !== undefined) {
                const clamped = clamp(parsed, min, max)
                if (clamped !== parsed) {
                    onChange?.(clamped)
                }
            }
            // 受控模式显示值以 prop 为准回流：父组件在 onChange 中拒绝变更时，
            // 失焦后显示值与真实值不再脱节（valueProp 后续变化由上方同步 effect 兜底）
            setLocalText(parseRawValue(valueProp))
            onBlur?.(event)
            return
        }
        const parsed = parseValue(rawValue)
        if (parsed !== undefined) {
            const clamped = clamp(parsed, min, max)
            setLocalText(parseRawValue(clamped))
            if (clamped !== parsed) {
                onChange?.(clamped)
            }
        } else {
            // 失焦时清理无法解析的中间态文本
            setLocalText('')
        }
        onBlur?.(event)
    }

    const controls = hideControls ? null : (
        <div {...getStyles('section')}>
            <button
                {...getStyles('control')}
                type="button"
                disabled={disabled}
                data-direction="up"
                aria-label="Increment"
                onMouseDown={event => event.preventDefault()}
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
                onMouseDown={event => event.preventDefault()}
                onClick={decrement}
            >
                <span {...getStyles('icon')}>
                    <NumberInputChevronDownIcon />
                </span>
            </button>
        </div>
    )

    return (
        <InputWrapper
            {...getStyles('root')}
            label={label}
            description={description}
            error={error}
            required={required}
            withAsterisk={withAsterisk}
            inputId={inputId}
        >
            <InputBase
                {...getStyles('input')}
                component="input"
                ref={ref}
                id={inputId}
                type="text"
                inputMode="decimal"
                role="spinbutton"
                aria-valuenow={currentNumber ?? undefined}
                aria-valuemin={min}
                aria-valuemax={max}
                disabled={disabled}
                invalid={invalid}
                size={size}
                variant={variant}
                placeholder={placeholder}
                value={inputValue}
                // 解构后不再经 others 透传，显式保留原生 required 属性（表单校验/aria）
                required={required}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                onBlur={handleBlur}
                rightSection={controls}
                rightSectionWidth={hideControls ? undefined : 'var(--ni-control-width)'}
                {...others}
            />
        </InputWrapper>
    )
})

NumberInput.classes = classes
;(NumberInput as any).varsResolver = varsResolver
NumberInput.displayName = '@xiaoye-react/ui/NumberInput'

export namespace NumberInput {
    export type Props = NumberInputProps
    export type StylesNames = NumberInputStylesNames
    export type Factory = NumberInputFactory
    export type CssVariables = NumberInputCssVariables
}
