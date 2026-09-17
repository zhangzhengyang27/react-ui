import { createContext, useCallback, useMemo, useState } from 'react'
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

    // 身份稳定：id 已存在时返回原数组引用。否则 Drawer 挂载 effect 的重复注册
    // 会永远产生新数组身份 → Stack 重渲染 → context value 更新 → Drawer effect 重跑，
    // 形成 "Maximum update depth exceeded" 无限循环
    const addModal = useCallback((id: string, zIndex: number | string) => {
        setStack((current) => (current.includes(id) ? current : [...current, id]))
        setMaxZIndex((current) =>
            typeof zIndex === 'number' && typeof current === 'number'
                ? Math.max(current, zIndex)
                : current
        )
    }, [])

    // 身份稳定：id 不在栈内时返回原数组引用，避免无谓重渲染
    const removeModal = useCallback((id: string) => {
        setStack((current) => {
            if (!current.includes(id)) {
                return current
            }
            return current.filter((currentId) => currentId !== id)
        })
    }, [])

    const getZIndex = useCallback(
        (id: string) => `calc(${maxZIndex} + ${stack.indexOf(id)} + 1)`,
        [maxZIndex, stack]
    )

    // context value 必须 useMemo：内联字面量每次渲染都是新对象，
    // 作为 consumer 的 Drawer 其 effect 依赖 stackCtx，会反复 cleanup/setup 陷入无限循环
    const value = useMemo<DrawerStackContextValue>(
        () => ({
            stack,
            addModal,
            removeModal,
            getZIndex,
            currentId: stack[stack.length - 1],
            maxZIndex
        }),
        [stack, addModal, removeModal, getZIndex, maxZIndex]
    )

    return <DrawerStackContext.Provider value={value}>{children}</DrawerStackContext.Provider>
}

DrawerStack.displayName = '@xiaoye-react/ui/DrawerStack'
