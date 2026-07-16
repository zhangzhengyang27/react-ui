import {
    Box,
    BoxProps,
    createVarsResolver,
    ElementProps,
    factory,
    Factory,
    getFontSize,
    getRadius,
    getSize,
    UIGradient,
    UIRadius,
    UISize,
    StylesApiProps,
    useProps,
    useStyles
} from '../../../core'
import type { ActionIconVariant } from '../ActionIcon'
import classes from '../ActionIcon.module.css'

export type ActionIconGroupSectionStylesNames = 'groupSection'

/**
 * 定义 ActionIconGroupSection 组件的 CSS 变量类型
 *
 * 包含以下可自定义的 CSS 变量：
 * --section-radius: 控制区块圆角
 * --section-bg: 控制区块背景色
 * --section-color: 控制区块文字颜色
 * --section-bd: 控制区块边框样式
 * --section-height: 控制区块高度
 * --section-padding-x: 控制区块水平内边距
 * --section-fz: 控制区块字体大小
 */
export type ActionIconGroupSectionCssVariables = {
    groupSection:
        | '--section-radius'
        | '--section-bg'
        | '--section-color'
        | '--section-bd'
        | '--section-height'
        | '--section-padding-x'
        | '--section-fz'
}

/**
 * ActionIconGroupSection 组件的属性接口
 *
 * @property {UIRadius} [radius] - 设置边框圆角，可以是 `theme.radius` 的键或有效的 CSS 值，默认使用 `theme.defaultRadius`
 * @property {UIGradient} [gradient] - 当 `variant="gradient"` 时使用的渐变值，默认使用 `theme.defaultGradient`
 * @property {boolean} [autoContrast] - 如果设置为 true，在 `filled` 变体下会根据背景色自动调整文本颜色
 * @property {UISize|string|number} [size] - 控制组件的 `height`、`font-size` 和水平 `padding`，默认为 `'sm'`
 */
export interface ActionIconGroupSectionProps
    extends BoxProps,
        StylesApiProps<ActionIconGroupSectionFactory>,
        ElementProps<'div'> {
    radius?: UIRadius
    gradient?: UIGradient
    autoContrast?: boolean
    size?: UISize | (string & {}) | number
}

export type ActionIconGroupSectionFactory = Factory<{
    props: ActionIconGroupSectionProps
    ref: HTMLDivElement
    stylesNames: ActionIconGroupSectionStylesNames
    vars: ActionIconGroupSectionCssVariables
    variant: ActionIconVariant
}>

/**
 * 创建 ActionIconGroupSection 组件的 CSS 变量解析器
 *
 * @param theme - 主题对象，包含颜色和样式配置
 * @param radius - 圆角半径配置
 * @param color - 主色配置
 * @param gradient - 渐变配置
 * @param variant - 变体类型 (如 'filled')
 * @param autoContrast - 是否自动调整对比度
 * @param size - 尺寸配置
 * @returns 包含 CSS 变量定义的对象，用于 ActionIconGroupSection 组件的样式控制
 */
const varsResolver = createVarsResolver<ActionIconGroupSectionFactory>(
    (theme, { radius, color, gradient, variant, autoContrast, size }) => {
        const colors = theme.variantColorResolver({
            color: color || theme.primaryColor,
            theme,
            gradient,
            variant: variant || 'filled',
            autoContrast
        })

        return {
            groupSection: {
                '--section-height': getSize(size, 'section-height'),
                '--section-padding-x': getSize(size, 'section-padding-x'),
                '--section-fz': getFontSize(size),
                '--section-radius': radius === undefined ? undefined : getRadius(radius),
                '--section-bg': color || variant ? colors.background : undefined,
                '--section-color': colors.color,
                '--section-bd': color || variant ? colors.border : undefined
            }
        }
    }
)

export const ActionIconGroupSection = factory<ActionIconGroupSectionFactory>((_props, ref) => {
    const props = useProps('ActionIconGroupSection', null, _props)
    const {
        className,
        style,
        classNames,
        styles,
        unstyled,
        vars,
        variant,
        gradient,
        radius,
        autoContrast,
        attributes,
        ...others
    } = props

    const getStyles = useStyles<ActionIconGroupSectionFactory>({
        name: 'ActionIconGroupSection',
        props,
        classes,
        className,
        style,
        classNames,
        styles,
        unstyled,
        attributes,
        vars,
        varsResolver,
        rootSelector: 'groupSection'
    })

    return <Box {...getStyles('groupSection')} ref={ref} variant={variant} {...others} />
})

ActionIconGroupSection.classes = classes
ActionIconGroupSection.displayName = '@react-ui/ui/ActionIconGroupSection'
