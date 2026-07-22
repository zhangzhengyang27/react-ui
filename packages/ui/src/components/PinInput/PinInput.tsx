import { useId, useUncontrolled } from '@xiaoye-react/hooks'
import { useRef } from 'react'
import {
    BoxProps,
    createVarsResolver,
    ElementProps,
    factory,
    Factory,
    getFontSize,
    getSize,
    getSpacing,
    UISize,
    StylesApiProps,
    useProps,
    useStyles
} from '../../core'
import classes from './PinInput.module.css'

export type PinInputStylesNames = 'root' | 'input'

export type PinInputType = 'number' | 'alphanumeric'

export interface PinInputProps
    extends BoxProps,
        StylesApiProps<PinInputFactory>,
        ElementProps<'div', 'value' | 'defaultValue' | 'onChange'> {
    /** Number of input boxes */
    length?: number

    //** 受控值 */
    value?: string

    //** 非受控组件的初始值 */
    defaultValue?: string

    //** 值变化时调用 */
    onChange?: (value: string) => void

    /** Called when all inputs are filled */
    onComplete?: (value: string) => void

    /** Input type */
    type?: PinInputType

    /** If set, inputs are masked */
    mask?: boolean

    /** Placeholder character */
    placeholder?: string

    /** Controls size of inputs @default 'sm' */
    size?: UISize

    /** Gap between inputs */
    gap?: React.CSSProperties['gap']

    /** Name attribute passed to hidden input */
    name?: string

    /** Form attribute passed to hidden input */
    form?: string

    /** If set, inputs are disabled */
    disabled?: boolean

    /** If set, inputs are read-only */
    readOnly?: boolean

    /** If set, autocomplete is enabled on inputs */
    autoComplete?: string
}

export type PinInputFactory = Factory<{
    props: PinInputProps
    ref: HTMLDivElement
    stylesNames: PinInputStylesNames
}>

const defaultProps = {
    length: 4,
    type: 'alphanumeric',
    size: 'sm',
    gap: 'sm'
} satisfies Partial<PinInputProps>

const varsResolver = createVarsResolver<PinInputFactory>((theme, { size, gap }) => ({
    root: {
        '--pin-input-size': getSize(size, 'pin-input-size'),
        '--pin-input-fz': getFontSize(size),
        '--pin-input-gap': gap !== undefined ? getSpacing(gap) : undefined
    }
}))

const EMPTY_VALUE = ''

function getNextValue(value: string, type: PinInputType) {
    const char = value.slice(-1)
    if (!char) return EMPTY_VALUE

    if (type === 'number') {
        return /^\d$/.test(char) ? char : EMPTY_VALUE
    }

    return char
}

