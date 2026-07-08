import { Box, BoxProps, ElementProps, factory, Factory, useProps } from '../../core'
import classes from './InputBase.module.css'

export interface InputLabelProps extends BoxProps, ElementProps<'label'> {
    /** Label content */
    children?: React.ReactNode

    /** If set, required asterisk is added */
    required?: boolean
}

export type InputLabelFactory = Factory<{
    props: InputLabelProps
    ref: HTMLLabelElement
}>

const defaultProps = {} satisfies Partial<InputLabelProps>

export const InputLabel = factory<InputLabelFactory>((_props, ref) => {
    const props = useProps('InputLabel', defaultProps, _props)
    const { children, required, className, style, ...others } = props

    return (
        <Box
            component="label"
            ref={ref}
            className={[classes.label, className].filter(Boolean).join(' ')}
            style={style}
            {...others}
        >
            {children}
            {required && <span className={classes.required}>*</span>}
        </Box>
    )
})

InputLabel.displayName = '@react-ui/ui/InputLabel'
