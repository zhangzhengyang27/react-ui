import { createContext, useContext } from 'react'

export interface ListContextValue {
    icon?: React.ReactNode
    center?: boolean
    type?: 'ordered' | 'unordered'
}

export const ListContext = createContext<ListContextValue>({})

export function useListContext() {
    return useContext(ListContext)
}
