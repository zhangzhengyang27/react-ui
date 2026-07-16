import { useId, useUncontrolled } from '@react-ui/hooks'

import { AccordionProvider } from './Accordion.context'
import { AccordionChevronPosition, AccordionHeadingOrder, AccordionValue } from './Accordion.types'
import { AccordionChevron } from './AccordionChevron'
import { AccordionControl } from './AccordionControl/AccordionControl'
import { AccordionItem } from './AccordionItem/AccordionItem'
import { AccordionPanel } from './AccordionPanel/AccordionPanel'
import classes from './Accordion.module.css'
import {
    Box,
    createVarsResolver,
    getRadius,
    getSafeId,
    getWithProps,
    rem,
    useProps,
    useStyles,
    type BoxProps,
    type ElementProps,
    type ExtendComponent,
    type Factory,
    type UIRadius,
    type UIThemeComponent,
    type StylesApiProps
} from '../../core'

export type AccordionStylesNames =
    | 'root'
    | 'content'
    | 'item'
    | 'panel'
    | 'icon'
    | 'chevron'
    | 'label'
    | 'itemTitle'
    | 'control'

export type AccordionVariant = 'default' | 'contained' | 'filled' | 'separated'

/**
 * 定义 Accordion 组件使用的 CSS 变量类型
 *
 * @property root - 根元素级别的 CSS 变量，包括：
 *   - '--accordion-transition-duration': 折叠动画持续时间
 *   - '--accordion-chevron-size': 折叠图标尺寸
 *   - '--accordion-radius': 组件边框圆角半径
 */
export type AccordionCssVariables = {
    root: '--accordion-transition-duration' | '--accordion-chevron-size' | '--accordion-radius'
}

/**
 * Accordion 组件属性接口
 *
 * @template Multiple - 布尔类型泛型，默认为false，控制是否允许多个面板同时展开
 *
 * @property {Multiple} [multiple] - 如果设置为true，允许多个面板同时展开
 * @property {AccordionValue<Multiple>} [value] - 受控组件的当前值
 * @property {AccordionValue<Multiple>} [defaultValue] - 非受控组件的默认值
 * @property {(value: AccordionValue<Multiple>) => void} [onChange] - 值变化时的回调函数，返回值类型取决于multiple属性
 * @property {boolean} [loop=true] - 是否允许使用方向键循环导航项（从第一个到最后，最后到第一个）
 * @property {number} [transitionDuration=200] - 过渡动画持续时间（毫秒）
 * @property {boolean} [disableChevronRotation] - 是否禁用chevron图标的旋转动画
 * @property {AccordionChevronPosition} [chevronPosition=right] - chevron图标相对于标签的位置
 * @property {number|string} [chevronSize=auto] - chevron图标容器的大小
 * @property {number|string} [chevronIconSize=16] - 默认chevron图标的大小（当未设置chevron属性时生效）
 * @property {AccordionHeadingOrder} [order] - 标题层级顺序（不影响视觉效果）
 * @property {React.ReactNode} [chevron] - 自定义chevron图标
 * @property {UIRadius} [radius=theme.defaultRadius] - 边框圆角大小，可以是theme.radius的键或有效的CSS值
 */
export interface AccordionProps<Multiple extends boolean = false>
    extends BoxProps,
        StylesApiProps<AccordionFactory>,
        ElementProps<'div', 'value' | 'defaultValue' | 'onChange'> {
    multiple?: Multiple
    value?: AccordionValue<Multiple>
    defaultValue?: AccordionValue<Multiple>
    onChange?: (value: AccordionValue<Multiple>) => void
    loop?: boolean
    transitionDuration?: number
    disableChevronRotation?: boolean
    chevronPosition?: AccordionChevronPosition
    chevronSize?: number | string
    chevronIconSize?: number | string
    order?: AccordionHeadingOrder
    chevron?: React.ReactNode
    radius?: UIRadius
}

/**
 * 定义Accordion组件的工厂类型
 *
 * @template AccordionProps - 手风琴组件的属性类型
 * @template HTMLDivElement - 组件引用的DOM元素类型
 * @template AccordionStylesNames - 组件样式名称集合
 * @template AccordionCssVariables - 组件CSS变量集合
 * @template AccordionVariant - 组件变体类型
 */
export type AccordionFactory = Factory<{
    props: AccordionProps
    ref: HTMLDivElement
    stylesNames: AccordionStylesNames
    vars: AccordionCssVariables
    variant: AccordionVariant
}>

