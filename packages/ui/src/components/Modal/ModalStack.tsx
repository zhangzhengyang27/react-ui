import { createContext, useState } from 'react'
import { getDefaultZIndex } from '../../core'

interface ModalStackContextValue {
    stack: string[]
    addModal: (id: string, zIndex: number | string) => void
    removeModal: (id: string) => void
    getZIndex: (id: string) => string
    currentId: string
    maxZIndex: string | number
}

export const ModalStackContext = createContext<ModalStackContextValue | null>(null)

export interface ModalStackProps {
    children: React.ReactNode
}

export function ModalStack({ children }: ModalStackProps) {
    const [stack, setStack] = useState<string[]>([])
    const [maxZIndex, setMaxZIndex] = useState<number | string>(getDefaultZIndex('modal'))

    return (
        <ModalStackContext.Provider
            value={{
                stack,
                addModal: (id: string, zIndex: number | string) => {
                    setStack((current) => [...new Set([...current, id])])
                    setMaxZIndex((current) =>
                        typeof zIndex === 'number' && typeof current === 'number'
                            ? Math.max(current, zIndex)
                            : current
                    )
                },
                removeModal: (id: string) => setStack((current) => current.filter((currentId) => currentId !== id)),
                getZIndex: (id: string) => `calc(${maxZIndex} + ${stack.indexOf(id)} + 1)`,
                currentId: stack[stack.length - 1],
                maxZIndex
            }}
        >
            {children}
        </ModalStackContext.Provider>
    )
}

ModalStack.displayName = '@xiaoye-react/ui/ModalStack'

export namespace ModalStack {
    export type Props = ModalStackProps
}
