import { factory, useProps, type Factory } from '../../core'
import { ModalBaseOverlay, type ModalBaseOverlayProps } from '../ModalBase'
import { useModalContext } from './Modal.context'
import classes from './Modal.module.css'

export type ModalOverlayStylesNames = 'overlay'

export interface ModalOverlayProps extends ModalBaseOverlayProps {}

export type ModalOverlayFactory = Factory<{
    props: ModalOverlayProps
    ref: HTMLDivElement
    stylesNames: ModalOverlayStylesNames
    compound: true
}>

export const ModalOverlay = factory<ModalOverlayFactory>((_props, ref) => {
    const props = useProps('ModalOverlay', null, _props)
    const { className, style, ...others } = props
    const ctx = useModalContext()

    return <ModalBaseOverlay ref={ref} {...ctx.getStyles('overlay', { className, style })} {...others} />
})

ModalOverlay.classes = classes
ModalOverlay.displayName = '@xiaoye-react/ui/ModalOverlay'
