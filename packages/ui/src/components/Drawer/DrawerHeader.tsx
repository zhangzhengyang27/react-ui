import { BoxProps, ElementProps, factory, useProps, type Factory } from '../../core'
import { ModalBaseHeader } from '../ModalBase'
import { useDrawerContext } from './Drawer.context'
import classes from './Drawer.module.css'

export type DrawerHeaderStylesNames = 'header'

export interface DrawerHeaderProps extends BoxProps, ElementProps<'header'> {
    /** Content */
    children?: React.ReactNode
}

export type DrawerHeaderFactory = Factory<{
    props: DrawerHeaderProps
    ref: HTMLElement
    stylesNames: DrawerHeaderStylesNames
    compound: true
}>

export const DrawerHeader = factory<DrawerHeaderFactory>((_props, ref) => {
    const props = useProps('DrawerHeader', null, _props)
    const { className, style, ...others } = props
    const ctx = useDrawerContext()

    return <ModalBaseHeader ref={ref} {...ctx.getStyles('header', { className, style })} {...others} />
})

DrawerHeader.classes = classes
DrawerHeader.displayName = '@mantine/core/DrawerHeader'
