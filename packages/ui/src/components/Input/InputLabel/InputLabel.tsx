import { useContext } from 'react'
import {
    Box,
    BoxProps,
    createVarsResolver,
    ElementProps,
    factory,
    Factory,
    getFontSize,
    UIFontSize,
    StylesApiProps,
    useProps,
    useStyles
} from '../../../core'
import { InputWrapperContext } from '../InputWrapper.context'
import classes from '../Input.module.css'

export type InputLabelStylesNames = 'label' | 'required'
export type InputLabelCssVariables = {
    label: '--input-asterisk-color' | '--input-label-size'
}

export interface InputLabelProps
    extends BoxProps, StylesApiProps<InputLabelFactory>, ElementProps<'label'> {
    __staticSelector?: string
    required?: boolean
    size?: UIFontSize
    labelElement?: 'label' | 'div'
}

export type InputLabelFactory = Factory<{
    props: InputLabelProps
    ref: HTMLLabelElement
    stylesNames: InputLabelStylesNames
    vars: InputLabelCssVariables
}>

const defaultProps = {
    labelElement: 'label'
} satisfies Partial<InputLabelProps>

const varsResolver = createVarsResolver<InputLabelFactory>((_, { size }) => ({
    label: {
        '--input-label-size': getFontSize(size),
        '--input-asterisk-color': undefined
    }
}))

export const InputLabel = factory<InputLabelFactory>((_props, ref) => {
    const props = useProps('InputLabel', defaultProps, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        labelElement,
        required,
        htmlFor,
        onMouseDown,
        children,
        __staticSelector,
        mod,
        attributes,
        ...others
    } = props

    const _getStyles = useStyles<InputLabelFactory>({
        name: ['InputWrapper', __staticSelector],
        props,
        classes,
        className,
        style,
        classNames,
        styles,
        unstyled,
        attributes,
        rootSelector: 'label',
        vars,
        varsResolver
    })

    const ctx = useContext(InputWrapperContext)
    const getStyles = ctx?.getStyles || _getStyles

    return (
        <Box
            {...getStyles('label', ctx?.getStyles ? { className, style } : undefined)}
            component={labelElement as 'label'}
            htmlFor={labelElement === 'label' ? htmlFor : undefined}
            mod={[{ required }, mod]}
            onMouseDown={(event) => {
                onMouseDown?.(event as React.MouseEvent<HTMLLabelElement, MouseEvent>)
                if (!event.defaultPrevented && event.detail > 1) {
                    event.preventDefault()
                }
            }}
            {...others}
            ref={ref}
        >
            {children}
            {required && (
                <span {...getStyles('required')} aria-hidden>
                    {' *'}
                </span>
            )}
        </Box>
    )
})

InputLabel.classes = classes
InputLabel.varsResolver = varsResolver
InputLabel.displayName = '@xiaoye-react/ui/InputLabel'
