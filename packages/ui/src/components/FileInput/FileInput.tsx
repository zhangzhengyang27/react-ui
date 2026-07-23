import { useRef } from 'react'
import { useId, useUncontrolled } from '@xiaoye-react/hooks'
import { factory, Factory, StylesApiProps, useProps, useStyles } from '../../core'
import { CloseButton } from '../CloseButton'
import { InputBase, InputBaseProps } from '../InputBase'
import { InputWrapper } from '../Input'
import classes from './FileInput.module.css'

export type FileInputStylesNames = 'root'

export interface FileInputProps
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
            | 'labelProps'
            | 'descriptionProps'
            | 'errorProps'
        >,
        StylesApiProps<FileInputFactory> {
    //** 受控值 */
    value?: File | File[] | null

    /** Uncontrolled default value */
    defaultValue?: File | File[] | null

    /** Called when selected files change */
    onChange?: (payload: File | File[] | null) => void

    /** If set, multiple files can be selected @default false */
    multiple?: boolean

    /** File input accept attribute */
    accept?: string

    /** Input name attribute */
    name?: string

    /** Input form attribute */
    form?: string

    /** Capture attribute */
    capture?: boolean | 'user' | 'environment'

    /** If set, a clear button is displayed when a file is selected @default false */
    clearable?: boolean

    /** Text displayed when no file is selected */
    placeholder?: string

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

export type FileInputFactory = Factory<{
    props: FileInputProps
    ref: HTMLButtonElement
    stylesNames: FileInputStylesNames
}>

const defaultProps = {
    clearable: false
} satisfies Partial<FileInputProps>

function getFileNames(value: File | File[] | null): string {
    if (!value) {
        return ''
    }

    if (Array.isArray(value)) {
        return value.map(file => file.name).join(', ')
    }

    return value.name
}

export const FileInput = factory<FileInputFactory>((_props, ref) => {
    const props = useProps('FileInput', defaultProps, _props)
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
        multiple,
        accept,
        name,
        form,
        capture,
        clearable,
        placeholder,
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

    const getStyles = useStyles<FileInputFactory>({
        name: 'FileInput',
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

    const [value, setValue] = useUncontrolled<File | File[] | null>({
        value: valueProp,
        defaultValue,
        finalValue: null,
        onChange
    })

    const inputId = useId(id)
    const inputRef = useRef<HTMLInputElement>(null)
    const hasWrapper = label || description || error
    const hasValue = !!value

    const handleClick = () => {
        inputRef.current?.click()
    }

    const handleClear = () => {
        setValue(null)
        if (inputRef.current) {
            inputRef.current.value = ''
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = event.currentTarget

        if (!files || files.length === 0) {
            setValue(null)
            return
        }

        if (multiple) {
            setValue(Array.from(files))
        } else {
            setValue(files[0])
        }
    }

    const clearButton = clearable && hasValue && (
        <CloseButton size="sm" variant="transparent" aria-label="Clear" onClick={handleClear} />
    )

    const input = (
        <>
            <input
                type="file"
                ref={inputRef}
                style={{ display: 'none' }}
                multiple={multiple}
                accept={accept}
                name={name}
                form={form}
                capture={capture}
                onChange={handleChange}
                id={inputId}
            />
            <InputBase
                {...others}
                component="button"
                type="button"
                ref={ref as any}
                value={undefined}
                onClick={handleClick}
                rightSection={clearButton}
                wrapperProps={hasWrapper ? wrapperProps : { ...getStyles('root'), ...wrapperProps }}
            >
                {getFileNames(value) || placeholder}
            </InputBase>
        </>
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

FileInput.classes = classes
FileInput.displayName = '@xiaoye-react/ui/FileInput'

export namespace FileInput {
    export type Props = FileInputProps
    export type StylesNames = FileInputStylesNames
    export type Factory = FileInputFactory
}
