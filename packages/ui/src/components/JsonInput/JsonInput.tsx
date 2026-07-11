import { useRef } from 'react'
import { useId, useUncontrolled } from '@react-ui/hooks'
import { factory, Factory, StylesApiProps, useProps, useStyles } from '../../core'
import { InputBase, InputBaseProps } from '../InputBase'
import { InputWrapper } from '../Input'
import classes from './JsonInput.module.css'

export type JsonInputStylesNames = 'root'

export interface JsonInputProps
    extends Omit<
            InputBaseProps,
            | 'classNames'
            | 'styles'
            | 'unstyled'
            | 'vars'
            | 'attributes'
            | 'component'
            | 'value'
            | 'defaultValue'
            | 'onChange'
            | 'labelProps'
            | 'descriptionProps'
            | 'errorProps'
        >,
        StylesApiProps<JsonInputFactory> {
    /** Controlled value */
    value?: string

    /** Uncontrolled default value */
    defaultValue?: string

    /** Called when value changes */
    onChange?: (value: string) => void

    /** If set, value is formatted on blur @default false */
    formatOnBlur?: boolean

    /** Space parameter passed to JSON.stringify when formatting */
    serialization?: {
        space?: number | string
    }

    /** Number of visible text lines */
    rows?: number

    /** Minimum number of visible lines */
    minRows?: number

    /** Maximum number of visible lines */
    maxRows?: number

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

export type JsonInputFactory = Factory<{
    props: JsonInputProps
    ref: HTMLTextAreaElement
    stylesNames: JsonInputStylesNames
}>

const defaultProps = {
    formatOnBlur: false
} satisfies Partial<JsonInputProps>

function formatJson(value: string, space?: number | string): string {
    try {
        return JSON.stringify(JSON.parse(value), null, space === undefined ? 2 : space)
    } catch {
        return value
    }
}

export const JsonInput = factory<JsonInputFactory>((_props, ref) => {
    const props = useProps('JsonInput', defaultProps, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        value: valueProp,
        defaultValue,
        onChange,
        formatOnBlur,
        serialization,
        rows,
        minRows,
        maxRows,
        wrapperProps,
        onBlur,
        label,
        description,
        error,
        required,
        labelProps,
        descriptionProps,
        errorProps,
        id,
        ...others
    } = props

    const getStyles = useStyles<JsonInputFactory>({
        name: 'JsonInput',
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

    const valueRef = useRef(value)
    valueRef.current = value

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(event.currentTarget.value)
    }

    const handleBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
        if (formatOnBlur) {
            setValue(formatJson(valueRef.current, serialization?.space))
        }
        onBlur?.(event as unknown as React.FocusEvent<HTMLInputElement>)
    }

    const inputId = useId(id)
    const hasWrapper = label || description || error

    const inputBaseProps = {
        ...others,
        component: 'textarea',
        multiline: true,
        id: inputId,
        rows,
        value,
        onChange: handleChange,
        onBlur: handleBlur,
        wrapperProps: hasWrapper ? wrapperProps : { ...getStyles('root'), ...wrapperProps }
    } as any

    const input = <InputBase {...inputBaseProps} ref={ref} />

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

JsonInput.classes = classes
JsonInput.displayName = '@react-ui/ui/JsonInput'

export namespace JsonInput {
    export type Props = JsonInputProps
    export type StylesNames = JsonInputStylesNames
    export type Factory = JsonInputFactory
}
