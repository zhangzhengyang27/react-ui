import { Box, BoxProps, ElementProps, factory, Factory, useProps } from '../../core'
import classes from './InputBase.module.css'

export interface InputDescriptionProps extends BoxProps, ElementProps<'div'> {
    /** Description content */
    children?: React.ReactNode
}

export type InputDescriptionFactory = Factory<{
    props: InputDescriptionProps
    ref: HTMLDivElement
}>

const defaultProps = {} satisfies Partial<InputDescriptionProps>

export const InputDescription = factory<InputDescriptionFactory>((_props, ref) => {
    const props = useProps('InputDescription', defaultProps, _props)
    const { children, className, style, ...others } = props

    return (
        <Box
            component="div"
            ref={ref}
            className={[classes.description, className].filter(Boolean).join(' ')}
            style={style}
            {...others}
        >
            {children}
        </Box>
    )
})

InputDescription.displayName = '@react-ui/ui/InputDescription'
