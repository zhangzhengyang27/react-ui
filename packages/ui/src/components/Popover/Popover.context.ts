import { createSafeContext, GetStylesApi } from '../../core'
import type { PopoverFactory } from './Popover'

export interface PopoverContextValue {
    x: number | undefined
    y: number | undefined
    arrowX: number | undefined
    arrowY: number | undefined
    arrowRef: React.RefObject<HTMLDivElement | null>
    opened: boolean
    reference: (node: HTMLElement | null) => void
    floating: (node: HTMLElement | null) => void
    withArrow: boolean | undefined
    arrowSize: number
    arrowOffset: number
    arrowRadius: number
    arrowPosition: 'center' | 'side'
    placement: import('../../core').FloatingPosition
    /** hide 中间件结果：触发元素被裁剪出视口时为 true，浮层应隐藏 */
    referenceHidden: boolean
    closeOnEscape: boolean | undefined
    zIndex: string | number | undefined
    width: string | number
    disabled: boolean | undefined
    onClose?: () => void
    onToggle: () => void
    getDropdownId: () => string
    getTargetId: () => string
    /** Popover 生成的默认 id，child 自带 id 被移除时 Target 需回退到该值 */
    uid: string
    /** 由 Popover.Target 调用，当 child 自带 id 时同步到 context，
     *  让 PopoverDropdown 的 aria-labelledby 能正确指向 target */
    setTargetId: (id: string) => void
    controlled: boolean
    trapFocus: boolean | undefined
    withinPortal: boolean | undefined
    portalProps: Record<string, any> | undefined
    withRoles: boolean | undefined
    transitionProps:
        | {
              duration?: number
              timingFunction?: string
              transition?: string
              onEntered?: () => void
              onExited?: () => void
          }
        | undefined
    returnFocus: boolean | undefined
    /** Popover 的 styles api（对齐 Menu 模式经 context 下发），Dropdown/arrow 消费：
     *  让 radius/shadow（varsResolver 产出 CSS 变量）与 classNames/styles/unstyled 真正生效 */
    getStyles: GetStylesApi<PopoverFactory>
}

export const [PopoverContextProvider, usePopoverContext] = createSafeContext<PopoverContextValue>(
    'Popover component was not found in the tree'
)
