import { CSSProperties } from 'react'
import { UIStyleProp } from '../../../Box'
import { UITheme } from '../../../UIProvider'
import { GetStylesApiOptions } from '../../styles-api.types'
import { getThemeStyles } from './get-theme-styles/get-theme-styles'
import { resolveStyle } from './resolve-style/resolve-style'
import { resolveStyles } from './resolve-styles/resolve-styles'
import { resolveVars, VarsResolver } from './resolve-vars/resolve-vars'

export type _Styles =
    | undefined
    | Partial<Record<string, CSSProperties>>
    | ((
          theme: UITheme,
          props: Record<string, any>,
          ctx: Record<string, any> | undefined
      ) => Partial<Record<string, CSSProperties>>)

export interface GetStyleInput {
    theme: UITheme
    themeName: string[]
    selector: string
    rootSelector: string
    options: GetStylesApiOptions | undefined
    props: Record<string, any>
    stylesCtx: Record<string, any> | undefined
    styles: _Styles
    style: UIStyleProp | undefined
    vars: VarsResolver | undefined
    varsResolver: VarsResolver | undefined
    headless?: boolean
    withStylesTransform?: boolean
}

/**
 * 根据输入参数生成合并后的CSS样式属性
 * @param {GetStyleInput} params - 样式生成参数对象
 * @param {Theme} params.theme - 主题对象
 * @param {string} params.themeName - 主题名称
 * @param {string} params.selector - CSS选择器
 * @param {object} params.options - 可选样式配置
 * @param {object} params.props - 组件属性
 * @param {object} params.stylesCtx - 样式上下文
 * @param {string} params.rootSelector - 根选择器
 * @param {object} params.styles - 基础样式对象
 * @param {object} params.style - 内联样式
 * @param {object} params.vars - CSS变量定义
 * @param {Function} params.varsResolver - 变量解析器
 * @param {boolean} params.headless - 是否无头模式
 * @param {boolean} params.withStylesTransform - 是否应用样式转换
 * @returns {CSSProperties} 合并后的CSS样式属性对象
 */
export function getStyle({
    theme,
    themeName,
    selector,
    options,
    props,
    stylesCtx,
    rootSelector,
    styles,
    style,
    vars,
    varsResolver,
    headless,
    withStylesTransform
}: GetStyleInput): CSSProperties {
    return {
        ...(!withStylesTransform && getThemeStyles({ theme, themeName, props, stylesCtx, selector })),
        ...(!withStylesTransform && resolveStyles({ theme, styles, props, stylesCtx })[selector]),
        ...(!withStylesTransform &&
            resolveStyles({ theme, styles: options?.styles, props: options?.props || props, stylesCtx })[selector]),
        ...resolveVars({ theme, props, stylesCtx, vars, varsResolver, selector, themeName, headless }),
        ...(rootSelector === selector ? resolveStyle({ style, theme }) : null),
        ...resolveStyle({ style: options?.style, theme })
    }
}
