import {
    Box,
    BoxProps,
    createVarsResolver,
    getRadius,
    getSize,
    UIColor,
    UIGradient,
    UIRadius,
    UISize,
    polymorphicFactory,
    PolymorphicFactory,
    StylesApiProps,
    useProps,
    useStyles
} from '../../core'
import { UnstyledButton } from '../UnstyledButton'
import { ActionIconGroup } from './ActionIconGroup/ActionIconGroup'
import { ActionIconGroupSection } from './ActionIconGroupSection/ActionIconGroupSection'
import classes from './ActionIcon.module.css'

import { Loader, LoaderProps } from '../Loader'
import { Transition } from '../Transition'

export type ActionIconVariant =
    | 'filled'
    | 'light'
    | 'outline'
    | 'transparent'
    | 'white'
    | 'subtle'
    | 'default'
    | 'gradient'

/**
 * 定义 ActionIcon 组件的样式名称类型
 *
 * 包含的样式名称：
 * - root: 根元素样式
 * - loader: 加载器样式
 * - icon: 图标样式
 */
export type ActionIconStylesNames = 'root' | 'loader' | 'icon'

export type ActionIconCssVariables = {
    root: '--ai-radius' | '--ai-size' | '--ai-bg' | '--ai-hover' | '--ai-hover-color' | '--ai-color' | '--ai-bd'
}

/**
 * ActionIcon 组件属性接口
 *
 * @property {'data-disabled'} data-disabled - 禁用状态的数据属性
 * @property {string} __staticSelector - 静态选择器
 * @property {boolean} loading - 如果设置为true，将显示加载器而不是子元素
 * @property {LoaderProps} loaderProps - 传递给加载器组件的属性，仅在loading为true时生效
 * @property {UISize|`input-${UISize}`|string|number} size - 控制按钮的宽度和高度，数字会被转换为rem单位，默认为'md'
 * @property {UIColor} color - 主题颜色键或有效的CSS颜色，默认为theme.primaryColor
 * @property {UIRadius} radius - 主题圆角键或有效的CSS圆角值，数字会被转换为rem，默认为theme.defaultRadius
 * @property {UIGradient} gradient - 渐变值，与variant="gradient"一起使用，默认为theme.defaultGradient
 * @property {boolean} disabled - 设置disabled属性，阻止交互
 * @property {React.ReactNode} children - 图标元素
 * @property {boolean} autoContrast - 如果设置为true，会根据背景色调整filled变体的文本颜色
 */
export interface ActionIconProps extends BoxProps, StylesApiProps<ActionIconFactory> {
    'data-disabled'?: boolean
    __staticSelector?: string

    loading?: boolean
    loaderProps?: LoaderProps
    size?: UISize | `input-${UISize}` | (string & {}) | number
    color?: UIColor
    radius?: UIRadius
    gradient?: UIGradient
    disabled?: boolean
    children?: React.ReactNode
    autoContrast?: boolean
}

/**
 * 定义 ActionIcon 组件的工厂类型
 *
 * 这是一个多态工厂类型，用于创建 ActionIcon 组件及其相关组件
 *
 * @template ActionIconProps - ActionIcon 组件的属性类型
 * @template 'button' - 默认的组件标签类型
 * @template HTMLButtonElement - 默认的组件引用类型
 * @template ActionIconStylesNames - ActionIcon 的样式名称类型
 * @template ActionIconVariant - ActionIcon 的变体类型
 * @template ActionIconCssVariables - ActionIcon 的 CSS 变量类型
 * @template {Group: typeof ActionIconGroup, GroupSection: typeof ActionIconGroupSection} - 静态子组件类型
 */
export type ActionIconFactory = PolymorphicFactory<{
    props: ActionIconProps
    defaultComponent: 'button'
    defaultRef: HTMLButtonElement
    stylesNames: ActionIconStylesNames
    variant: ActionIconVariant
    vars: ActionIconCssVariables
    staticComponents: {
        Group: typeof ActionIconGroup
        GroupSection: typeof ActionIconGroupSection
    }
}>

const varsResolver = createVarsResolver<ActionIconFactory>(
    (theme, { size, radius, variant, gradient, color, autoContrast }) => {
        const colors = theme.variantColorResolver({
            color: color || theme.primaryColor,
            theme,
            gradient,
            variant: variant || 'filled',
            autoContrast
        })

        return {
            root: {
                '--ai-size': getSize(size, 'ai-size'),
                '--ai-radius': radius === undefined ? undefined : getRadius(radius),
                '--ai-bg': color || variant ? colors.background : undefined,
                '--ai-hover': color || variant ? colors.hover : undefined,
                '--ai-hover-color': color || variant ? colors.hoverColor : undefined,
                '--ai-color': colors.color,
                '--ai-bd': color || variant ? colors.border : undefined
            }
        }
    }
)

export const ActionIcon = polymorphicFactory<ActionIconFactory>((_props, ref) => {
    const props = useProps('ActionIcon', null, _props)
    const {
        className,
        unstyled,
        variant,
        classNames,
        styles,
        style,
        loading,
        loaderProps,
        size,
        color,
        radius,
        __staticSelector,
        gradient,
        vars,
        children,
        disabled,
        'data-disabled': dataDisabled,
        autoContrast,
        mod,
        attributes,
        ...others
    } = props

    const getStyles = useStyles<ActionIconFactory>({
        name: ['ActionIcon', __staticSelector],
        props,
        className,
        style,
        classes,
        classNames,
        styles,
        unstyled,
        attributes,
        vars,
        varsResolver
    })

    return (
        <UnstyledButton
            {...getStyles('root', { active: !disabled && !loading && !dataDisabled })}
            {...others}
            unstyled={unstyled}
            variant={variant}
            size={size}
            disabled={disabled || loading}
            aria-busy={loading || undefined}
            ref={ref}
            mod={[{ loading, disabled: disabled || dataDisabled }, mod]}
        >
            {typeof loading === 'boolean' && (
                <Transition mounted={loading} transition="slide-down" duration={150}>
                    {transitionStyles => (
                        <Box component="span" {...getStyles('loader', { style: transitionStyles })} aria-hidden>
                            <Loader color="var(--ai-color)" size="calc(var(--ai-size) * 0.55)" {...loaderProps} />
                        </Box>
                    )}
                </Transition>
            )}

            <Box component="span" mod={{ loading }} {...getStyles('icon')}>
                {children}
            </Box>
        </UnstyledButton>
    )
})

ActionIcon.classes = classes
ActionIcon.displayName = '@xiaoye-react/ui/ActionIcon'
ActionIcon.Group = ActionIconGroup
ActionIcon.GroupSection = ActionIconGroupSection
