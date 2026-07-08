import { createContext, useContext } from 'react'

export interface SplitterContextValue {
    orientation: 'horizontal' | 'vertical'
    sizes: number[]
    setSizes: (sizes: number[]) => void
    containerRef: React.RefObject<HTMLDivElement | null>
}

export const SplitterContext = createContext<SplitterContextValue | null>(null)

export function useSplitterContext() {
    const ctx = useContext(SplitterContext)
    if (!ctx) {
        throw new Error('Splitter subcomponents must be used inside <Splitter />')
    }
    return ctx
}
