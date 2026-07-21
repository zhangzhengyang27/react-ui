import { createContext, useContext } from 'react'

export interface SubMenuContextValue {
    opened: boolean
    close: () => void
    open: () => void
    /** 延迟 openDelay 毫秒后打开（悬停触发时使用，会先清除待定的关闭定时器） */
    openDelayed: () => void
    /** 延迟 closeDelay 毫秒后关闭（悬停离开时使用） */
    closeDelayed: () => void
    parentContext: SubMenuContextValue | null
}

export const SubMenuContext = createContext<SubMenuContextValue | null>(null)

export function useSubMenuContext(): SubMenuContextValue {
    const ctx = useContext(SubMenuContext)
    if (!ctx) {
        throw new Error('Menu.Sub component was not found in tree')
    }
    return ctx
}
