import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { UIContext, type UIContextValue } from './UI.context'
import { UIThemeProvider } from './UIThemeProvider'
import { ThemeProvider } from '../ThemeProvider/ThemeProvider'
import type { UIColorScheme } from './theme.types'
import type { UIThemeOverrides } from '../types/theme.types'
import {
    defaultCssVariablesResolver,
    type CSSVariablesResolver
} from './UICssVariables/default-css-variables-resolver'

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
    /** CSS 变量解析器，默认 defaultCssVariablesResolver */
    cssVariablesResolver?: CSSVariablesResolver
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
    cssVariablesResolver = defaultCssVariablesResolver,
    env = 'default'
}: UIProviderProps) {
    const [internalColorScheme, setInternalColorScheme] = useState<UIColorScheme>('light')
    const colorScheme = controlledColorScheme ?? internalColorScheme

    const setColorScheme = useCallback(
        (value: UIColorScheme) => {
            if (!controlledColorScheme) {
                setInternalColorScheme(value)
            }
        },
        [controlledColorScheme]
    )

    const clearColorScheme = useCallback(() => {
        setInternalColorScheme('light')
    }, [])

    const getRootElement = useCallback(
        () => (typeof document !== 'undefined' ? document.documentElement : undefined),
        []
    )

    const value: UIContextValue = useMemo(
        () => ({
            colorScheme,
            setColorScheme,
            clearColorScheme,
            getRootElement,
            classNamesPrefix,
            getStyleNonce: () => undefined,
            cssVariablesResolver,
            cssVariablesSelector,
            withStaticClasses,
            headless,
            stylesTransform: undefined,
            env
        }),
        [
            colorScheme,
            setColorScheme,
            clearColorScheme,
            getRootElement,
            classNamesPrefix,
            cssVariablesResolver,
            cssVariablesSelector,
            withStaticClasses,
            headless,
            env
        ]
    )

    useEffect(() => {
        if (typeof document === 'undefined') return
        const root = getRootElement()
        if (!root) return
        root.setAttribute('data-ui-color-scheme', colorScheme)
    }, [colorScheme, getRootElement])

    return (
        <UIContext.Provider value={value}>
            <UIThemeProvider theme={theme}>
                <ThemeProvider theme={theme}>{children}</ThemeProvider>
            </UIThemeProvider>
        </UIContext.Provider>
    )
}

UIProvider.displayName = '@react-ui/ui/UIProvider'
