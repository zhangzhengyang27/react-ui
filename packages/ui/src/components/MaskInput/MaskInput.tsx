import { useId, useUncontrolled } from '@react-ui/hooks'
import { factory, Factory, StylesApiProps, useProps, useStyles } from '../../core'
import { InputBase, InputBaseProps, InputWrapper } from '../InputBase'
import classes from './MaskInput.module.css'

export type MaskInputStylesNames = 'root'

export interface MaskInputProps
    extends Omit<
            InputBaseProps,
            | 'value'
            | 'defaultValue'
            | 'onChange'
            | 'classNames'
            | 'styles'
            | 'unstyled'
            | 'vars'
            | 'attributes'
            | 'component'
        >,
        StylesApiProps<MaskInputFactory> {
    /** Mask pattern, use `#` for any character */
    mask: string

    /** Character used to fill empty mask positions @default '_' */
    placeholderChar?: string

    /** Controlled value */
    value?: string

    /** Uncontrolled default value */
    defaultValue?: string

    /** Called when value changes */
    onChange?: (value: string) => void

    /** Label rendered above the input */
    label?: React.ReactNode

    /** Description rendered below the label */
    description?: React.ReactNode

    /** Error rendered below the input */
    error?: React.ReactNode

    /** If set, required asterisk is added to the label */
    required?: boolean

    /** Props passed to the label element */
    labelProps?: React.ComponentProps<'label'>

    /** Props passed to the description element */
    descriptionProps?: React.ComponentProps<'div'>

    /** Props passed to the error element */
    errorProps?: React.ComponentProps<'div'>
}

export type MaskInputFactory = Factory<{
    props: MaskInputProps
    ref: HTMLInputElement
    stylesNames: MaskInputStylesNames
}>

const defaultProps = {
    placeholderChar: '_'
} satisfies Partial<MaskInputProps>

function stripMask(value: string, mask: string): string {
    const maskChars = new Set(mask.split('').filter(char => char !== '#'))
    return value
        .split('')
        .filter(char => !maskChars.has(char))
        .join('')
}

function applyMask(value: string, mask: string, placeholderChar: string): string {
    const raw = stripMask(value, mask)
    let result = ''
    let rawIndex = 0

    for (let i = 0; i < mask.length; i++) {
        const maskChar = mask[i]

        if (maskChar === '#') {
            if (rawIndex < raw.length) {
                result += raw[rawIndex]
                rawIndex += 1
            } else {
                result += placeholderChar
            }
        } else {
            result += maskChar
            if (rawIndex < raw.length && raw[rawIndex] === maskChar) {
                rawIndex += 1
            }
        }
    }

    return result
}

function getRawValue(masked: string, mask: string, placeholderChar: string): string {
    let result = ''
    let valueIndex = 0

    for (let i = 0; i < mask.length; i++) {
        if (valueIndex >= masked.length) {
            break
        }

        const maskChar = mask[i]

        if (maskChar === '#') {
            const char = masked[valueIndex]
            if (char !== placeholderChar) {
                result += char
            }
            valueIndex += 1
        } else if (masked[valueIndex] === maskChar) {
            valueIndex += 1
        }
    }

    return result
}

export const MaskInput = factory<MaskInputFactory>((_props, ref) => {
    const props = useProps('MaskInput', defaultProps, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        mask,
        placeholderChar,
        value: valueProp,
        defaultValue,
        onChange,
        label,
        description,
        error,
        required,
        labelProps,
        descriptionProps,
        errorProps,
        wrapperProps,
        id,
        ...others
    } = props

    const getStyles = useStyles<MaskInputFactory>({
        name: 'MaskInput',
        classes,
        props,
        className,
        style,
        classNames,
        styles,
        unstyled,
        vars,
        rootSelector: 'root'
    })

    const [value, setValue] = useUncontrolled<string>({
        value: valueProp,
        defaultValue,
        finalValue: '',
        onChange
    })

    const inputId = useId(id)
    const hasWrapper = label || description || error
    const maskedValue = applyMask(value, mask, placeholderChar!)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const raw = getRawValue(event.currentTarget.value, mask, placeholderChar!)
        setValue(raw)
    }

    const input = (
        <InputBase
            {...others}
            id={inputId}
            ref={ref}
            value={maskedValue}
            onChange={handleChange}
            wrapperProps={hasWrapper ? wrapperProps : { ...getStyles('root'), ...wrapperProps }}
        />
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

MaskInput.classes = classes
MaskInput.displayName = '@react-ui/ui/MaskInput'

export namespace MaskInput {
    export type Props = MaskInputProps
    export type StylesNames = MaskInputStylesNames
    export type Factory = MaskInputFactory
}
