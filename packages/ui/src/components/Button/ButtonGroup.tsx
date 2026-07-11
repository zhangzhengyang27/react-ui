import { Box, BoxProps, ElementProps, factory, Factory, useProps } from '../../core'
import classes from './Button.module.css'

export interface ButtonGroupProps extends BoxProps, ElementProps<'div'> {
    /** Group orientation @default 'horizontal' */
    orientation?: 'horizontal' | 'vertical'
}

export type ButtonGroupFactory = Factory<{
    props: ButtonGroupProps
    ref: HTMLDivElement
    compound: true
}>

const defaultProps = {
    orientation: 'horizontal'
} satisfies Partial<ButtonGroupProps>

export const ButtonGroup = factory<ButtonGroupFactory>((_props, ref) => {
    const props = useProps('ButtonGroup', defaultProps, _props)
    const { orientation, ...others } = props

    return (
        <Box
            ref={ref}
            component="div"
            className={classes.group}
            data-orientation={orientation}
            {...others}
        />
    )
})

ButtonGroup.displayName = '@react-ui/ui/ButtonGroup'
