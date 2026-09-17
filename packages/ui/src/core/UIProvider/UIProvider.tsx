import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { UIContext, type UIContextValue, type UIStylesTransform } from './UI.context'
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
    /** 色彩方案持久化 localStorage 键，须与 ColorSchemeScript 的 localStorageKey 一致 @default 'ui-color-scheme-value' */
    localStorageKey?: string
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
    /** 样式转换器（如 emotion 集成的 emotionTransform）：启用后 Box 的 sx 与组件 styles 经其转换 */
    stylesTransform?: UIStylesTransform
    /** 获取 style 元素的 nonce（内容安全策略场景），返回 undefined 表示不注入 */
    getStyleNonce?: () => string | undefined
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
    localStorageKey = 'ui-color-scheme-value',
    children,
    classNamesPrefix = 'ui',
    withStaticClasses = true,
    headless = false,
    cssVariablesSelector = ':root',
    cssVariablesResolver = defaultCssVariablesResolver,
    stylesTransform,
    getStyleNonce,
    env = 'default'
}: UIProviderProps) {
    // 嵌套 Provider（未受控时）默认继承外层的颜色方案，而不是固定 light——
    // 否则任何为了覆盖主题变量而嵌套的 <UIProvider theme={...}> 都会把
    // <html> 的 data-ui-color-scheme 全局改写，导致整站主题被劫持
    const parentContext = React.useContext(UIContext)
    const [internalColorScheme, setInternalColorScheme] = useState<UIColorScheme>(
        () => parentContext?.colorScheme ?? 'light'
    )
    const colorScheme = controlledColorScheme ?? internalColorScheme

    // 外层方案变化时同步（如站点在暗色下打开嵌套 Provider 的页面）
    useEffect(() => {
        if (!controlledColorScheme && parentContext?.colorScheme) {
            setInternalColorScheme(parentContext.colorScheme)
        }
    }, [controlledColorScheme, parentContext?.colorScheme])

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
            // 清除后回落父级方案而不是写死 light：嵌套未受控 Provider 在外层 dark 下
            // 调用 clearColorScheme 时，写死 light 会把全局属性翻成浅色、与外层声明冲突
            setInternalColorScheme(parentContext?.colorScheme ?? 'light')
        }
    }, [controlledColorScheme, parentContext?.colorScheme])

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
            getStyleNonce: getStyleNonce ?? (() => undefined),
            cssVariablesResolver,
            cssVariablesSelector,
            withStaticClasses,
            headless,
            stylesTransform,
            localStorageKey,
            env
        }),
        [
            colorScheme,
            setColorScheme,
            clearColorScheme,
            getRootElement,
            classNamesPrefix,
            getStyleNonce,
            cssVariablesResolver,
            cssVariablesSelector,
            withStaticClasses,
            headless,
            stylesTransform,
            localStorageKey,
            env
        ]
    )

    // matchMedia 读取放在 effect 内，避免渲染期访问（SSR / jsdom 环境不安全）；
    // auto 模式下订阅系统偏好变化实时同步属性，非 auto 时仅在 colorScheme 变化时写入。
    // data-ui-color-scheme 挂在 document.documentElement（全局唯一）：嵌套实例同时写会互相覆盖——
    // 挂载期 passive effects 自底向上执行，内层先写、外层后写并最终胜出，内层受控方案首挂即被抹掉。
    // 约定只有根 Provider（无外层 context）写属性与订阅系统偏好，内层仅向自身子树提供 context 值，
    // 让"谁写属性"确定化（嵌套未受控本就继承外层方案，内层写属性是纯冗余）
    const isRootProvider = parentContext === null
    useEffect(() => {
        if (!isRootProvider || typeof document === 'undefined') return
        const root = getRootElement()
        if (!root) return

        root.setAttribute('data-ui-color-scheme', resolveColorScheme(colorScheme))

        if (colorScheme !== 'auto') return undefined

        let query: MediaQueryList
        try {
            query = window.matchMedia('(prefers-color-scheme: dark)')
        } catch {
            return undefined
        }
        const onSystemChange = () => {
            root.setAttribute('data-ui-color-scheme', getSystemColorScheme())
        }
        query.addEventListener('change', onSystemChange)
        return () => query.removeEventListener('change', onSystemChange)
    }, [isRootProvider, colorScheme, getRootElement])

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
