import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { UIContext, type UIContextValue } from './UI.context'
import { UIThemeProvider } from './UIThemeProvider'
import { UICssVariables } from './UICssVariables/UICssVariables'
import type { UIColorScheme } from './theme.types'
import type { UIThemeOverrides } from '../types/theme.types'
import {
    defaultCssVariablesResolver,
    type CSSVariablesResolver
} from './UICssVariables/default-css-variables-resolver'

export interface UIProviderProps {
    /** 主题覆盖，与默认主题合并 */
    theme?: UIThemeOverrides
    /** 受控颜色方案；'auto' 表示跟随系统偏好 */
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

function getSystemColorScheme(): 'light' | 'dark' {
    try {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    } catch {
        return 'light'
    }
}

function resolveColorScheme(colorScheme: UIColorScheme): 'light' | 'dark' {
    return colorScheme === 'auto' ? getSystemColorScheme() : colorScheme
}

/**
 * 填充 UIContext（styles-api 依赖）、注入主题 CSS 变量并提供主题。
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
        if (!controlledColorScheme) {
            setInternalColorScheme('light')
        }
    }, [controlledColorScheme])

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

    // 无依赖：'auto' 时系统偏好变化会触发本组件重渲染，属性随之同步；
    // matchMedia 读取放在 effect 内，避免渲染期访问（SSR / jsdom 环境不安全）
    useEffect(() => {
        if (typeof document === 'undefined') return
        const root = getRootElement()
        if (!root) return
        root.setAttribute('data-ui-color-scheme', resolveColorScheme(colorScheme))
    })

    return (
        <UIContext.Provider value={value}>
            <UIThemeProvider theme={theme}>
                <UICssVariables />
                {children}
            </UIThemeProvider>
        </UIContext.Provider>
    )
}

UIProvider.displayName = '@xiaoye-react/ui/UIProvider'
