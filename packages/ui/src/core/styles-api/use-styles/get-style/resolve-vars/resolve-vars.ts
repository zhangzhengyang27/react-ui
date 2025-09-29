import { CSSProperties } from 'react'
import { CssVariable } from '../../../../Box'
import { MantineTheme } from '../../../../MantineProvider'
import { mergeVars } from './merge-vars'

type ResolvedVars = Partial<Record<string, Record<CssVariable, string>>>

export type VarsResolver = (
    theme: MantineTheme,
    props: Record<string, any>,
    stylesCtx: Record<string, any> | undefined
) => ResolvedVars

interface ResolveVarsInput {
    vars: VarsResolver | undefined
    varsResolver: VarsResolver | undefined
    theme: MantineTheme
    props: Record<string, any>
    stylesCtx: Record<string, any> | undefined
    selector: string
    themeName: string[]
    headless?: boolean
}

/**
 * 解析并合并变量配置，返回指定选择器的CSS属性
 * @param {ResolveVarsInput} params - 变量解析输入参数
 * @param {Object} params.vars - 基础变量函数
 * @param {Function} params.varsResolver - 变量解析函数
 * @param {Object} params.theme - 主题对象
 * @param {Object} params.props - 组件属性
 * @param {Object} params.stylesCtx - 样式上下文
 * @param {string} params.selector - CSS选择器
 * @param {string[]} params.themeName - 主题名称数组
 * @param {boolean} params.headless - 是否无头模式
 * @returns {CSSProperties} 合并后的CSS属性对象
 */
export function resolveVars({
    vars,
    varsResolver,
    theme,
    props,
    stylesCtx,
    selector,
    themeName,
    headless
}: ResolveVarsInput) {
    return mergeVars([
        headless ? {} : varsResolver?.(theme, props, stylesCtx),
        ...themeName.map(name => theme.components?.[name]?.vars?.(theme, props, stylesCtx)),
        vars?.(theme, props, stylesCtx)
    ])?.[selector] as CSSProperties
}
