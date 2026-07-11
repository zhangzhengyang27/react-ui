import { TooltipGroupProvider } from './Tooltip.context'

export interface TooltipGroupProps {
    /** Group children */
    children: React.ReactNode

    /** Open delay in ms, applied to all child Tooltips */
    openDelay?: number

    /** Close delay in ms, applied to all child Tooltips */
    closeDelay?: number
}

export function TooltipGroup({ children, openDelay, closeDelay }: TooltipGroupProps) {
    return <TooltipGroupProvider value={{ openDelay, closeDelay }}>{children}</TooltipGroupProvider>
}
