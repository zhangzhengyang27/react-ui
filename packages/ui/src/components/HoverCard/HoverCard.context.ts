import { createSafeContext } from '../../core'

export interface HoverCardContextValue {
    x: number | undefined
    y: number | undefined
    arrowX: number | undefined
    arrowY: number | undefined
    arrowRef: React.RefObject<HTMLDivElement | null>
    opened: boolean | undefined
    reference: (node: HTMLElement | null) => void
    floating: (node: HTMLElement | null) => void
    getFloatingProps: (userProps?: React.HTMLProps<HTMLElement>) => Record<string, unknown>
    getReferenceProps: (userProps?: React.HTMLProps<HTMLElement>) => Record<string, unknown>
    width: React.CSSProperties['width']
    withArrow: boolean | undefined
    arrowSize: number
    arrowOffset: number
    arrowRadius: number
    arrowPosition: 'center' | 'side'
    placement: import('../../core').FloatingPosition
    zIndex: string | number | undefined
    onClose?: () => void
    getDropdownId: () => string
    getTargetId: () => string
    /** HoverCard 生成的默认 id，child 自带 id 被移除时 Target 需回退到该值 */
    uid: string
    /** 由 HoverCard.Target 调用，当 child 自带 id 时同步到 context，
     *  让 HoverCardDropdown 的 aria-labelledby 能正确指向 target */
    setTargetId: (id: string) => void
    controlled: boolean
    disabled: boolean | undefined
    transitionProps?: import('../Transition').TransitionOverride
}

export const [HoverCardContextProvider, useHoverCardContext] = createSafeContext<HoverCardContextValue>(
    'HoverCard component was not found in the tree'
)
