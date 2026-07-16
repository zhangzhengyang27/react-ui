import { useId } from '@react-ui/hooks'
import {
    Box,
    createVarsResolver,
    factory,
    getRadius,
    useProps,
    useStyles,
    type BoxProps,
    type ElementProps,
    type Factory,
    type UIColor,
    type UIRadius,
    type StylesApiProps
} from '../../core'
import { CloseButton } from '../CloseButton'
import classes from './Alert.module.css'

export type AlertStylesNames = 'root' | 'body' | 'label' | 'title' | 'icon' | 'wrapper' | 'message' | 'closeButton'
export type AlertVariant = 'filled' | 'light' | 'outline' | 'default' | 'transparent' | 'white'
export type AlertCssVariables = {
    root: '--alert-radius' | '--alert-bg' | '--alert-color' | '--alert-bd'
}

export interface AlertProps extends BoxProps, ElementProps<'div', 'title'>, StylesApiProps<AlertFactory> {
    /** 主题圆角的键或任意有效的 CSS 值 */
    radius?: UIRadius

    /** 主题颜色的键或任意有效的 CSS 颜色 */
    color?: UIColor

    /** Alert title */
    title?: React.ReactNode

    /** Icon displayed next to the title */
    icon?: React.ReactNode

    /** Determines whether close button should be displayed */
    withCloseButton?: boolean

    /** 点击关闭按钮时调用 */
    onClose?: () => void

    /** 关闭按钮的 aria-label */
    closeButtonLabel?: string

    /** If set, adjusts text color based on background color for filled variant */
    autoContrast?: boolean
}

export type AlertFactory = Factory<{
    props: AlertProps
    ref: HTMLDivElement
    stylesNames: AlertStylesNames
    vars: AlertCssVariables
    variant: AlertVariant
}>

const defaultProps = {
    variant: 'light'
} satisfies Partial<AlertProps>

const varsResolver = createVarsResolver<AlertFactory>((theme, { radius, color, variant, autoContrast }) => {
    const colors = theme.variantColorResolver({
        color: color || theme.primaryColor,
        theme,
        variant: variant || 'light',
        autoContrast
    })

    return {
        root: {
            '--alert-radius': radius === undefined ? undefined : getRadius(radius),
            '--alert-bg': color || variant ? colors.background : undefined,
            '--alert-color': colors.color,
            '--alert-bd': color || variant ? colors.border : undefined
        }
    }
})

export const Alert = factory<AlertFactory>((_props, ref) => {
    const props = useProps('Alert', defaultProps, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        radius,
        color,
        title,
        children,
        id,
        icon,
        withCloseButton,
        onClose,
        closeButtonLabel,
        variant,
        autoContrast,
        ...others
    } = props

    const getStyles = useStyles<AlertFactory>({
        name: 'Alert',
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

    const rootId = useId(id)
    const titleId = (title && `${rootId}-title`) || undefined
    const bodyId = `${rootId}-body`

    return (
        <Box
            ref={ref}
            id={rootId}
            {...getStyles('root', { variant })}
            variant={variant}
            {...others}
            role="alert"
            aria-describedby={children ? bodyId : undefined}
            aria-labelledby={title ? titleId : undefined}
        >
            <div {...getStyles('wrapper')}>
                {icon && <div {...getStyles('icon')}>{icon}</div>}

                <div {...getStyles('body')}>
                    {title && (
                        <div {...getStyles('title')} data-with-close-button={withCloseButton || undefined}>
                            <span id={titleId} {...getStyles('label')}>
                                {title}
                            </span>
                        </div>
                    )}

                    {children && (
                        <div id={bodyId} {...getStyles('message')} data-variant={variant}>
                            {children}
                        </div>
                    )}
                </div>

                {withCloseButton && (
                    <CloseButton
                        {...getStyles('closeButton')}
                        onClick={onClose}
                        variant="transparent"
                        size={16}
                        aria-label={closeButtonLabel}
                        unstyled={unstyled}
                    />
                )}
            </div>
        </Box>
    )
})

Alert.classes = classes
Alert.displayName = '@react-ui/ui/Alert'

export namespace Alert {
    export type Props = AlertProps
    export type StylesNames = AlertStylesNames
    export type CssVariables = AlertCssVariables
    export type Factory = AlertFactory
    export type Variant = AlertVariant
}
