import {
    createVarsResolver,
    factory,
    Factory,
    getDefaultZIndex,
    getRadius,
    getSize,
    MantineRadius,
    MantineSize,
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
import { DrawerStack, type DrawerStackProps } from './DrawerStack'
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
    /** Drawer title */
    title?: React.ReactNode

    /** If set, the overlay is rendered */
    withOverlay?: boolean

    /** Props passed down to the Overlay component */
    overlayProps?: Partial<DrawerOverlayProps>

    /** Drawer content */
    children?: React.ReactNode

    /** If set, the close button is rendered */
    withCloseButton?: boolean

    /** Props passed down to the close button */
    closeButtonProps?: Partial<DrawerCloseButtonProps>

    /** Side of the screen on which drawer will be opened */
    position?: DrawerPosition

    /** Controls width of the drawer */
    size?: MantineSize | (string & {}) | number

    /** Key of theme.radius or any valid CSS value to set border-radius */
    radius?: MantineRadius

    /** Drawer container offset from the viewport end */
    offset?: number | string

    /** Scroll area component */
    scrollAreaComponent?: React.FC<any>
}

export type DrawerFactory = Factory<{
    props: DrawerProps
    ref: HTMLDivElement
    stylesNames: DrawerStylesNames
    vars: DrawerCssVariables
    static_components: {
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

const transitions: Record<DrawerPosition, import('../Transition').MantineTransitionName> = {
    top: 'slide-down',
    bottom: 'slide-up',
    left: 'slide-right',
    right: 'slide-left'
}

const defaultProps = {
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
        position,
        size,
        offset,
        scrollAreaComponent,
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

    const hasHeader = !!title || withCloseButton

    return (
        <DrawerProvider value={{ scrollAreaComponent, getStyles, radius }}>
            <ModalBase
                radius={radius}
                opened={opened}
                zIndex={zIndex}
                transitionProps={{ transition: transitions[position], duration: 200 }}
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
Drawer.displayName = '@mantine/core/Drawer'
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
    export type StackProps = DrawerStackProps

    export namespace Root {
        export type Props = DrawerRootProps
        export type Factory = DrawerRootFactory
    }
}
