import {
    createVarsResolver,
    factory,
    Factory,
    getDefaultZIndex,
    getRadius,
    getSize,
    MantineRadius,
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
    /** Modal title */
    title?: React.ReactNode

    /** If set, the overlay is rendered */
    withOverlay?: boolean

    /** Props passed down to the Overlay component */
    overlayProps?: Partial<ModalOverlayProps>

    /** Modal content */
    children?: React.ReactNode

    /** If set, the close button is rendered */
    withCloseButton?: boolean

    /** Props passed down to the close button */
    closeButtonProps?: Partial<ModalCloseButtonProps>

    /** Top/bottom modal offset */
    yOffset?: React.CSSProperties['marginTop']

    /** Left/right modal offset */
    xOffset?: React.CSSProperties['marginLeft']

    /** Scroll area component */
    scrollAreaComponent?: React.FC<any>

    /** Key of theme.radius or any valid CSS value to set border-radius */
    radius?: MantineRadius

    /** If set, the modal is centered vertically */
    centered?: boolean

    /** If set, the modal takes the entire screen */
    fullScreen?: boolean
}

export type ModalFactory = Factory<{
    props: ModalProps
    ref: HTMLDivElement
    stylesNames: ModalStylesNames
    vars: ModalCssVariables
    static_components: {
        Root: typeof ModalRoot
        Body: typeof ModalBody
        CloseButton: typeof ModalCloseButton
        Content: typeof ModalContent
        Header: typeof ModalHeader
        Overlay: typeof ModalOverlay
        Title: typeof ModalTitle
        Stack: typeof ModalStack
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
Modal.displayName = '@react-ui/ui/Modal'
Modal.Root = ModalRoot
Modal.Body = ModalBody
Modal.CloseButton = ModalCloseButton
Modal.Content = ModalContent
Modal.Header = ModalHeader
Modal.Overlay = ModalOverlay
Modal.Title = ModalTitle
Modal.Stack = ModalStack

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

    export namespace Stack {
        export type Props = ModalStackProps
    }
}
