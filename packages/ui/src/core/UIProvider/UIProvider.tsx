import React, { useEffect, useState } from 'react'

import { UIContext, type UIContextValue } from './UI.context'
import { UIThemeProvider } from './UIThemeProvider'
import { ThemeProvider } from '../ThemeProvider/ThemeProvider'
import type { UIColorScheme } from './theme.types'
import type { UIThemeOverrides } from '../types/theme.types'

export interface UIProviderProps {
    /** 主题覆盖，与默认主题合并 */
    theme?: UIThemeOverrides
    /** 受控颜色方案，传入后将覆盖内部默认的 light 状态 */
    colorScheme?: UIColorScheme
    /** CSS 类名前缀，默认 'ui' */
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
 * 填充 UIContext（styles-api 依赖），并委托 ThemeProvider 提供主题。
 * 这是 react-ui 对齐 ui 的核心 Provider（P0 阻断项修复）。
 */
export function UIProvider({
    theme,
    colorScheme: controlledColorScheme,
    children,
    classNamesPrefix = 'ui',
    withStaticClasses = true,
    headless = false,
    cssVariablesSelector = ':root',
    env = 'default'
}: UIProviderProps) {
    const [internalColorScheme, setInternalColorScheme] = useState<UIColorScheme>('light')
    const colorScheme = controlledColorScheme ?? internalColorScheme

    const setColorScheme = controlledColorScheme
        ? () => {}
        : (value: UIColorScheme) => setInternalColorScheme(value)

    const value: UIContextValue = {
        colorScheme,
        setColorScheme,
        clearColorScheme: () => setInternalColorScheme('light'),
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

    useEffect(() => {
        if (typeof document === 'undefined') return
        const root = value.getRootElement()
        if (!root) return
        root.setAttribute('data-ui-color-scheme', colorScheme)
    }, [colorScheme, value])

    return (
        <UIContext.Provider value={value}>
            <UIThemeProvider theme={theme}>
                <ThemeProvider theme={theme}>{children}</ThemeProvider>
            </UIThemeProvider>
        </UIContext.Provider>
    )
}

UIProvider.displayName = '@react-ui/ui/UIProvider'
