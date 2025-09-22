import { createContext } from 'react'
export interface ContextValue {}

export const Context = createContext<ContextValue | null>(null)
