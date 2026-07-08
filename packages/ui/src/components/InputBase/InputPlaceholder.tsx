import { Box, BoxProps, ElementProps, factory, Factory, useProps } from '../../core'
import classes from './InputBase.module.css'

export interface InputPlaceholderProps extends BoxProps, ElementProps<'div'> {
    /** Placeholder content */
    children?: React.ReactNode
}

export type InputPlaceholderFactory = Factory<{
    props: InputPlaceholderProps
    ref: HTMLDivElement
}>

const defaultProps = {} satisfies Partial<InputPlaceholderProps>

export const InputPlaceholder = factory<InputPlaceholderFactory>((_props, ref) => {
    const props = useProps('InputPlaceholder', defaultProps, _props)
    const { children, className, style, ...others } = props

    return (
        <Box
            component="div"
            ref={ref}
            className={[classes.placeholder, className].filter(Boolean).join(' ')}
            style={style}
            {...others}
        >
            {children}
        </Box>
    )
})

InputPlaceholder.displayName = '@react-ui/ui/InputPlaceholder'
