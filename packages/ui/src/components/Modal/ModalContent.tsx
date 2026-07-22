import { factory, rem, useProps, type Factory } from '../../core'
import { ModalBaseContent } from '../ModalBase'
import { useModalContext } from './Modal.context'
import classes from './Modal.module.css'

export type ModalContentStylesNames = 'content' | 'inner'

export interface ModalContentProps {
    /** Content */
    children?: React.ReactNode

    /** Radius */
    radius?: any
}

export type ModalContentFactory = Factory<{
    props: ModalContentProps
    ref: HTMLDivElement
    stylesNames: ModalContentStylesNames
    compound: true
}>

const ModalContentScrollFallback = ({ children: c }: { children?: React.ReactNode }) => <div>{c}</div>

export const ModalContent = factory<ModalContentFactory>((_props, ref) => {
    const props = useProps('ModalContent', null, _props)
    const { children, ...others } = props
    const ctx = useModalContext()

    const Scroll: React.FC<any> =
        ctx.scrollAreaComponent === 'div' || !ctx.scrollAreaComponent
            ? ModalContentScrollFallback
            : ctx.scrollAreaComponent

    return (
        <ModalBaseContent
            ref={ref}
            {...ctx.getStyles('content')}
            innerProps={ctx.getStyles('inner')}
            data-full-screen={ctx.fullScreen || undefined}
            data-modal-content
            {...others}
        >
            <Scroll
                style={{
                    maxHeight: ctx.fullScreen ? '100dvh' : `calc(100dvh - (${rem(ctx.yOffset)} * 2))`
                }}
            >
                {children}
            </Scroll>
        </ModalBaseContent>
    )
})

ModalContent.classes = classes
ModalContent.displayName = '@xiaoye-react/ui/ModalContent'
