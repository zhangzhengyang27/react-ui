import { Box, BoxProps, CompoundStylesApiProps, ElementProps, factory, Factory, useProps } from '../../../core'
import { useAccordionContext } from '../Accordion.context'
import { AccordionItemProvider } from '../AccordionItem.context'
import classes from '../Accordion.module.css'

export type AccordionItemStylesNames = 'item'

export interface AccordionItemProps
    extends BoxProps,
        CompoundStylesApiProps<AccordionItemFactory>,
        ElementProps<'div'> {
    /** Value that is used to manage the accordion state */
    value: string
}

/**
 * 定义 AccordionItem 组件的工厂类型
 *
 * @template {object} T - 工厂配置对象类型
 * @property {AccordionItemProps} props - 组件属性类型
 * @property {HTMLDivElement} ref - 组件引用类型
 * @property {AccordionItemStylesNames} stylesNames - 组件样式名称类型
 * @property {boolean} compound - 是否为复合组件
 */
export type AccordionItemFactory = Factory<{
    props: AccordionItemProps
    ref: HTMLDivElement
    stylesNames: AccordionItemStylesNames
    compound: true
}>

export const AccordionItem = factory<AccordionItemFactory>((props, ref) => {
    const { classNames, className, style, styles, vars, value, mod, ...others } = useProps('AccordionItem', null, props)
    const ctx = useAccordionContext()

    return (
        <AccordionItemProvider value={{ value }}>
            <Box
                ref={ref}
                mod={[{ active: ctx.isItemActive(value) }, mod]}
                {...ctx.getStyles('item', { className, classNames, styles, style, variant: ctx.variant })}
                {...others}
            />
        </AccordionItemProvider>
    )
})

AccordionItem.displayName = '@react-ui/ui/AccordionItem'
AccordionItem.classes = classes
