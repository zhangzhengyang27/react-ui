import { useId } from '@xiaoye-react/hooks'
import { factory, Factory, StylesApiProps, useProps, useStyles } from '../../core'
import { InputBase, InputBaseProps, InputBaseStylesNames } from '../InputBase'
import { InputWrapper } from '../Input'
import classes from './TextInput.module.css'

export type TextInputStylesNames = 'root' | InputBaseStylesNames

export interface TextInputProps
    extends Omit<
            InputBaseProps,
            'classNames' | 'styles' | 'unstyled' | 'vars' | 'attributes' | 'descriptionProps' | 'errorProps'
        >,
        StylesApiProps<TextInputFactory> {
    /** 渲染在输入框上方的标签 */
    label?: React.ReactNode

    /** 渲染在标签下方的描述 */
    description?: React.ReactNode

    /** 渲染在输入框下方的错误 */
    error?: React.ReactNode

    /** 如果设置，则会在标签上添加必填星号 */
    required?: boolean

    /** If set, required asterisk is added to the label even if `required` is not set */
    withAsterisk?: boolean

    /** Props passed to the description element */
    descriptionProps?: React.ComponentProps<'div'>

    /** Props passed to the error element */
    errorProps?: React.ComponentProps<'div'>
}

export type TextInputFactory = Factory<{
    props: TextInputProps
    ref: HTMLInputElement
    stylesNames: TextInputStylesNames
}>

const defaultProps = {} satisfies Partial<TextInputProps>

export const TextInput = factory<TextInputFactory>((_props, ref) => {
    const props = useProps('TextInput', defaultProps, _props)
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
        labelProps,
        descriptionProps,
        errorProps,
        wrapperProps,
        id,
        ...others
    } = props

    const getStyles = useStyles<TextInputFactory>({
        name: 'TextInput',
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

    const inputId = useId(id)
    const hasWrapper = label || description || error

    const input = (
        <InputBase
            {...others}
            id={inputId}
            ref={ref}
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
            withAsterisk={withAsterisk}
            inputId={inputId}
            labelProps={labelProps}
            descriptionProps={descriptionProps}
            errorProps={errorProps}
        >
            {input}
        </InputWrapper>
    )
})

TextInput.classes = classes
TextInput.displayName = '@xiaoye-react/ui/TextInput'

export namespace TextInput {
    export type Props = TextInputProps
    export type StylesNames = TextInputStylesNames
    export type Factory = TextInputFactory
}
