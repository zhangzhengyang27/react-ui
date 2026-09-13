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

// 兜底滚动组件必须是稳定的模块级引用：若在渲染中内联定义，每次渲染都是新的组件类型，
// React 会把整个内容子树卸载重建（焦点/非受控值/滚动位置全部丢失）
const DrawerContentScrollFallback = ({ children: c }: { children?: React.ReactNode }) => <div>{c}</div>

export const DrawerContent = factory<DrawerContentFactory>((_props, ref) => {
    const props = useProps('DrawerContent', null, _props)
    const { children, ...others } = props
    const ctx = useDrawerContext()

    const Scroll: React.FC<any> =
        ctx.scrollAreaComponent === 'div' || !ctx.scrollAreaComponent
            ? DrawerContentScrollFallback
            : ctx.scrollAreaComponent

    return (
        <ModalBaseContent ref={ref} {...ctx.getStyles('content')} innerProps={ctx.getStyles('inner')} {...others}>
            <Scroll style={{ height: 'calc(100% - var(--drawer-offset) * 2)' }}>{children}</Scroll>
        </ModalBaseContent>
    )
})

DrawerContent.classes = classes
DrawerContent.displayName = '@xiaoye-react/ui/DrawerContent'
