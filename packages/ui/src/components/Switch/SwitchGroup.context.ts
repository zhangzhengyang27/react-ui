import { createContext, useContext } from 'react'

export interface SwitchGroupContextValue {
    value: string[]
    onChange: (value: string[]) => void
    name?: string
}

export const SwitchGroupContext = createContext<SwitchGroupContextValue | null>(null)

export function useSwitchGroupContext() {
    return useContext(SwitchGroupContext)
}
