import { createContext, useContext } from 'react'

/**
 * 创建一个安全的React Context，包含Provider和自定义hook
 *
 * @template ContextValue - Context值的类型
 * @param {string} errorMessage - 当Context未提供时抛出的错误信息
 * @returns {readonly [React.ComponentType<{value: ContextValue, children: React.ReactNode}>, () => ContextValue]}
 * 返回一个包含Provider组件和useSafeContext hook的元组
 *
 * @remarks
 * 使用返回的useSafeContext hook时，如果Context未提供(值为null)，会抛出指定的错误信息
 * 返回的Provider组件封装了原始的Context.Provider，接受value和children作为props
 */
export function createSafeContext<ContextValue>(errorMessage: string) {
    const Context = createContext<ContextValue | null>(null)

    const useSafeContext = () => {
        const ctx = useContext(Context)

        if (ctx === null) {
            throw new Error(errorMessage)
        }

        return ctx
    }

    const Provider = ({ children, value }: { value: ContextValue; children: React.ReactNode }) => (
        <Context.Provider value={value}>{children}</Context.Provider>
    )

    return [Provider, useSafeContext] as const
}
