import { createContext, useContext } from 'react'

export interface RadioGroupContextValue {
    value: string
    onChange: (value: string) => void
    name?: string
}

export const RadioGroupContext = createContext<RadioGroupContextValue | null>(null)

export function useRadioGroupContext() {
    return useContext(RadioGroupContext)
}
