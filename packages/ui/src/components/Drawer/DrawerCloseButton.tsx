import { factory, useProps, type Factory } from '../../core'
import { ModalBaseCloseButton } from '../ModalBase'
import { useDrawerContext } from './Drawer.context'
import classes from './Drawer.module.css'

export type DrawerCloseButtonStylesNames = 'close'

export interface DrawerCloseButtonProps {
    /** Props passed to close button */
    [key: string]: any
}

export type DrawerCloseButtonFactory = Factory<{
    props: DrawerCloseButtonProps
    ref: HTMLButtonElement
    stylesNames: DrawerCloseButtonStylesNames
    compound: true
}>

export const DrawerCloseButton = factory<DrawerCloseButtonFactory>((_props, ref) => {
    const props = useProps('DrawerCloseButton', null, _props)
    const { className, style, ...others } = props
    const ctx = useDrawerContext()

    return <ModalBaseCloseButton ref={ref} {...ctx.getStyles('close', { className, style })} {...others} />
})

DrawerCloseButton.classes = classes
DrawerCloseButton.displayName = '@mantine/core/DrawerCloseButton'
