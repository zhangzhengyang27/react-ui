import { Box, BoxProps, ElementProps, factory, Factory, useProps } from '../../core'
import classes from './InputBase.module.css'

export interface InputWrapperProps extends BoxProps, ElementProps<'div'> {
    /** Content */
    children?: React.ReactNode

    /** Label rendered above the input */
    label?: React.ReactNode

    /** Description rendered below the label */
    description?: React.ReactNode

    /** Error rendered below the input */
    error?: React.ReactNode

    /** If set, required asterisk is added to the label */
    required?: boolean

    /** If set, required asterisk is displayed next to the label. Overrides `required` prop. Does not add required attribute to the input. */
    withAsterisk?: boolean

    /** Id of the target input */
    inputId?: string

    /** Props passed to the label element */
    labelProps?: React.ComponentProps<'label'>

    /** Props passed to the description element */
    descriptionProps?: React.ComponentProps<'div'>

    /** Props passed to the error element */
    errorProps?: React.ComponentProps<'div'>
}

export type InputWrapperFactory = Factory<{
    props: InputWrapperProps
    ref: HTMLDivElement
}>

const defaultProps = {} satisfies Partial<InputWrapperProps>

export const InputWrapper = factory<InputWrapperFactory>((_props, ref) => {
    const props = useProps('InputWrapper', defaultProps, _props)
    const {
        children,
        label,
        description,
        error,
        required,
        withAsterisk,
        inputId,
        labelProps,
        descriptionProps,
        errorProps,
        className,
        style,
        ...others
    } = props

    const isRequired = typeof withAsterisk === 'boolean' ? withAsterisk : required

    return (
        <Box
            ref={ref}
            className={[classes.inputWrapper, className].filter(Boolean).join(' ')}
            style={style}
            {...others}
        >
            {label && (
                <label
                    {...labelProps}
                    htmlFor={inputId}
                    className={[classes.label, labelProps?.className].filter(Boolean).join(' ')}
                >
                    {label}
                    {isRequired && <span className={classes.required}>*</span>}
                </label>
            )}
            {description && (
                <div
                    {...descriptionProps}
                    className={[classes.description, descriptionProps?.className].filter(Boolean).join(' ')}
                >
                    {description}
                </div>
            )}
            {children}
            {error && (
                <div {...errorProps} className={[classes.error, errorProps?.className].filter(Boolean).join(' ')}>
                    {error}
                </div>
            )}
        </Box>
    )
})

InputWrapper.displayName = '@react-ui/ui/InputWrapper'
