import { createSafeContext, GetStylesApi } from '../../core'
import type { AccordionFactory } from './Accordion'
import { AccordionChevronPosition, AccordionHeadingOrder } from './Accordion.types'

/**
 * 定义 Accordion 组件的上下文接口
 * @property {boolean} [loop] - 是否允许循环切换
 * @property {number} [transitionDuration] - 过渡动画持续时间(毫秒)
 * @property {boolean} [disableChevronRotation] - 是否禁用箭头旋转动画
 * @property {AccordionChevronPosition} [chevronPosition] - 箭头图标位置
 * @property {AccordionHeadingOrder} [order] - 标题排序方式
 * @property {React.ReactNode} chevron - 自定义箭头图标
 * @property {function} onChange - 切换项时的回调函数
 * @property {function} isItemActive - 检查项是否激活状态
 * @property {function} getControlId - 获取控制元素ID
 * @property {function} getRegionId - 获取区域元素ID
 * @property {GetStylesApi<AccordionFactory>} getStyles - 获取样式API
 * @property {string} [variant] - 组件变体名称
 * @property {boolean} [unstyled] - 是否禁用默认样式
 */
interface AccordionContext {
    loop: boolean | undefined
    transitionDuration: number | undefined
    disableChevronRotation: boolean | undefined
    chevronPosition: AccordionChevronPosition | undefined
    order: AccordionHeadingOrder | undefined
    chevron: React.ReactNode
    onChange: (value: string) => void
    isItemActive: (value: string) => boolean
    getControlId: (value: string) => string
    getRegionId: (value: string) => string
    getStyles: GetStylesApi<AccordionFactory>
    variant: string | undefined
    unstyled: boolean | undefined
}

export const [AccordionProvider, useAccordionContext] = createSafeContext<AccordionContext>(
    'Accordion component was not found in the tree'
)
