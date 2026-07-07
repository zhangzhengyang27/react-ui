import React, { useState } from 'react'

import { MantineContext, type MantineContextValue } from './Mantine.context'
import { MantineThemeProvider } from './MantineThemeProvider'
import { ThemeProvider } from '../ThemeProvider/ThemeProvider'
import type { MantineColorScheme } from './theme.types'
import type { UIThemeOverrides } from '../types/theme.types'

export interface MantineProviderProps {
    /** 主题覆盖，与默认主题合并 */
    theme?: UIThemeOverrides
    /** CSS 类名前缀，默认 'mantine' */
    classNamesPrefix?: string
    /** 是否生成静态类名，默认 true */
    withStaticClasses?: boolean
    /** 无头模式（不包含默认样式），默认 false */
    headless?: boolean
    /** CSS 变量选择器，默认 ':root' */
    cssVariablesSelector?: string
    /** 运行环境，默认 'default' */
    env?: 'default' | 'test'
    /** 子节点 */
    children?: React.ReactNode
}

/**
 * 填充 MantineContext（styles-api 依赖），并委托 ThemeProvider 提供主题。
 * 这是 react-ui 对齐 mantine 的核心 Provider（P0 阻断项修复）。
 */
export function MantineProvider({
    theme,
    children,
    classNamesPrefix = 'mantine',
    withStaticClasses = true,
    headless = false,
    cssVariablesSelector = ':root',
    env = 'default'
}: MantineProviderProps) {
    const [colorScheme, setColorScheme] = useState<MantineColorScheme>('light')

    const value: MantineContextValue = {
        colorScheme,
        setColorScheme,
        clearColorScheme: () => setColorScheme('light'),
        getRootElement: () => (typeof document !== 'undefined' ? document.documentElement : undefined),
        classNamesPrefix,
        getStyleNonce: () => undefined,
        cssVariablesResolver: undefined,
        cssVariablesSelector,
        withStaticClasses,
        headless,
        stylesTransform: undefined,
        env
    }

    return (
        <MantineContext.Provider value={value}>
            <MantineThemeProvider theme={theme}>
                <ThemeProvider theme={theme}>{children}</ThemeProvider>
            </MantineThemeProvider>
        </MantineContext.Provider>
    )
}

MantineProvider.displayName = '@react-ui/ui/MantineProvider'
