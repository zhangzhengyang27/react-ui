import { Box, BoxProps, factory, Factory, useProps } from '../../core'
import classes from './Button.module.css'

export interface ButtonGroupSectionProps extends BoxProps {
    /** Section content */
    children?: React.ReactNode
}

export type ButtonGroupSectionFactory = Factory<{
    props: ButtonGroupSectionProps
    ref: HTMLDivElement
    compound: true
}>

export const ButtonGroupSection = factory<ButtonGroupSectionFactory>((_props, ref) => {
    const props = useProps('ButtonGroupSection', null, _props)
    const { children, ...others } = props

    return (
        <Box ref={ref} component="div" className={classes.groupSection} {...others}>
            {children}
        </Box>
    )
})

ButtonGroupSection.displayName = '@xiaoye-react/ui/ButtonGroupSection'
