import { factory, useProps, type Factory } from '../../core'
import { ModalBaseTitle, type ModalBaseTitleProps } from '../ModalBase'
import { useModalContext } from './Modal.context'
import classes from './Modal.module.css'

export type ModalTitleStylesNames = 'title'

export interface ModalTitleProps extends ModalBaseTitleProps {}

export type ModalTitleFactory = Factory<{
    props: ModalTitleProps
    ref: HTMLHeadingElement
    stylesNames: ModalTitleStylesNames
    compound: true
}>

export const ModalTitle = factory<ModalTitleFactory>((_props, ref) => {
    const props = useProps('ModalTitle', null, _props)
    const { className, style, ...others } = props
    const ctx = useModalContext()

    return <ModalBaseTitle ref={ref} {...ctx.getStyles('title', { className, style })} {...others} />
})

ModalTitle.classes = classes
ModalTitle.displayName = '@react-ui/ui/ModalTitle'
