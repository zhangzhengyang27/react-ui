import { factory, useProps, type Factory } from '../../core'
import { ModalBaseContent } from '../ModalBase'
import { useDrawerContext } from './Drawer.context'
import classes from './Drawer.module.css'

export type DrawerContentStylesNames = 'content' | 'inner'

export interface DrawerContentProps {
    /** Content */
    children?: React.ReactNode

    /** Radius */
    radius?: any
}

export type DrawerContentFactory = Factory<{
    props: DrawerContentProps
    ref: HTMLDivElement
    stylesNames: DrawerContentStylesNames
    compound: true
}>

export const DrawerContent = factory<DrawerContentFactory>((_props, ref) => {
    const props = useProps('DrawerContent', null, _props)
    const { children, ...others } = props
    const ctx = useDrawerContext()

    const Scroll: React.FC<any> =
        ctx.scrollAreaComponent === 'div' || !ctx.scrollAreaComponent
            ? ({ children: c }) => <div>{c}</div>
            : ctx.scrollAreaComponent

    return (
        <ModalBaseContent ref={ref} {...ctx.getStyles('content')} innerProps={ctx.getStyles('inner')} {...others}>
            <Scroll style={{ height: 'calc(100% - var(--drawer-offset) * 2)' }}>{children}</Scroll>
        </ModalBaseContent>
    )
})

DrawerContent.classes = classes
DrawerContent.displayName = '@mantine/core/DrawerContent'
