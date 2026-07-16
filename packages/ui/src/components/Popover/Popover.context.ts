import { createSafeContext } from '../../core'

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
    withinPortal: boolean | undefined
    closeOnEscape: boolean | undefined
    zIndex: string | number | undefined
    width: string | number
    disabled: boolean | undefined
    onClose?: () => void
    onToggle: () => void
    getDropdownId: () => string
    getTargetId: () => string
    controlled: boolean
    transitionProps?: import('../Transition').TransitionOverride
    trapFocus: boolean | undefined
}

export const [PopoverContextProvider, usePopoverContext] = createSafeContext<PopoverContextValue>(
    'Popover component was not found in the tree'
)
