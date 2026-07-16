import {
    Box,
    BoxProps,
    createVarsResolver,
    getFontSize,
    getRadius,
    getSize,
    UIColor,
    UIGradient,
    UIRadius,
    UISize,
    polymorphicFactory,
    PolymorphicFactory,
    rem,
    StylesApiProps,
    useProps,
    useStyles
} from '../../core'
import { Loader, LoaderProps } from '../Loader'
import { UITransition, Transition } from '../Transition'
import { UnstyledButton } from '../UnstyledButton'
import { ButtonGroup } from './ButtonGroup'
import { ButtonGroupSection } from './ButtonGroupSection'
import classes from './Button.module.css'

export type ButtonSize = UISize | `compact-${UISize}` | (string & {})

export type ButtonStylesNames = 'root' | 'inner' | 'loader' | 'section' | 'label'
export type ButtonVariant = 'filled' | 'light' | 'outline' | 'transparent' | 'white' | 'subtle' | 'default' | 'gradient'

export type ButtonCssVariables = {
    root:
        | '--button-justify'
        | '--button-height'
        | '--button-padding-x'
        | '--button-fz'
        | '--button-radius'
        | '--button-bg'
        | '--button-hover'
        | '--button-hover-color'
        | '--button-color'
        | '--button-bd'
}

export interface ButtonProps extends BoxProps, StylesApiProps<ButtonFactory> {
    'data-disabled'?: boolean

    /** 控制按钮高度、字体大小和水平内边距 @default 'sm' */
    size?: ButtonSize

    /** 主题色键或任意有效 CSS 颜色 @default theme.primaryColor */
    color?: UIColor

    /** 设置内部元素的 justify-content @default 'center' */
    justify?: React.CSSProperties['justifyContent']

    /** 按钮标签左侧的内容 */
    leftSection?: React.ReactNode

    /** 按钮标签右侧的内容 */
    rightSection?: React.ReactNode

    /** 设置宽度为 100% @default false */
    fullWidth?: boolean

    /** 主题圆角键或任意有效 CSS 值 @default theme.defaultRadius */
    radius?: UIRadius

    /** variant="gradient" 时的渐变配置 @default theme.defaultGradient */
    gradient?: UIGradient

    /** 设置 disabled 属性并应用禁用样式 */
    disabled?: boolean

    /** 按钮内容 */
    children?: React.ReactNode

    /** 如果设置，将在按钮上方显示 Loader 组件 */
    loading?: boolean

    /** 传递给 Loader 组件的属性（仅在 loading 设置时可见） */
    loaderProps?: LoaderProps

    /** 如果设置，将根据背景色调整 filled 变体的文本颜色 */
    autoContrast?: boolean
}

export type ButtonFactory = PolymorphicFactory<{
    props: ButtonProps
    defaultRef: HTMLButtonElement
    defaultComponent: 'button'
    stylesNames: ButtonStylesNames
    vars: ButtonCssVariables
    variant: ButtonVariant
}>

const loaderTransition: UITransition = {
    in: { opacity: 1, transform: `translate(-50%, calc(-50% + ${rem(1)}))` },
    out: { opacity: 0, transform: 'translate(-50%, -200%)' },
    common: { transformOrigin: 'center' },
    transitionProperty: 'transform, opacity'
}

const varsResolver = createVarsResolver<ButtonFactory>(
    (theme, { radius, color, gradient, variant, size, justify, autoContrast }) => {
        const colors = theme.variantColorResolver({
            color: color || theme.primaryColor,
            theme,
            gradient,
            variant: variant || 'filled',
            autoContrast
        })

        return {
            root: {
                '--button-justify': justify,
                '--button-height': getSize(size, 'button-height'),
                '--button-padding-x': getSize(size, 'button-padding-x'),
                '--button-fz': size?.includes('compact')
                    ? getFontSize(size.replace('compact-', ''))
                    : getFontSize(size),
                '--button-radius': radius === undefined ? undefined : getRadius(radius),
                '--button-bg': color || variant ? colors.background : undefined,
                '--button-hover': color || variant ? colors.hover : undefined,
                '--button-color': colors.color,
                '--button-bd': color || variant ? colors.border : undefined,
                '--button-hover-color': color || variant ? colors.hoverColor : undefined
            }
        }
    }
)

/**
 * 按钮组件。对齐 ui Button（polymorphicFactory + useStyles + varsResolver + CSS module）。
 * 支持 variant/color/size/radius/gradient/loading/loaderProps/leftSection/rightSection/fullWidth。
 * 样式引擎：CSS module（与 Loader/ActionIcon 一致，不再使用 styled-components）。
 */
export const Button = polymorphicFactory<ButtonFactory>((_props, _ref) => {
    const props = useProps('Button', null, _props)
    const {
        style,
        vars,
        className,
        color,
        disabled,
        children,
        leftSection,
        rightSection,
        fullWidth,
        variant,
        radius,
        loading,
        loaderProps,
        gradient,
        classNames,
        styles,
        unstyled,
        'data-disabled': dataDisabled,
        autoContrast,
        mod,
        attributes,
        ...others
    } = props

    const getStyles = useStyles<ButtonFactory>({
        name: 'Button',
        props,
        classes,
        className,
        style,
        classNames,
        styles,
        unstyled,
        attributes,
        vars,
        varsResolver
    })

    const hasLeftSection = !!leftSection
    const hasRightSection = !!rightSection

    return (
        <UnstyledButton
            {...getStyles('root', { active: !disabled && !loading && !dataDisabled })}
            unstyled={unstyled}
            variant={variant}
            disabled={disabled || loading}
            ref={_ref}
            mod={[
                {
                    disabled: disabled || dataDisabled,
                    loading,
                    block: fullWidth,
                    'with-left-section': hasLeftSection,
                    'with-right-section': hasRightSection
                },
                mod
            ]}
            {...others}
        >
            {typeof loading === 'boolean' && (
                <Transition mounted={loading} transition={loaderTransition} duration={150}>
                    {transitionStyles => (
                        <Box component="span" {...getStyles('loader', { style: transitionStyles })} aria-hidden>
                            <Loader
                                color="var(--button-color)"
                                size="calc(var(--button-height) / 1.8)"
                                {...loaderProps}
                            />
                        </Box>
                    )}
                </Transition>
            )}

            <span {...getStyles('inner')}>
                {leftSection && (
                    <Box component="span" {...getStyles('section')} mod={{ position: 'left' }}>
                        {leftSection}
                    </Box>
                )}

                <Box component="span" mod={{ loading }} {...getStyles('label')}>
                    {children}
                </Box>

                {rightSection && (
                    <Box component="span" {...getStyles('section')} mod={{ position: 'right' }}>
                        {rightSection}
                    </Box>
                )}
            </span>
        </UnstyledButton>
    )
})

Button.classes = classes
;(Button as any).varsResolver = varsResolver
Button.displayName = '@react-ui/ui/Button'
Button.Group = ButtonGroup
Button.GroupSection = ButtonGroupSection

export namespace Button {
    export type Props = ButtonProps
    export type StylesNames = ButtonStylesNames
    export type CssVariables = ButtonCssVariables
    export type Factory = ButtonFactory
    export type Variant = ButtonVariant
    export type Size = ButtonSize
}