export const PinInput = factory<PinInputFactory>((_props, ref) => {
    const props = useProps('PinInput', defaultProps, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        length,
        value,
        defaultValue,
        onChange,
        onComplete,
        type,
        mask,
        placeholder,
        size,
        gap,
        name,
        form,
        disabled,
        readOnly,
        autoComplete,
        ...others
    } = props

    // 注意：不向 useUncontrolled 传 onChange —— 其非受控分支的 setter 内部会调用 onChange，
    // 而 updateValue 已显式调用 onChange?.()，若两处都传会导致每次输入 onChange 触发两次。
    // 此处以 updateValue 的显式调用作为唯一出口（受控模式下不会走到 setValues，行为一致）
    const [values, setUncontrolledValues] = useUncontrolled<string>({
        value,
        defaultValue,
        finalValue: ''
    })

    const valuesRef = useRef(values)

    const setValues = (nextValues: string) => {
        valuesRef.current = nextValues
        setUncontrolledValues(nextValues)
    }

    valuesRef.current = values

    const inputRefs = useRef<HTMLInputElement[]>([])
    const resolvedId = useId()
    const getStyles = useStyles<PinInputFactory>({
        name: 'PinInput',
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

    const updateValue = (nextValues: string) => {
        if (value === undefined) {
            setValues(nextValues)
        }
        onChange?.(nextValues)

        if (nextValues.length === length && !nextValues.split('').some(char => char === EMPTY_VALUE)) {
            onComplete?.(nextValues)
        }
    }

    const setInputValue = (index: number, nextValue: string) => {
        const currentValues = valuesRef.current
        const chars = Array.from({ length: length! }, (_, i) => currentValues[i] || EMPTY_VALUE)
        chars[index] = nextValue
        const nextValues = chars.join('')
        updateValue(nextValues)
    }

    const focusInput = (index: number) => {
        const input = inputRefs.current[index]
        if (input) {
            input.focus()
            input.select()
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        if (disabled || readOnly) return

        const nextValue = getNextValue(event.currentTarget.value, type!)
        setInputValue(index, nextValue)

        if (nextValue && index < length! - 1) {
            focusInput(index + 1)
        }
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (disabled || readOnly) return

        if (event.key === 'Backspace') {
            event.preventDefault()
            const currentValue = valuesRef.current[index]
            setInputValue(index, EMPTY_VALUE)

            if (!currentValue && index > 0) {
                focusInput(index - 1)
            }
        } else if (event.key === 'ArrowLeft' && index > 0) {
            event.preventDefault()
            focusInput(index - 1)
        } else if (event.key === 'ArrowRight' && index < length! - 1) {
            event.preventDefault()
            focusInput(index + 1)
        } else if (event.key === 'Delete') {
            event.preventDefault()
            setInputValue(index, EMPTY_VALUE)
        }
    }

    const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
        if (disabled || readOnly) return

        event.preventDefault()
        const pasted = event.clipboardData.getData('text')
        // 粘贴语义：用粘贴文本中的合法字符替换整个值，非法字符直接丢弃（不占位），截断到 length
        const validChars = Array.from(pasted)
            .map(char => getNextValue(char, type!))
            .filter(char => char !== EMPTY_VALUE)
            .slice(0, length!)

        const nextValues = validChars.join('')
        updateValue(nextValues)
        // 焦点落在最后一个已填字符上（原实现用 EMPTY_VALUE 空串做 replace 实为空操作，这里直接按合法字符数定位）
        focusInput(Math.min(validChars.length, length! - 1))
    }

    const handleFocus = (index: number) => {
        inputRefs.current[index]?.select()
    }

    const inputs = Array.from({ length: length! }, (_, index) => {
        const inputValue = values[index] || EMPTY_VALUE
        const inputId = `${resolvedId}-${index}`

        return (
            <input
                key={index}
                id={inputId}
                ref={el => {
                    if (el) inputRefs.current[index] = el
                }}
                type={type === 'number' ? 'tel' : 'text'}
                inputMode={type === 'number' ? 'numeric' : 'text'}
                maxLength={1}
                disabled={disabled}
                readOnly={readOnly}
                value={inputValue}
                placeholder={placeholder}
                autoComplete={autoComplete}
                aria-label={`第 ${index + 1} 位,共 ${length} 位`}
                data-masked={mask || undefined}
                {...getStyles('input')}
                onChange={event => handleChange(event, index)}
                onKeyDown={event => handleKeyDown(event, index)}
                onPaste={handlePaste}
                onFocus={() => handleFocus(index)}
            />
        )
    })

    return (
        <div ref={ref} role="group" {...getStyles('root')} {...others}>
            {inputs}
            {name && <input type="hidden" name={name} form={form} value={values} readOnly />}
        </div>
    )
})

PinInput.classes = classes
;(PinInput as any).varsResolver = varsResolver
PinInput.displayName = '@xiaoye-react/ui/PinInput'

export namespace PinInput {
    export type Props = PinInputProps
    export type StylesNames = PinInputStylesNames
    export type Factory = PinInputFactory
}
