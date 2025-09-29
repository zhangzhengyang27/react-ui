import { createContext, useContext, useMemo } from 'react'
import { DEFAULT_THEME } from '../default-theme'
import { mergeMantineTheme } from '../merge-mantine-theme'
import { MantineTheme, MantineThemeOverride } from '../theme.types'

/** 创建Mantine主题上下文，用于在组件树中传递主题数据 */
export const MantineThemeContext = createContext<MantineTheme | null>(null)

/** 安全地使用Mantine主题，如果上下文中没有主题则返回默认主题 */
export const useSafeMantineTheme = () => useContext(MantineThemeContext) || DEFAULT_THEME

/**
 * 获取Mantine主题
 * 如果在组件树中找不到MantineProvider会抛出错误
 * @returns Mantine主题对象
 */
export function useMantineTheme() {
    const ctx = useContext(MantineThemeContext)
    if (!ctx) {
        throw new Error(
            '@mantine/core: MantineProvider was not found in component tree, make sure you have it in your app'
        )
    }

    return ctx
}

export interface MantineThemeProviderProps {
    /** 确定是否应从父级MantineProvider继承主题 @default `true` */
    inherit?: boolean

    /** 主题覆盖对象 */
    theme?: MantineThemeOverride

    /** 需要不同主题的应用程序或应用程序的一部分 */
    children?: React.ReactNode
}

/**
 * Mantine主题提供者组件，允许为应用程序的特定部分提供不同的主题
 * @param props - 组件属性
 * @param props.inherit - 是否继承父级主题
 * @param props.theme - 主题覆盖配置
 * @param props.children - 子组件
 */
export function MantineThemeProvider({ theme, children, inherit = true }: MantineThemeProviderProps) {
    const parentTheme = useSafeMantineTheme()
    const mergedTheme = useMemo(
        () => mergeMantineTheme(inherit ? parentTheme : DEFAULT_THEME, theme),
        [theme, parentTheme, inherit]
    )

    return <MantineThemeContext.Provider value={mergedTheme}>{children}</MantineThemeContext.Provider>
}

// 设置组件在 React DevTools 中的显示名称
MantineThemeProvider.displayName = '@mantine/core/MantineThemeProvider'
