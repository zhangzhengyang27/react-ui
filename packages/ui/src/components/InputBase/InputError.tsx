import { Box, BoxProps, ElementProps, factory, Factory, useProps } from '../../core'
import classes from './InputBase.module.css'

export interface InputErrorProps extends BoxProps, ElementProps<'div'> {
    /** Error content */
    children?: React.ReactNode
}

export type InputErrorFactory = Factory<{
    props: InputErrorProps
    ref: HTMLDivElement
}>

const defaultProps = {} satisfies Partial<InputErrorProps>

export const InputError = factory<InputErrorFactory>((_props, ref) => {
    const props = useProps('InputError', defaultProps, _props)
    const { children, className, style, ...others } = props

    return (
        <Box
            component="div"
            ref={ref}
            className={[classes.error, className].filter(Boolean).join(' ')}
            style={style}
            {...others}
        >
            {children}
        </Box>
    )
})

InputError.displayName = '@react-ui/ui/InputError'
