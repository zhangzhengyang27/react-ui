import {
    Box,
    BoxProps,
    createVarsResolver,
    ElementProps,
    factory,
    Factory,
    getRadius,
    UIColor,
    UIRadius,
    StylesApiProps,
    useProps,
    useStyles
} from '../../core'
import { getThemeColor } from '../../core/UIProvider/color-functions/index'
import { CloseButton } from '../CloseButton'
import { Loader } from '../Loader'
import classes from './Notification.module.css'

export type NotificationStylesNames = 'root' | 'icon' | 'body' | 'title' | 'description' | 'closeButton'

export type NotificationCssVariables = {
    root: '--notification-color' | '--notification-radius'
}

export interface NotificationProps extends BoxProps, StylesApiProps<NotificationFactory>, ElementProps<'div', 'title'> {
    /** 通知标题 */
    title?: React.ReactNode

    /** 通知消息 */
    message?: React.ReactNode

    /** 左侧显示的图标 */
    icon?: React.ReactNode

    /** 主题颜色的键或任意有效的 CSS 颜色 */
    color?: UIColor

    /** 主题圆角的键或任意有效的 CSS 值 @default theme.defaultRadius */
    radius?: UIRadius

    /** If true, a loading spinner will be displayed instead of the icon @default false */
    loading?: boolean

    /** If true, the close button is displayed @default true */
    withCloseButton?: boolean

    /** 点击关闭按钮时调用 */
    onClose?: () => void

    /** 关闭按钮的 aria-label */
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
            // 主题色键走对应 CSS 变量,任意合法 CSS 颜色(如 #ff0000)由 getThemeColor 原样透传
            '--notification-color': resolvedColor ? getThemeColor(resolvedColor, theme) : undefined,
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
        <Box ref={ref} role="alert" {...getStyles('root')} mod={[{ withIcon: !!icon || loading }, mod]} {...others}>
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
Notification.displayName = '@xiaoye-react/ui/Notification'

export namespace Notification {
    export type Props = NotificationProps
    export type Factory = NotificationFactory
    export type StylesNames = NotificationStylesNames
    export type CssVariables = NotificationCssVariables
}
