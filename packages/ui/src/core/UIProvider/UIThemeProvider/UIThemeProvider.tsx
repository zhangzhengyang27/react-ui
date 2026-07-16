import { createContext, useContext, useMemo } from 'react'
import { DEFAULT_THEME } from '../default-theme'
import { mergeUITheme } from '../merge-ui-theme'
import { UITheme, UIThemeOverride } from '../theme.types'

/** 创建UI主题上下文，用于在组件树中传递主题数据 */
export const UIThemeContext = createContext<UITheme | null>(null)

/** 安全地使用UI主题，如果上下文中没有主题则返回默认主题 */
export const useSafeUITheme = () => useContext(UIThemeContext) || DEFAULT_THEME

/**
 * 获取UI主题
 * 如果在组件树中找不到UIProvider会抛出错误
 * @returns UI主题对象
 */
export function useUITheme() {
    const ctx = useContext(UIThemeContext)
    if (!ctx) {
        throw new Error(
            '@react-ui/ui: UIProvider was not found in component tree, make sure you have it in your app'
        )
    }

    return ctx
}

export interface UIThemeProviderProps {
    /** 确定是否应从父级UIProvider继承主题 @default `true` */
    inherit?: boolean

    /** 主题覆盖对象 */
    theme?: UIThemeOverride

    /** 需要不同主题的应用程序或应用程序的一部分 */
    children?: React.ReactNode
}

/**
 * UI主题提供者组件，允许为应用程序的特定部分提供不同的主题
 * @param props - 组件属性
 * @param props.inherit - 是否继承父级主题
 * @param props.theme - 主题覆盖配置
 * @param props.children - 子组件
 */
export function UIThemeProvider({ theme, children, inherit = true }: UIThemeProviderProps) {
    const parentTheme = useSafeUITheme()
    const mergedTheme = useMemo(
        () => mergeUITheme(inherit ? parentTheme : DEFAULT_THEME, theme),
        [theme, parentTheme, inherit]
    )

    return <UIThemeContext.Provider value={mergedTheme}>{children}</UIThemeContext.Provider>
}

// 设置组件在 React DevTools 中的显示名称
UIThemeProvider.displayName = '@react-ui/ui/UIThemeProvider'
