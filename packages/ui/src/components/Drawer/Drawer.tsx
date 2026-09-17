import { useContext, useEffect, useMemo } from 'react'
import { useId } from '@xiaoye-react/hooks'
import {
    createVarsResolver,
    factory,
    Factory,
    getDefaultZIndex,
    getRadius,
    getSize,
    UIRadius,
    UISize,
    rem,
    StylesApiProps,
    useProps,
    useStyles
} from '../../core'
import { ModalBase, ModalBaseProps } from '../ModalBase'
import { ScrollArea } from '../ScrollArea'
import { DrawerBody, type DrawerBodyProps } from './DrawerBody'
import { DrawerCloseButton, type DrawerCloseButtonProps } from './DrawerCloseButton'
import { DrawerContent, type DrawerContentProps } from './DrawerContent'
import { DrawerHeader, type DrawerHeaderProps } from './DrawerHeader'
import { DrawerOverlay, type DrawerOverlayProps } from './DrawerOverlay'
import { DrawerProvider } from './Drawer.context'
import { DrawerRoot, type DrawerRootProps, type DrawerRootFactory } from './DrawerRoot'
import { DrawerStack, DrawerStackContext } from './DrawerStack'
import { DrawerTitle, type DrawerTitleProps } from './DrawerTitle'
import classes from './Drawer.module.css'

export type DrawerPosition = 'bottom' | 'left' | 'right' | 'top'

export type DrawerStylesNames = 'root' | 'header' | 'title' | 'body' | 'content' | 'inner' | 'close' | 'overlay'

export type DrawerCssVariables = {
    root:
        | '--drawer-radius'
        | '--drawer-size'
        | '--drawer-flex'
        | '--drawer-height'
        | '--drawer-align'
        | '--drawer-justify'
        | '--drawer-offset'
}

export interface DrawerProps
    extends StylesApiProps<DrawerFactory>,
        Omit<ModalBaseProps, 'styles' | 'classNames' | 'variant' | 'vars'> {
    /** Drawer 标题 */
    title?: React.ReactNode

    /** 如果设置，则渲染遮罩层 */
    withOverlay?: boolean

    /** 传递给 Overlay 组件的属性 */
    overlayProps?: Partial<DrawerOverlayProps>

    /** Drawer 内容 */
    children?: React.ReactNode

    /** 如果设置，则渲染关闭按钮 */
    withCloseButton?: boolean

    /** 传递给关闭按钮的属性 */
    closeButtonProps?: Partial<DrawerCloseButtonProps>

    /** Drawer 将在屏幕的哪一侧打开 */
    position?: DrawerPosition

    /** 控制 Drawer 的宽度 */
    size?: UISize | (string & {}) | number

    /** 主题圆角键或任意有效 CSS 值，用于设置 border-radius */
    radius?: UIRadius

    /** Drawer 容器距离视口末端的偏移 */
    offset?: number | string

    /** 滚动区域组件 */
    scrollAreaComponent?: React.FC<any>

    /** useModalsStack register 返回的栈 id，仅用于标记、不透传 DOM（避免渲染出 stackid 属性） */
    stackId?: string
}

export type DrawerFactory = Factory<{
    props: DrawerProps
    ref: HTMLDivElement
    stylesNames: DrawerStylesNames
    vars: DrawerCssVariables
    staticComponents: {
        Body: typeof DrawerBody
        CloseButton: typeof DrawerCloseButton
        Content: typeof DrawerContent
        Header: typeof DrawerHeader
        Overlay: typeof DrawerOverlay
        Title: typeof DrawerTitle
        Root: typeof DrawerRoot
        Stack: typeof DrawerStack
    }
}>

function getDrawerFlex(position: DrawerPosition | undefined) {
    if (position === 'top' || position === 'bottom') {
        return '0 0 calc(100% - var(--drawer-offset, 0rem) * 2)'
    }
    return undefined
}

function getDrawerAlign(position: DrawerPosition | undefined) {
    switch (position) {
        case 'top':
            return 'flex-start'
        case 'bottom':
            return 'flex-end'
        default:
            return undefined
    }
}

const transitions: Record<DrawerPosition, import('../Transition').UITransitionName> = {
    top: 'slide-down',
    bottom: 'slide-up',
    left: 'slide-right',
    right: 'slide-left'
}

const defaultProps = {
    returnFocus: true,
    closeOnClickOutside: true,
    withinPortal: true,
    lockScroll: true,
    trapFocus: true,
    closeOnEscape: true,
    keepMounted: false,
    zIndex: getDefaultZIndex('modal'),
    position: 'left',
    size: 'md',
    radius: 0,
    offset: 0,
    withOverlay: true,
    withCloseButton: true
} satisfies Partial<DrawerProps>

const varsResolver = createVarsResolver<DrawerFactory>((_, { radius, size, position, offset }) => ({
    root: {
        '--drawer-radius': radius === undefined ? undefined : getRadius(radius),
        '--drawer-size': getSize(size, 'drawer-size'),
        '--drawer-flex': getDrawerFlex(position),
        '--drawer-height': position === 'left' || position === 'right' ? undefined : 'var(--drawer-size)',
        '--drawer-align': getDrawerAlign(position),
        '--drawer-justify': position === 'right' ? 'flex-end' : undefined,
        '--drawer-offset': rem(offset)
    }
}))

