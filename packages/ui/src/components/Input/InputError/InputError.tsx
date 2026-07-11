import { useContext } from 'react'
import {
    Box,
    BoxProps,
    createVarsResolver,
    ElementProps,
    factory,
    Factory,
    getFontSize,
    MantineFontSize,
    rem,
    StylesApiProps,
    useProps,
    useStyles
} from '../../../core'
import { InputWrapperContext } from '../InputWrapper.context'
import classes from '../Input.module.css'

export type InputErrorStylesNames = 'error'
export type InputErrorCssVariables = {
    error: '--input-error-size'
}

export interface InputErrorProps
    extends BoxProps, StylesApiProps<InputErrorFactory>, ElementProps<'div'> {
    __staticSelector?: string
    __inheritStyles?: boolean
    size?: MantineFontSize
}

export type InputErrorFactory = Factory<{
    props: InputErrorProps
    ref: HTMLParagraphElement
    stylesNames: InputErrorStylesNames
    vars: InputErrorCssVariables
}>

const varsResolver = createVarsResolver<InputErrorFactory>((_, { size }) => ({
    error: {
        '--input-error-size': size === undefined ? undefined : `calc(${getFontSize(size)} - ${rem(2)})`
    }
}))

export const InputError = factory<InputErrorFactory>((_props, ref) => {
    const props = useProps('InputError', null, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        attributes,
        __staticSelector,
        __inheritStyles = true,
        ...others
    } = props

    const _getStyles = useStyles<InputErrorFactory>({
        name: ['InputWrapper', __staticSelector],
        props,
        classes,
        className,
        style,
        classNames,
        styles,
        unstyled,
        attributes,
        rootSelector: 'error',
        vars,
        varsResolver
    })

    const ctx = useContext(InputWrapperContext)
    const getStyles = (__inheritStyles && ctx?.getStyles) || _getStyles

    return (
        <Box
            component="p"
            {...getStyles('error', ctx?.getStyles ? { className, style } : undefined)}
            {...others}
            ref={ref}
        />
    )
})

InputError.classes = classes
InputError.varsResolver = varsResolver
InputError.displayName = '@react-ui/ui/InputError'
