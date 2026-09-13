import { useRef } from 'react'
import { useId, useUncontrolled } from '@xiaoye-react/hooks'
import { factory, Factory, StylesApiProps, useProps, useStyles } from '../../core'
import { InputBase, InputBaseProps } from '../InputBase'
import { InputWrapper } from '../Input'
import classes from './JsonInput.module.css'

export type JsonInputStylesNames = 'root' | 'fieldSizing'

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
            | 'onBlur'
            | 'labelProps'
            | 'descriptionProps'
            | 'errorProps'
        >,
        StylesApiProps<JsonInputFactory> {
    //** 受控值 */
    value?: string

    /** Uncontrolled default value */
    defaultValue?: string

    //** 值变化时调用 */
    onChange?: (value: string) => void

    /** 失焦时调用（JsonInput 渲染 textarea，事件类型为 HTMLTextAreaElement） */
    onBlur?: React.FocusEventHandler<HTMLTextAreaElement>

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

    //** 渲染在输入框上方的标签 */
    label?: React.ReactNode

    //** 渲染在标签下方的描述 */
    description?: React.ReactNode

    //** 渲染在输入框下方的错误 */
    error?: React.ReactNode

    //** 如果设置，则会在标签上添加必填星号 */
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
        onBlur?.(event)
    }

    const inputId = useId(id)
    const hasWrapper = label || description || error
    const autosize = minRows !== undefined || maxRows !== undefined

    const inputBaseProps = {
        ...others,
        component: 'textarea',
        multiline: true,
        id: inputId,
        // 与 Textarea 相同的 autosize 语义（见 Textarea.tsx 注释）
        rows: autosize ? (minRows ?? rows) : rows,
        __vars: {
            ...(minRows !== undefined ? { '--textarea-min-rows': String(minRows) } : null),
            ...(maxRows !== undefined ? { '--textarea-max-rows': String(maxRows) } : null)
        },
        ...getStyles(autosize ? 'fieldSizing' : 'root', { classNames, styles }),
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
JsonInput.displayName = '@xiaoye-react/ui/JsonInput'

export namespace JsonInput {
    export type Props = JsonInputProps
    export type StylesNames = JsonInputStylesNames
    export type Factory = JsonInputFactory
}
