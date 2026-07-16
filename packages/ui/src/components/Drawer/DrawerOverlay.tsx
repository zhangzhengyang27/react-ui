import { factory, useProps, type Factory } from '../../core'
import { ModalBaseOverlay } from '../ModalBase'
import { useDrawerContext } from './Drawer.context'
import classes from './Drawer.module.css'

export type DrawerOverlayStylesNames = 'overlay'

export interface DrawerOverlayProps {
    /** Props passed to overlay */
    [key: string]: any
}

export type DrawerOverlayFactory = Factory<{
    props: DrawerOverlayProps
    ref: HTMLDivElement
    stylesNames: DrawerOverlayStylesNames
    compound: true
}>

export const DrawerOverlay = factory<DrawerOverlayFactory>((_props, ref) => {
    const props = useProps('DrawerOverlay', null, _props)
    const { className, style, ...others } = props
    const ctx = useDrawerContext()

    return <ModalBaseOverlay ref={ref} {...ctx.getStyles('overlay', { className, style })} {...others} />
})

DrawerOverlay.classes = classes
DrawerOverlay.displayName = '@react-ui/ui/DrawerOverlay'
