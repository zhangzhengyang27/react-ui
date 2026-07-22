import { Fragment } from 'react'
import { useId } from '@xiaoye-react/hooks'
import {
    Box,
    BoxProps,
    createVarsResolver,
    DataAttributes,
    ElementProps,
    factory,
    Factory,
    getFontSize,
    UIFontSize,
    rem,
    StylesApiProps,
    useProps,
    useStyles
} from '../../../core'
import {
    InputDescription,
    InputDescriptionCssVariables,
    InputDescriptionProps,
    InputDescriptionStylesNames
} from '../InputDescription/InputDescription'
import {
    InputError,
    InputErrorCssVariables,
    InputErrorProps,
    InputErrorStylesNames
} from '../InputError/InputError'
import {
    InputLabel,
    InputLabelCssVariables,
    InputLabelProps,
    InputLabelStylesNames
} from '../InputLabel/InputLabel'
import {
    InputSuccess,
    InputSuccessCssVariables,
    InputSuccessProps,
    InputSuccessStylesNames
} from '../InputSuccess/InputSuccess'
import { InputWrapperContext } from '../InputWrapper.context'
import classes from '../Input.module.css'

function getInputOffsets(
    inputWrapperOrder: ('label' | 'input' | 'description' | 'error')[],
    { hasDescription, hasError }: { hasDescription: boolean; hasError: boolean }
) {
    const inputIndex = inputWrapperOrder.findIndex((part) => part === 'input')
    const aboveInput = inputWrapperOrder.slice(0, inputIndex)
    const belowInput = inputWrapperOrder.slice(inputIndex + 1)
    const offsetTop =
        (hasDescription && aboveInput.includes('description')) ||
        (hasError && aboveInput.includes('error'))
    const offsetBottom =
        (hasDescription && belowInput.includes('description')) ||
        (hasError && belowInput.includes('error'))
    return { offsetBottom, offsetTop }
}

export type InputWrapperCssVariables = InputLabelCssVariables &
    InputErrorCssVariables &
    InputSuccessCssVariables &
    InputDescriptionCssVariables

export type InputWrapperStylesNames =
    | 'root'
    | InputLabelStylesNames
    | InputDescriptionStylesNames
    | InputErrorStylesNames
    | InputSuccessStylesNames

export interface __InputWrapperProps {
    label?: React.ReactNode
    description?: React.ReactNode
    error?: React.ReactNode
    success?: React.ReactNode
    required?: boolean
    withAsterisk?: boolean
    labelProps?: InputLabelProps
    descriptionProps?: InputDescriptionProps
    errorProps?: InputErrorProps
    successProps?: InputSuccessProps
    inputContainer?: (children: React.ReactNode) => React.ReactNode
    inputWrapperOrder?: ('label' | 'input' | 'description' | 'error')[]
}

export interface InputWrapperProps
    extends __InputWrapperProps,
        BoxProps,
        StylesApiProps<InputWrapperFactory>,
        ElementProps<'div'> {
    __staticSelector?: string
    __stylesApiProps?: Record<string, any>
    id?: string
    inputId?: string
    size?: UIFontSize
    labelElement?: 'label' | 'div'
}

export type InputWrapperFactory = Factory<{
    props: InputWrapperProps
    ref: HTMLDivElement
    stylesNames: InputWrapperStylesNames
    vars: InputWrapperCssVariables
}>

const defaultProps = {
    labelElement: 'label',
    inputContainer: (children: React.ReactNode) => children,
    inputWrapperOrder: ['label', 'description', 'input', 'error']
} satisfies Partial<InputWrapperProps>

const varsResolver = createVarsResolver<InputWrapperFactory>((_, { size }) => ({
    label: {
        '--input-label-size': getFontSize(size),
        '--input-asterisk-color': undefined
    },

    error: {
        '--input-error-size': size === undefined ? undefined : `calc(${getFontSize(size)} - ${rem(2)})`
    },

    success: {
        '--input-success-size':
            size === undefined ? undefined : `calc(${getFontSize(size)} - ${rem(2)})`
    },

    description: {
        '--input-description-size':
            size === undefined ? undefined : `calc(${getFontSize(size)} - ${rem(2)})`
    }
}))

