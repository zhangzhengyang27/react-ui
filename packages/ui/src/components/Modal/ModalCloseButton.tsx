import { factory, useProps, type Factory } from '../../core'
import { ModalBaseCloseButton, type ModalBaseCloseButtonProps } from '../ModalBase'
import { useModalContext } from './Modal.context'
import classes from './Modal.module.css'

export type ModalCloseButtonStylesNames = 'close'

export interface ModalCloseButtonProps extends ModalBaseCloseButtonProps {}

export type ModalCloseButtonFactory = Factory<{
    props: ModalCloseButtonProps
    ref: HTMLButtonElement
    stylesNames: ModalCloseButtonStylesNames
    compound: true
}>

export const ModalCloseButton = factory<ModalCloseButtonFactory>((_props, ref) => {
    const props = useProps('ModalCloseButton', null, _props)
    const { className, style, ...others } = props
    const ctx = useModalContext()

    return <ModalBaseCloseButton ref={ref} {...ctx.getStyles('close', { className, style })} {...others} />
})

ModalCloseButton.classes = classes
ModalCloseButton.displayName = '@react-ui/ui/ModalCloseButton'
