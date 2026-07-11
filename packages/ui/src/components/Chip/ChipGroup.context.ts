import { createContext, useContext } from 'react'

export interface ChipGroupContextValue {
    isChipSelected: (value: string) => boolean
    onChange: (value: string) => void
    multiple: boolean | undefined
}

export const ChipGroupContext = createContext<ChipGroupContextValue | null>(null)

export function useChipGroupContext() {
    return useContext(ChipGroupContext)
}
