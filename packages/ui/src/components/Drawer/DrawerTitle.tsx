import { BoxProps, ElementProps, factory, useProps, type Factory } from '../../core'
import { ModalBaseTitle } from '../ModalBase'
import { useDrawerContext } from './Drawer.context'
import classes from './Drawer.module.css'

export type DrawerTitleStylesNames = 'title'

export interface DrawerTitleProps extends BoxProps, ElementProps<'h2'> {
    /** Content */
    children?: React.ReactNode
}

export type DrawerTitleFactory = Factory<{
    props: DrawerTitleProps
    ref: HTMLHeadingElement
    stylesNames: DrawerTitleStylesNames
    compound: true
}>

export const DrawerTitle = factory<DrawerTitleFactory>((_props, ref) => {
    const props = useProps('DrawerTitle', null, _props)
    const { className, style, ...others } = props
    const ctx = useDrawerContext()

    return <ModalBaseTitle ref={ref} {...ctx.getStyles('title', { className, style })} {...others} />
})

DrawerTitle.classes = classes
DrawerTitle.displayName = '@mantine/core/DrawerTitle'
