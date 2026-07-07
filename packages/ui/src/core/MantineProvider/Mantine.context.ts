import { createContext, useContext } from 'react'
import { ConvertCSSVariablesInput } from './convert-css-variables'
import type { MantineColorScheme, MantineTheme } from './theme.types'

/**
 * 样式转换器接口
 * 定义了样式转换的相关方法
 */
export interface MantineStylesTransform {
    /**
     * sx 属性转换函数
     */
    sx?: () => (sx: any) => string

    /**
     * styles 属性转换函数
     */
    styles?: () => (styles: any, payload: any) => Record<string, string>
}

/**
 * Mantine 上下文值接口。包含了 MantineProvider 提供的所有配置和方法
 */
export interface MantineContextValue {
    /** 当前的颜色方案（浅色/深色）*/
    colorScheme: MantineColorScheme

    /**
     * 设置颜色方案的方法
     * @param colorScheme - 要设置的颜色方案
     */
    setColorScheme: (colorScheme: MantineColorScheme) => void

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
     * 获取样式 nonce 的方法（用于内容安全策略）
     * @returns nonce 字符串或 undefined
     */
    getStyleNonce?: () => string | undefined

    /**
     * CSS 变量解析器
     * @param theme - Mantine 主题对象
     * @returns CSS 变量输入对象
     */
    cssVariablesResolver?: (theme: MantineTheme) => ConvertCSSVariablesInput

    /** CSS 变量选择器 */
    cssVariablesSelector: string

    /** 是否使用静态类名 */
    withStaticClasses: boolean

    /** 是否启用无头模式（不包含默认样式）*/
    headless?: boolean

    /** 样式转换器 */
    stylesTransform?: MantineStylesTransform

    /** 运行环境 */
    env?: 'default' | 'test'
}

/**
 * Mantine 上下文对象
 * 用于在组件树中传递 Mantine 配置信息
 */
export const MantineContext = createContext<MantineContextValue | null>(null)

/**
 * 获取当前 Mantine 上下文
 * @throws {Error} 如果未在组件树中找到 MantineProvider 则抛出错误
 * @returns {MantineContextValue} 当前 Mantine 上下文对象
 */
export function useMantineContext() {
    const ctx = useContext(MantineContext)

    if (!ctx) {
        throw new Error('[@mantine/core] MantineProvider was not found in tree')
    }

    return ctx
}

/**
 * 获取 CSS 变量解析器
 * @returns CSS 变量解析函数
 */
export function useMantineCssVariablesResolver() {
    return useMantineContext().cssVariablesResolver
}

/**
 * 获取类名前缀
 * @returns 类名前缀字符串
 */
export function useMantineClassNamesPrefix() {
    return useMantineContext().classNamesPrefix
}

/**
 * 获取样式 nonce 函数
 * @returns 获取 nonce 的函数
 */
export function useMantineStyleNonce() {
    return useMantineContext().getStyleNonce
}

/**
 * 检查是否使用静态类名
 * @returns 是否使用静态类名的布尔值
 */
export function useMantineWithStaticClasses() {
    return useMantineContext().withStaticClasses
}

/**
 * 检查是否启用无头模式
 * @returns 是否启用无头模式的布尔值
 */
export function useMantineIsHeadless() {
    return useMantineContext().headless
}

/**
 * 获取 sx 样式转换器
 * @returns sx 转换函数
 */
export function useMantineSxTransform() {
    return useMantineContext().stylesTransform?.sx
}

/**
 * 获取 styles 样式转换器
 * @returns styles 转换函数
 */
export function useMantineStylesTransform() {
    return useMantineContext().stylesTransform?.styles
}

/**
 * 获取当前运行环境
 * @returns 运行环境字符串，默认为 'default'
 */
export function useMantineEnv() {
    return useMantineContext().env || 'default'
}
