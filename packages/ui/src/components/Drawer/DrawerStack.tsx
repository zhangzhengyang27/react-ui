import { createContext, useState } from 'react'
import { getDefaultZIndex } from '../../core'

interface DrawerStackContextValue {
    stack: string[]
    addModal: (id: string, zIndex: number | string) => void
    removeModal: (id: string) => void
    getZIndex: (id: string) => string
    currentId: string
    maxZIndex: string | number
}

export const DrawerStackContext = createContext<DrawerStackContextValue | null>(null)

export interface DrawerStackProps {
    children: React.ReactNode
}

export function DrawerStack({ children }: DrawerStackProps) {
    const [stack, setStack] = useState<string[]>([])
    const [maxZIndex, setMaxZIndex] = useState<number | string>(getDefaultZIndex('modal'))

    return (
        <DrawerStackContext.Provider
            value={{
                stack,
                addModal: (id, zIndex) => {
                    setStack((current) => [...new Set([...current, id])])
                    setMaxZIndex((current) =>
                        typeof zIndex === 'number' && typeof current === 'number'
                            ? Math.max(current, zIndex)
                            : current
                    )
                },
                removeModal: (id) => setStack((current) => current.filter((currentId) => currentId !== id)),
                getZIndex: (id) => `calc(${maxZIndex} + ${stack.indexOf(id)} + 1)`,
                currentId: stack[stack.length - 1],
                maxZIndex
            }}
        >
            {children}
        </DrawerStackContext.Provider>
    )
}

DrawerStack.displayName = '@react-ui/ui/DrawerStack'
