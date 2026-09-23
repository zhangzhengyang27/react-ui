import { createContext, useContext } from 'react'
import { ConvertCSSVariablesInput } from './convert-css-variables'
import type { UIColorScheme, UITheme } from './theme.types'

/**
 * 样式转换器接口
 * 定义了样式转换的相关方法
 */
export interface UIStylesTransform {
    /**
     * sx 属性转换函数。
     * **它是 hook 形状的工厂**：实现里会调 useUITheme()/useCss()，因此只能在组件或
     * 自定义 hook 的渲染顶层调用一次（Box 就是这么用的），不能放在回调、条件分支或
     * effect 里调用。实现函数以 use 前缀命名，让 rules-of-hooks 能识别。
     */
    sx?: () => (sx: any) => string

    /**
     * styles 属性转换函数。调用约束与 sx 相同（同样是 hook 形状的工厂）。
     */
    styles?: () => (styles: any, payload: any) => Record<string, string>
}

/**
 * UI 上下文值接口。包含了 UIProvider 提供的所有配置和方法
 */
export interface UIContextValue {
    /** 当前的颜色方案（浅色/深色）*/
    colorScheme: UIColorScheme

    /**
     * 设置颜色方案的方法
     * @param colorScheme - 要设置的颜色方案
     */
    setColorScheme: (colorScheme: UIColorScheme) => void

    /** 清除颜色方案设置 */
    clearColorScheme: () => void

    /**
     * 获取根元素的方法
     * @returns 根 HTML 元素或 undefined
     */
    getRootElement: () => HTMLElement | undefined

    /** CSS 类名前缀 */
    classNamesPrefix: string

    /**
     * 色彩方案持久化 localStorage 键
     * useUIColorScheme 的 setColorScheme/clearColorScheme 据此写入/移除，供 ColorSchemeScript 启动回显
     */
    localStorageKey?: string

    /**
     * 获取样式 nonce 的方法（用于内容安全策略）
     * @returns nonce 字符串或 undefined
     */
    getStyleNonce?: () => string | undefined

    /**
     * CSS 变量解析器
     * @param theme - UI 主题对象
     * @returns CSS 变量输入对象
     */
    cssVariablesResolver?: (theme: UITheme) => ConvertCSSVariablesInput

    /** CSS 变量选择器 */
    cssVariablesSelector: string

    /** 是否使用静态类名 */
    withStaticClasses: boolean

    /** 是否启用无头模式（不包含默认样式）*/
    headless?: boolean

    /** 样式转换器 */
    stylesTransform?: UIStylesTransform

    /** 运行环境 */
    env?: 'default' | 'test'
}

/**
 * UI 上下文对象
 * 用于在组件树中传递 UI 配置信息
 */
export const UIContext = createContext<UIContextValue | null>(null)

/**
 * 获取当前 UI 上下文
 * @throws {Error} 如果未在组件树中找到 UIProvider 则抛出错误
 * @returns {UIContextValue} 当前 UI 上下文对象
 */
export function useUIContext() {
    const ctx = useContext(UIContext)

    if (!ctx) {
        throw new Error('[@xiaoye-react/ui] UIProvider was not found in tree')
    }

    return ctx
}

/**
 * 获取 CSS 变量解析器
 * @returns CSS 变量解析函数
 */
export function useUICssVariablesResolver() {
    return useUIContext().cssVariablesResolver
}

/**
 * 获取类名前缀
 * @returns 类名前缀字符串
 */
export function useUIClassNamesPrefix() {
    return useUIContext().classNamesPrefix
}

/**
 * 获取样式 nonce 函数
 * @returns 获取 nonce 的函数
 */
export function useUIStyleNonce() {
    return useUIContext().getStyleNonce
}

/**
 * 检查是否使用静态类名
 * @returns 是否使用静态类名的布尔值
 */
export function useUIWithStaticClasses() {
    return useUIContext().withStaticClasses
}

/**
 * 检查是否启用无头模式
 * @returns 是否启用无头模式的布尔值
 */
export function useUIIsHeadless() {
    return useUIContext().headless
}

/**
 * 获取 sx 样式转换器
 * @returns sx 转换函数
 */
export function useUISxTransform() {
    return useUIContext().stylesTransform?.sx
}

/**
 * 获取 styles 样式转换器
 * @returns styles 转换函数
 */
export function useUIStylesTransform() {
    return useUIContext().stylesTransform?.styles
}

/**
 * 获取当前运行环境
 * @returns 运行环境字符串，默认为 'default'
 */
export function useUIEnv() {
    return useUIContext().env || 'default'
}