export const Drawer = factory<DrawerFactory>((_props, _ref) => {
    const props = useProps('Drawer', defaultProps, _props)
    const {
        title,
        withOverlay,
        overlayProps,
        withCloseButton,
        closeButtonProps,
        children,
        radius,
        opened,
        zIndex,
        id,
        position,
        size,
        offset,
        scrollAreaComponent,
        transitionProps,
        stackId,
        className,
        style,
        classNames,
        styles,
        unstyled,
        vars,
        ...others
    } = props

    const getStyles = useStyles<DrawerFactory>({
        name: 'Drawer',
        classes,
        props,
        className,
        style,
        classNames,
        styles,
        unstyled,
        vars,
        varsResolver
    })

    // Drawer.Stack 内的子 Drawer 向栈注册，zIndex 由栈按打开顺序递增分配
    const stackCtx = useContext(DrawerStackContext)
    const autoId = useId(id)

    // 注册/注销按 opened 门控：useDrawersStack 的标准用法是多个 Drawer 常驻挂载、
    // 打开顺序任意，若挂载即注册，zIndex 会按 JSX 顺序分配，与打开顺序不一致。
    // 依赖只取 addModal/removeModal（Stack 侧 useCallback 的稳定句柄），不能放整个 stackCtx：
    // 注册本身会改变 stack → context value 身份随之变化，effect 若依赖 stackCtx 会
    // cleanup+setup 无限重跑，再次触发 "Maximum update depth exceeded"
    const addModalToStack = stackCtx?.addModal
    const removeModalFromStack = stackCtx?.removeModal
    useEffect(() => {
        if (!addModalToStack || !removeModalFromStack || !opened) {
            return undefined
        }
        // DrawerStack 的注册方法名与 ModalStack 一致（addModal/removeModal）
        addModalToStack(autoId, zIndex!)
        return () => removeModalFromStack(autoId)
        // zIndex 不入依赖：注册一次，后续 zIndex prop 变化不影响栈内排序
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addModalToStack, removeModalFromStack, autoId, opened])

    const resolvedZIndex = stackCtx ? stackCtx.getZIndex(autoId) : zIndex

    // 内联 transitionProps 对象每次渲染都是新引用，会击穿 ModalBase 内部的 memoTransitionProps，
    // 导致整个弹层子树跟着重渲染，这里 memo 化。
    // 用户 transitionProps 合并进方向过渡（与 DrawerRoot 行为一致），
    // 整体覆盖会丢失 slide-* 过渡、回退到基础 'pop'
    const drawerTransitionProps = useMemo(
        () => ({ transition: transitions[position!], duration: 200, ...transitionProps }),
        [position, transitionProps]
    )

    const hasHeader = !!title || withCloseButton

    return (
        <DrawerProvider value={{ scrollAreaComponent, getStyles, radius }}>
            <ModalBase
                ref={_ref}
                radius={radius}
                opened={opened}
                zIndex={resolvedZIndex}
                id={autoId}
                transitionProps={drawerTransitionProps}
                {...others}
                {...getStyles('root')}
                data-position={position}
                data-offset-scrollbars={scrollAreaComponent === ScrollArea.Autosize || undefined}
            >
                {withOverlay && <DrawerOverlay {...overlayProps} />}
                <DrawerContent radius={radius}>
                    {hasHeader && (
                        <DrawerHeader>
                            {title && <DrawerTitle>{title}</DrawerTitle>}
                            {withCloseButton && <DrawerCloseButton {...closeButtonProps} />}
                        </DrawerHeader>
                    )}
                    <DrawerBody>{children}</DrawerBody>
                </DrawerContent>
            </ModalBase>
        </DrawerProvider>
    )
})

Drawer.classes = classes
Drawer.displayName = '@xiaoye-react/ui/Drawer'
Drawer.Body = DrawerBody
Drawer.CloseButton = DrawerCloseButton
Drawer.Content = DrawerContent
Drawer.Header = DrawerHeader
Drawer.Overlay = DrawerOverlay
Drawer.Title = DrawerTitle
Drawer.Root = DrawerRoot
Drawer.Stack = DrawerStack

export namespace Drawer {
    export type Props = DrawerProps
    export type StylesNames = DrawerStylesNames
    export type CssVariables = DrawerCssVariables
    export type Factory = DrawerFactory
    export type BodyProps = DrawerBodyProps
    export type CloseButtonProps = DrawerCloseButtonProps
    export type ContentProps = DrawerContentProps
    export type HeaderProps = DrawerHeaderProps
    export type OverlayProps = DrawerOverlayProps
    export type TitleProps = DrawerTitleProps
    export type RootProps = DrawerRootProps

    export namespace Root {
        export type Props = DrawerRootProps
        export type Factory = DrawerRootFactory
    }
}
