import {
    factory,
    useProps,
    type BoxProps,
    type CompoundStylesApiProps,
    type ElementProps,
    type Factory
} from '../../../core'
import { useAccordionContext } from '../Accordion.context'
import { useAccordionItemContext } from '../AccordionItem.context'
import { Collapse } from '../../Collapse'
import classes from '../Accordion.module.css'

/**
 * 定义 Accordion 组件面板的样式名称类型
 *
 * 包含 'panel' 和 'content' 两种样式名称
 */
export type AccordionPanelStylesNames = 'panel' | 'content'

export interface AccordionPanelProps
    extends BoxProps,
        CompoundStylesApiProps<AccordionPanelFactory>,
        ElementProps<'div'> {
    /** Called when the panel animation completes */
    onTransitionEnd?: () => void
}

export type AccordionPanelFactory = Factory<{
    props: AccordionPanelProps
    ref: HTMLDivElement
    stylesNames: AccordionPanelStylesNames
    compound: true
}>

export const AccordionPanel = factory<AccordionPanelFactory>((props, ref) => {
    const { classNames, className, style, styles, vars, children, ...others } = useProps('AccordionPanel', null, props)

    const { value } = useAccordionItemContext()
    const ctx = useAccordionContext()

    return (
        <Collapse
            ref={ref}
            {...ctx.getStyles('panel', { className, classNames, style, styles })}
            {...others}
            expanded={ctx.isItemActive(value)}
            transitionDuration={ctx.transitionDuration ?? 200}
            role="region"
            id={ctx.getRegionId(value)}
            aria-labelledby={ctx.getControlId(value)}
        >
            <div {...ctx.getStyles('content', { classNames, styles })}>{children}</div>
        </Collapse>
    )
})

AccordionPanel.displayName = '@mantine/core/AccordionPanel'
AccordionPanel.classes = classes
