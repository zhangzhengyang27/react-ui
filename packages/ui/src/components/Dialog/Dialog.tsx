import {
    createVarsResolver,
    factory,
    Factory,
    getDefaultZIndex,
    getRadius,
    getSize,
    MantineRadius,
    MantineSize,
    StylesApiProps,
    useProps,
    useStyles
} from '../../core'
import { CloseButton } from '../CloseButton'
import {
    ModalBase,
    ModalBaseBody,
    ModalBaseContent,
    ModalBaseHeader,
    ModalBaseOverlay,
    ModalBaseTitle,
    type ModalBaseProps
} from '../ModalBase'
import classes from './Dialog.module.css'

export type DialogStylesNames = 'root' | 'header' | 'title' | 'body' | 'content' | 'inner' | 'close' | 'overlay'

export type DialogCssVariables = {
    root: '--dialog-size' | '--dialog-radius'
}

export interface DialogProps
    extends StylesApiProps<DialogFactory>,
        Omit<ModalBaseProps, 'styles' | 'classNames' | 'variant' | 'vars'> {
    /** Dialog title */
    title?: React.ReactNode

    /** If set, the overlay is rendered @default true */
    withOverlay?: boolean

    /** Dialog content */
    children?: React.ReactNode

    /** If set, the close button is rendered @default true */
    withCloseButton?: boolean

    /** Key of theme.radius or any valid CSS value to set border-radius @default 'md' */
    radius?: MantineRadius

    /** Controls width of the dialog @default 'sm' */
    size?: MantineSize | (string & {}) | number

    /** If set, the dialog is centered vertically @default true */
    centered?: boolean
}

export type DialogFactory = Factory<{
    props: DialogProps
    ref: HTMLDivElement
    stylesNames: DialogStylesNames
    vars: DialogCssVariables
}>

const defaultProps = {
    closeOnClickOutside: true,
    withinPortal: true,
    lockScroll: true,
    trapFocus: true,
    closeOnEscape: true,
    keepMounted: false,
    zIndex: getDefaultZIndex('modal'),
    withOverlay: true,
    withCloseButton: true,
    centered: true,
    size: 'sm',
    radius: 'md',
    transitionProps: { duration: 200, transition: 'fade-down' }
} satisfies Partial<DialogProps>

const varsResolver = createVarsResolver<DialogFactory>((_, { radius, size }) => ({
    root: {
        '--dialog-size': getSize(size, 'dialog-size'),
        '--dialog-radius': radius === undefined ? undefined : getRadius(radius)
    }
}))

export const Dialog = factory<DialogFactory>((_props, _ref) => {
    const props = useProps('Dialog', defaultProps, _props)
    const {
        title,
        withOverlay,
        withCloseButton,
        children,
        radius,
        opened,
        zIndex,
        centered,
        className,
        style,
        classNames,
        styles,
        unstyled,
        vars,
        ...others
    } = props

    const getStyles = useStyles<DialogFactory>({
        name: 'Dialog',
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
        <ModalBase
            ref={_ref}
            radius={radius}
            opened={opened}
            zIndex={zIndex}
            {...others}
            {...getStyles('root')}
            data-centered={centered || undefined}
        >
            {withOverlay && <ModalBaseOverlay {...getStyles('overlay')} />}
            <ModalBaseContent {...getStyles('content')} innerProps={getStyles('inner')}>
                {hasHeader && (
                    <ModalBaseHeader {...getStyles('header')}>
                        {title && <ModalBaseTitle {...getStyles('title')}>{title}</ModalBaseTitle>}
                        {withCloseButton && (
                            <CloseButton
                                {...getStyles('close')}
                                onClick={() => props.onClose()}
                                aria-label="关闭对话框"
                            />
                        )}
                    </ModalBaseHeader>
                )}
                <ModalBaseBody {...getStyles('body')}>{children}</ModalBaseBody>
            </ModalBaseContent>
        </ModalBase>
    )
})

Dialog.classes = classes
;(Dialog as any).varsResolver = varsResolver
Dialog.displayName = '@react-ui/ui/Dialog'

export namespace Dialog {
    export type Props = DialogProps
    export type StylesNames = DialogStylesNames
    export type CssVariables = DialogCssVariables
    export type Factory = DialogFactory
}
