import { createContext, useContext } from 'react'

export interface TooltipGroupContextValue {
    openDelay?: number
    closeDelay?: number
}

export const TooltipGroupContext = createContext<TooltipGroupContextValue>({})

export const TooltipGroupProvider = TooltipGroupContext.Provider

export function useTooltipGroupContext(): TooltipGroupContextValue {
    return useContext(TooltipGroupContext)
}
