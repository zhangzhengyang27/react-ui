import {
    createVarsResolver,
    factory,
    Factory,
    getDefaultZIndex,
    getRadius,
    getSize,
    UIRadius,
    rem,
    StylesApiProps,
    useProps,
    useStyles
} from '../../core'
import { ModalBase, ModalBaseProps } from '../ModalBase'
import { ScrollArea } from '../ScrollArea'
import { ModalBody, type ModalBodyProps } from './ModalBody'
import { ModalCloseButton, type ModalCloseButtonProps } from './ModalCloseButton'
import { ModalContent, type ModalContentProps } from './ModalContent'
import { ModalHeader, type ModalHeaderProps } from './ModalHeader'
import { ModalOverlay, type ModalOverlayProps } from './ModalOverlay'
import { ModalProvider } from './Modal.context'
import { ModalRoot, type ModalRootProps, type ModalRootFactory } from './ModalRoot'
import { ModalStack, type ModalStackProps } from './ModalStack'
import { ModalTitle, type ModalTitleProps } from './ModalTitle'
import classes from './Modal.module.css'

export type ModalStylesNames = 'root' | 'header' | 'title' | 'body' | 'content' | 'inner' | 'close' | 'overlay'

export type ModalCssVariables = {
    root: '--modal-radius' | '--modal-size' | '--modal-y-offset' | '--modal-x-offset'
}

export interface ModalProps
    extends StylesApiProps<ModalFactory>,
        Omit<ModalBaseProps, 'styles' | 'classNames' | 'variant' | 'vars'> {
    /** 模态框标题 */
    title?: React.ReactNode

    /** 如果设置，则渲染遮罩层 */
    withOverlay?: boolean

    /** 传递给 Overlay 组件的属性 */
    overlayProps?: Partial<ModalOverlayProps>

    /** 模态框内容 */
    children?: React.ReactNode

    /** 如果设置，则渲染关闭按钮 */
    withCloseButton?: boolean

    /** 传递给关闭按钮的属性 */
    closeButtonProps?: Partial<ModalCloseButtonProps>

    /** 模态框顶部/底部偏移 */
    yOffset?: React.CSSProperties['marginTop']

    /** 模态框左侧/右侧偏移 */
    xOffset?: React.CSSProperties['marginLeft']

    /** 滚动区域组件 */
    scrollAreaComponent?: React.FC<any>

    /** 主题圆角键或任意有效 CSS 值，用于设置 border-radius */
    radius?: UIRadius

    /** 如果设置，则模态框垂直居中 */
    centered?: boolean

    /** 如果设置，则模态框占据整个屏幕 */
    fullScreen?: boolean
}

export type ModalFactory = Factory<{
    props: ModalProps
    ref: HTMLDivElement
    stylesNames: ModalStylesNames
    vars: ModalCssVariables
    staticComponents: {
        Root: typeof ModalRoot
        Stack: typeof ModalStack
        Body: typeof ModalBody
        CloseButton: typeof ModalCloseButton
        Content: typeof ModalContent
        Header: typeof ModalHeader
        Overlay: typeof ModalOverlay
        Title: typeof ModalTitle
    }
}>

const defaultProps = {
    closeOnClickOutside: true,
    withinPortal: true,
    lockScroll: true,
    trapFocus: true,
    closeOnEscape: true,
    keepMounted: false,
    zIndex: getDefaultZIndex('modal'),
    transitionProps: { duration: 200, transition: 'fade-down' },
    withOverlay: true,
    withCloseButton: true,
    yOffset: '5dvh',
    xOffset: '5vw'
} satisfies Partial<ModalProps>

const varsResolver = createVarsResolver<ModalFactory>((_, { radius, size, yOffset, xOffset }) => ({
    root: {
        '--modal-radius': radius === undefined ? undefined : getRadius(radius),
        '--modal-size': getSize(size, 'modal-size'),
        '--modal-y-offset': rem(yOffset),
        '--modal-x-offset': rem(xOffset)
    }
}))

export const Modal = factory<ModalFactory>((_props, _ref) => {
    const props = useProps('Modal', defaultProps, _props)
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
        yOffset,
        xOffset,
        scrollAreaComponent,
        fullScreen,
        centered,
        className,
        style,
        classNames,
        styles,
        unstyled,
        vars,
        ...others
    } = props

    const getStyles = useStyles<ModalFactory>({
        name: 'Modal',
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

    const hasHeader = !!title || withCloseButton

    return (
        <ModalProvider value={{ yOffset, scrollAreaComponent, getStyles, fullScreen }}>
            <ModalBase
                ref={_ref}
                radius={radius}
                opened={opened}
                zIndex={zIndex}
                {...others}
                {...getStyles('root')}
                data-full-screen={fullScreen || undefined}
                data-centered={centered || undefined}
                data-offset-scrollbars={scrollAreaComponent === ScrollArea.Autosize || undefined}
            >
                {withOverlay && <ModalOverlay {...overlayProps} />}
                <ModalContent radius={radius}>
                    {hasHeader && (
                        <ModalHeader>
                            {title && <ModalTitle>{title}</ModalTitle>}
                            {withCloseButton && <ModalCloseButton {...closeButtonProps} />}
                        </ModalHeader>
                    )}
                    <ModalBody>{children}</ModalBody>
                </ModalContent>
            </ModalBase>
        </ModalProvider>
    )
})

Modal.classes = classes
Modal.displayName = '@xiaoye-react/ui/Modal'
Modal.Root = ModalRoot
Modal.Stack = ModalStack
Modal.Body = ModalBody
Modal.CloseButton = ModalCloseButton
Modal.Content = ModalContent
Modal.Header = ModalHeader
Modal.Overlay = ModalOverlay
Modal.Title = ModalTitle

export namespace Modal {
    export type Props = ModalProps
    export type StylesNames = ModalStylesNames
    export type CssVariables = ModalCssVariables
    export type Factory = ModalFactory
    export type BodyProps = ModalBodyProps
    export type CloseButtonProps = ModalCloseButtonProps
    export type ContentProps = ModalContentProps
    export type HeaderProps = ModalHeaderProps
    export type OverlayProps = ModalOverlayProps
    export type TitleProps = ModalTitleProps

    export namespace Root {
        export type Props = ModalRootProps
        export type Factory = ModalRootFactory
    }
}
