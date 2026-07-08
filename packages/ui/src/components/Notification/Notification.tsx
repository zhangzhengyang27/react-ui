import {
    Box,
    BoxProps,
    createVarsResolver,
    ElementProps,
    factory,
    Factory,
    getRadius,
    MantineColor,
    MantineRadius,
    StylesApiProps,
    useProps,
    useStyles
} from '../../core'
import { CloseButton } from '../CloseButton'
import { Loader } from '../Loader'
import classes from './Notification.module.css'

export type NotificationStylesNames = 'root' | 'icon' | 'body' | 'title' | 'description' | 'closeButton'

export type NotificationCssVariables = {
    root: '--notification-color' | '--notification-radius'
}

export interface NotificationProps extends BoxProps, StylesApiProps<NotificationFactory>, ElementProps<'div', 'title'> {
    /** Notification title */
    title?: React.ReactNode

    /** Notification message */
    message?: React.ReactNode

    /** Icon displayed on the left side */
    icon?: React.ReactNode

    /** Key of theme.colors or any valid CSS color */
    color?: MantineColor

    /** Key of theme.radius or any valid CSS value @default theme.defaultRadius */
    radius?: MantineRadius

    /** If true, a loading spinner will be displayed instead of the icon @default false */
    loading?: boolean

    /** If true, the close button is displayed @default true */
    withCloseButton?: boolean

    /** Called when the close button is clicked */
    onClose?: () => void

    /** Close button aria-label */
    closeButtonProps?: React.ComponentPropsWithoutRef<'button'>
}

export type NotificationFactory = Factory<{
    props: NotificationProps
    ref: HTMLDivElement
    stylesNames: NotificationStylesNames
    vars: NotificationCssVariables
}>

const defaultProps = {
    withCloseButton: true,
    loading: false
} satisfies Partial<NotificationProps>

const varsResolver = createVarsResolver<NotificationFactory>((theme, { color, radius }) => {
    const resolvedColor = color || theme.primaryColor
    return {
        root: {
            '--notification-color': resolvedColor ? `var(--ui-color-${resolvedColor}-filled)` : undefined,
            '--notification-radius': radius === undefined ? undefined : getRadius(radius)
        }
    }
})

export const Notification = factory<NotificationFactory>((_props, ref) => {
    const props = useProps('Notification', defaultProps, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        title,
        message,
        icon,
        color,
        radius,
        loading,
        withCloseButton,
        onClose,
        closeButtonProps,
        mod,
        ...others
    } = props

    const getStyles = useStyles<NotificationFactory>({
        name: 'Notification',
        props,
        classes,
        className,
        style,
        classNames,
        styles,
        unstyled,
        vars,
        varsResolver
    })

    return (
        <Box ref={ref} {...getStyles('root')} mod={[{ withIcon: !!icon || loading }, mod]} {...others}>
            {(icon || loading) && <div {...getStyles('icon')}>{loading ? <Loader size={28} /> : icon}</div>}

            <div {...getStyles('body')}>
                {title && <div {...getStyles('title')}>{title}</div>}
                {message && <div {...getStyles('description')}>{message}</div>}
            </div>

            {withCloseButton && (
                <CloseButton
                    {...getStyles('closeButton')}
                    aria-label="关闭通知"
                    {...closeButtonProps}
                    onClick={event => {
                        closeButtonProps?.onClick?.(event)
                        onClose?.()
                    }}
                />
            )}
        </Box>
    )
})

Notification.classes = classes
;(Notification as any).varsResolver = varsResolver
Notification.displayName = '@react-ui/ui/Notification'

export namespace Notification {
    export type Props = NotificationProps
    export type Factory = NotificationFactory
    export type StylesNames = NotificationStylesNames
    export type CssVariables = NotificationCssVariables
}
