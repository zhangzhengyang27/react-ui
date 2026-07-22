import { factory, useProps, type Factory } from '../../core'
import { ModalBaseBody, type ModalBaseBodyProps } from '../ModalBase'
import { useModalContext } from './Modal.context'
import classes from './Modal.module.css'

export type ModalBodyStylesNames = 'body'

export interface ModalBodyProps extends ModalBaseBodyProps {}

export type ModalBodyFactory = Factory<{
    props: ModalBodyProps
    ref: HTMLDivElement
    stylesNames: ModalBodyStylesNames
    compound: true
}>

export const ModalBody = factory<ModalBodyFactory>((_props, ref) => {
    const props = useProps('ModalBody', null, _props)
    const { className, style, ...others } = props
    const ctx = useModalContext()

    return <ModalBaseBody ref={ref} {...ctx.getStyles('body', { className, style })} {...others} />
})

ModalBody.classes = classes
ModalBody.displayName = '@xiaoye-react/ui/ModalBody'
