import {
    Box,
    createScopedKeydownHandler,
    factory,
    useProps,
    type BoxProps,
    type CompoundStylesApiProps,
    type ElementProps,
    type Factory
} from '../../../core'
import { UnstyledButton } from '../../UnstyledButton'
import { useAccordionContext } from '../Accordion.context'
import classes from '../Accordion.module.css'
import { useAccordionItemContext } from '../AccordionItem.context'

export type AccordionControlStylesNames = 'control' | 'chevron' | 'label' | 'itemTitle' | 'icon'

/**
 * Accordion 控件的属性接口
 *
 * @extends BoxProps 继承基础盒子属性
 * @extends CompoundStylesApiProps<AccordionControlFactory> 继承复合样式API属性
 * @extends ElementProps<'button'> 继承按钮元素属性
 * @property {boolean} [disabled] 设置禁用属性，阻止交互
 * @property {React.ReactNode} [chevron] 自定义展开/折叠图标
 * @property {React.ReactNode} [children] 控件标签内容
 * @property {React.ReactNode} [icon] 显示在标签旁的图标
 */
export interface AccordionControlProps
    extends BoxProps,
        CompoundStylesApiProps<AccordionControlFactory>,
        ElementProps<'button'> {
    disabled?: boolean
    chevron?: React.ReactNode
    children?: React.ReactNode
    icon?: React.ReactNode
}

/**
 * 定义 Accordion 控制组件的工厂类型
 *
 * @template Props - 组件属性类型，应为 AccordionControlProps
 * @template Ref - 组件引用类型，应为 HTMLButtonElement
 * @template StylesNames - 样式名称类型，应为 AccordionControlStylesNames
 * @template Compound - 是否为复合组件，固定为 true
 */
export type AccordionControlFactory = Factory<{
    props: AccordionControlProps
    ref: HTMLButtonElement
    stylesNames: AccordionControlStylesNames
    compound: true
}>

export const AccordionControl = factory<AccordionControlFactory>((props, ref) => {
    const {
        classNames,
        className,
        style,
        styles,
        vars,
        chevron,
        icon,
        onClick,
        onKeyDown,
        children,
        disabled,
        mod,
        ...others
    } = useProps('AccordionControl', null, props)

    const { value } = useAccordionItemContext()
    const ctx = useAccordionContext()
    const isActive = ctx.isItemActive(value)
    const shouldWrapWithHeading = typeof ctx.order === 'number'
    const Heading = `h${ctx.order!}` as const

    const content = (
        <UnstyledButton<'button'>
            {...others}
            {...ctx.getStyles('control', { className, classNames, style, styles, variant: ctx.variant })}
            unstyled={ctx.unstyled}
            mod={['accordion-control', { active: isActive, 'chevron-position': ctx.chevronPosition, disabled }, mod]}
            ref={ref}
            onClick={event => {
                onClick?.(event)
                ctx.onChange(value)
            }}
            type="button"
            disabled={disabled}
            aria-expanded={isActive}
            aria-controls={ctx.getRegionId(value)}
            id={ctx.getControlId(value)}
            onKeyDown={createScopedKeydownHandler({
                siblingSelector: '[data-accordion-control]',
                parentSelector: '[data-accordion]',
                activateOnFocus: false,
                loop: ctx.loop,
                orientation: 'vertical',
                onKeyDown
            })}
        >
            <Box
                component="span"
                mod={{ rotate: !ctx.disableChevronRotation && isActive, position: ctx.chevronPosition }}
                {...ctx.getStyles('chevron', { classNames, styles })}
            >
                {chevron || ctx.chevron}
            </Box>
            <span {...ctx.getStyles('label', { classNames, styles })}>{children}</span>
            {icon && (
                <Box
                    component="span"
                    mod={{ 'chevron-position': ctx.chevronPosition }}
                    {...ctx.getStyles('icon', { classNames, styles })}
                >
                    {icon}
                </Box>
            )}
        </UnstyledButton>
    )

    return shouldWrapWithHeading ? (
        <Heading {...ctx.getStyles('itemTitle', { classNames, styles })}>{content}</Heading>
    ) : (
        content
    )
})

AccordionControl.displayName = '@react-ui/ui/AccordionControl'
AccordionControl.classes = classes
