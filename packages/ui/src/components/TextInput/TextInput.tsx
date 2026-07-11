import { useId } from '@react-ui/hooks'
import { factory, Factory, StylesApiProps, useProps, useStyles } from '../../core'
import { InputBase, InputBaseProps } from '../InputBase'
import { InputWrapper } from '../Input'
import classes from './TextInput.module.css'

export type TextInputStylesNames = 'root'

export interface TextInputProps
    extends Omit<
            InputBaseProps,
            'classNames' | 'styles' | 'unstyled' | 'vars' | 'attributes' | 'labelProps' | 'descriptionProps' | 'errorProps'
        >,
        StylesApiProps<TextInputFactory> {
    /** Label rendered above the input */
    label?: React.ReactNode

    /** Description rendered below the label */
    description?: React.ReactNode

    /** Error rendered below the input */
    error?: React.ReactNode

    /** If set, required asterisk is added to the label */
    required?: boolean

    /** If set, required asterisk is added to the label even if `required` is not set */
    withAsterisk?: boolean

    /** Props passed to the label element */
    labelProps?: React.ComponentProps<'label'>

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
TextInput.displayName = '@react-ui/ui/TextInput'

export namespace TextInput {
    export type Props = TextInputProps
    export type StylesNames = TextInputStylesNames
    export type Factory = TextInputFactory
}