export const InputWrapper = factory<InputWrapperFactory>((_props, ref) => {
    const props = useProps('InputWrapper', defaultProps, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        size,
        variant,
        __staticSelector,
        inputContainer,
        inputWrapperOrder,
        label,
        error,
        success,
        description,
        labelProps,
        descriptionProps,
        errorProps,
        successProps,
        labelElement,
        children,
        withAsterisk,
        id,
        inputId: inputIdProp,
        required,
        __stylesApiProps,
        mod,
        attributes,
        ...others
    } = props

    const getStyles = useStyles<InputWrapperFactory>({
        name: ['InputWrapper', __staticSelector],
        props: __stylesApiProps || props,
        classes,
        className,
        style,
        classNames,
        styles,
        unstyled,
        attributes,
        vars,
        varsResolver
    })

    const sharedProps = {
        size,
        variant,
        __staticSelector
    }

    const idBase = useId(id)
    const isRequired = typeof withAsterisk === 'boolean' ? withAsterisk : required
    const errorId = errorProps?.id || `${idBase}-error`
    const successId = successProps?.id || `${idBase}-success`
    const descriptionId = descriptionProps?.id || `${idBase}-description`
    const inputId = inputIdProp || idBase
    const hasError = !!error && typeof error !== 'boolean'
    const hasSuccess = !!success && typeof success !== 'boolean' && !error
    const hasDescription = !!description
    const errorRendered = hasError && inputWrapperOrder.includes('error')
    const successRendered = hasSuccess && inputWrapperOrder.includes('error')
    const descriptionRendered = hasDescription && inputWrapperOrder.includes('description')
    const _describedBy = `${errorRendered ? errorId : ''} ${successRendered ? successId : ''} ${
        descriptionRendered ? descriptionId : ''
    }`
    const describedBy = _describedBy.trim().length > 0 ? _describedBy.trim() : undefined
    const labelId = labelProps?.id || `${idBase}-label`

    const _label = label && (
        <InputLabel
            key="label"
            labelElement={labelElement}
            id={labelId}
            htmlFor={inputId}
            required={isRequired}
            {...sharedProps}
            {...labelProps}
        >
            {label}
        </InputLabel>
    )

    const _description = hasDescription && (
        <InputDescription
            key="description"
            {...descriptionProps}
            {...sharedProps}
            size={descriptionProps?.size || sharedProps.size}
            id={descriptionProps?.id || descriptionId}
        >
            {description}
        </InputDescription>
    )

    const _input = <Fragment key="input">{inputContainer(children)}</Fragment>

    const _error = hasError && (
        <InputError
            {...errorProps}
            {...sharedProps}
            size={errorProps?.size || sharedProps.size}
            key="error"
            id={errorProps?.id || errorId}
        >
            {error}
        </InputError>
    )

    const _success = hasSuccess && (
        <InputSuccess
            {...successProps}
            {...sharedProps}
            size={successProps?.size || sharedProps.size}
            key="success"
            id={successProps?.id || successId}
        >
            {success}
        </InputSuccess>
    )

    const content = inputWrapperOrder.map((part) => {
        switch (part) {
            case 'label':
                return _label
            case 'input':
                return _input
            case 'description':
                return _description
            case 'error':
                return _error || _success
            default:
                return null
        }
    })

    return (
        <InputWrapperContext.Provider
            value={{
                getStyles,
                describedBy,
                inputId,
                labelId,
                ...getInputOffsets(inputWrapperOrder, {
                    hasDescription,
                    hasError: hasError || hasSuccess
                })
            }}
        >
            <Box
                variant={variant}
                size={size}
                mod={[{ error: !!error, success: !!success && !error }, mod]}
                id={labelElement === 'label' ? undefined : id}
                {...getStyles('root')}
                {...others}
                ref={ref}
            >
                {content}
            </Box>
        </InputWrapperContext.Provider>
    )
})

InputWrapper.classes = classes
InputWrapper.varsResolver = varsResolver
InputWrapper.displayName = '@xiaoye-react/ui/InputWrapper'
