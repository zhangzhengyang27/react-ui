import { createContext, useContext } from 'react'

export interface CheckboxGroupContextValue {
    value: string[]
    onChange: (value: string[]) => void
    name?: string
}

export const CheckboxGroupContext = createContext<CheckboxGroupContextValue | null>(null)

export function useCheckboxGroupContext() {
    return useContext(CheckboxGroupContext)
}
