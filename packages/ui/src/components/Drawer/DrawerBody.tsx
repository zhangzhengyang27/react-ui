import { BoxProps, ElementProps, factory, useProps, type Factory } from '../../core'
import { ModalBaseBody } from '../ModalBase'
import { useDrawerContext } from './Drawer.context'
import classes from './Drawer.module.css'

export type DrawerBodyStylesNames = 'body'

export interface DrawerBodyProps extends BoxProps, ElementProps<'div'> {
    /** Content */
    children?: React.ReactNode
}

export type DrawerBodyFactory = Factory<{
    props: DrawerBodyProps
    ref: HTMLDivElement
    stylesNames: DrawerBodyStylesNames
    compound: true
}>

export const DrawerBody = factory<DrawerBodyFactory>((_props, ref) => {
    const props = useProps('DrawerBody', null, _props)
    const { className, style, ...others } = props
    const ctx = useDrawerContext()

    return <ModalBaseBody ref={ref} {...ctx.getStyles('body', { className, style })} {...others} />
})

DrawerBody.classes = classes
DrawerBody.displayName = '@xiaoye-react/ui/DrawerBody'