/**
 * 组件的默认属性值
 * 当父组件未提供对应prop时使用这些默认值
 */
const defaultProps = {
    multiple: false,
    disableChevronRotation: false,
    chevronPosition: 'right',
    variant: 'default',
    chevronSize: 'auto',
    chevronIconSize: 16
} satisfies Partial<AccordionProps>

/**
 * 生成Accordion组件的根样式对象
 * @param _ - 未使用的参数（占位符）
 * @param transitionDuration - 过渡动画持续时间（毫秒）
 * @param chevronSize - 展开/折叠图标的大小
 * @param radius - 圆角半径
 * @returns 包含CSS变量的样式对象，用于Accordion根元素
 */
const varsResolver = createVarsResolver<AccordionFactory>((_, { transitionDuration, chevronSize, radius }) => ({
    root: {
        '--accordion-transition-duration': transitionDuration === undefined ? undefined : `${transitionDuration}ms`,
        '--accordion-chevron-size': chevronSize === undefined ? undefined : rem(chevronSize),
        '--accordion-radius': radius === undefined ? undefined : getRadius(radius)
    }
}))

export function Accordion<Multiple extends boolean = false>(_props: AccordionProps<Multiple>) {
    const props = useProps('Accordion', defaultProps as AccordionProps<Multiple>, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        children,
        multiple,
        value,
        defaultValue,
        onChange,
        id,
        loop,
        transitionDuration,
        disableChevronRotation,
        chevronPosition,
        chevronSize,
        order,
        chevron,
        variant,
        radius,
        chevronIconSize,
        attributes,
        ...others
    } = props

    const uid = useId(id)
    const [_value, handleChange] = useUncontrolled({
        value,
        defaultValue,
        finalValue: multiple ? ([] as any) : null,
        onChange
    })

    /**
     * 检查给定的itemValue是否是当前选中的值
     * @param itemValue 要检查的值
     * @returns 如果itemValue是当前选中的值则返回true，否则返回false
     */
    const isItemActive = (itemValue: string) =>
        Array.isArray(_value) ? _value.includes(itemValue) : itemValue === _value

    /**
     * 处理手风琴组件中单个项目的值变更
     *
     * @param itemValue - 当前变更的项目的值
     * @returns 根据当前值和multiple模式，返回新的手风琴值
     *
     * 逻辑说明：
     * - 多选模式下：如果值已存在则移除，否则添加
     * - 单选模式下：如果值相同则取消选择(null)，否则设置为新值
     */
    const handleItemChange = (itemValue: string) => {
        const nextValue: AccordionValue<Multiple> = Array.isArray(_value)
            ? _value.includes(itemValue)
                ? _value.filter(selectedValue => selectedValue !== itemValue)
                : [..._value, itemValue]
            : itemValue === _value
              ? null
              : (itemValue as any)

        handleChange(nextValue)
    }

    const getStyles = useStyles<AccordionFactory>({
        name: 'Accordion',
        classes,
        props: props as AccordionProps,
        className,
        style,
        classNames,
        styles,
        unstyled,
        attributes,
        vars,
        varsResolver
    })

    return (
        <AccordionProvider
            value={{
                isItemActive,
                onChange: handleItemChange,
                getControlId: getSafeId(
                    `${uid}-control`,
                    'Accordion.Item component was rendered with invalid value or without value'
                ),
                getRegionId: getSafeId(
                    `${uid}-panel`,
                    'Accordion.Item component was rendered with invalid value or without value'
                ),
                chevron: chevron === null ? null : chevron || <AccordionChevron size={chevronIconSize} />,
                transitionDuration,
                disableChevronRotation,
                chevronPosition,
                order,
                loop,
                getStyles,
                variant,
                unstyled
            }}
        >
            <Box {...getStyles('root')} id={uid} {...others} variant={variant} data-accordion>
                {children}
            </Box>
        </AccordionProvider>
    )
}

/**
 * 扩展Accordion组件样式
 * @param c - 要扩展的Accordion组件工厂
 * @returns 扩展后的UI主题组件
 */
const extendAccordion = (c: ExtendComponent<AccordionFactory>): UIThemeComponent => c

Accordion.extend = extendAccordion
Accordion.withProps = getWithProps<AccordionProps, AccordionProps>(Accordion as any)
Accordion.classes = classes
Accordion.displayName = '@react-ui/ui/Accordion'
Accordion.Item = AccordionItem
Accordion.Panel = AccordionPanel
Accordion.Control = AccordionControl
Accordion.Chevron = AccordionChevron
