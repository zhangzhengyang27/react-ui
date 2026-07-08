import { factory, useProps, type Factory } from '../../core'
import { ModalBaseHeader, type ModalBaseHeaderProps } from '../ModalBase'
import { useModalContext } from './Modal.context'
import classes from './Modal.module.css'

export type ModalHeaderStylesNames = 'header'

export interface ModalHeaderProps extends ModalBaseHeaderProps {}

export type ModalHeaderFactory = Factory<{
    props: ModalHeaderProps
    ref: HTMLElement
    stylesNames: ModalHeaderStylesNames
    compound: true
}>

export const ModalHeader = factory<ModalHeaderFactory>((_props, ref) => {
    const props = useProps('ModalHeader', null, _props)
    const { className, style, ...others } = props
    const ctx = useModalContext()

    return <ModalBaseHeader ref={ref} {...ctx.getStyles('header', { className, style })} {...others} />
})

ModalHeader.classes = classes
ModalHeader.displayName = '@mantine/core/ModalHeader'
