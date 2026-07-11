import { createContext, useContext } from 'react'
import type { GetStylesApi } from '../../core'
import type { ProgressFactory } from './Progress'

interface ProgressContextValue {
    getStyles: GetStylesApi<ProgressFactory>
}

export const ProgressContext = createContext<ProgressContextValue | null>(null)

export function useProgressContext() {
    return useContext(ProgressContext)
}
