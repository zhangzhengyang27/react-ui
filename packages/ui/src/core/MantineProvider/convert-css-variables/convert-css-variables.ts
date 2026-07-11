import { CSSVariables, cssVariablesObjectToString } from './css-variables-object-to-string'
import { wrapWithSelector } from './wrap-with-selector'

export interface ConvertCSSVariablesInput {
    /** Shared CSS variables that should be accessible independent from color scheme */
    variables: CSSVariables

    /** CSS variables available only in dark color scheme */
    dark: CSSVariables

    /** CSS variables available only in light color scheme */
    light: CSSVariables
}

/**
 * 将CSS变量对象转换为带选择器的CSS字符串
 * @param {ConvertCSSVariablesInput} input - 包含普通、暗色和亮色主题变量的输入对象
 * @param {string} selector - CSS选择器，用于包裹生成的变量声明
 * @returns {string} 组合后的CSS字符串，包含普通变量及带主题选择器的变量
 */
export function convertCssVariables(input: ConvertCSSVariablesInput, selector: string) {
    const sharedVariables = cssVariablesObjectToString(input.variables)
    const shared = sharedVariables ? wrapWithSelector(selector, sharedVariables) : ''
    const dark = cssVariablesObjectToString(input.dark)
    const light = cssVariablesObjectToString(input.light)

    const darkForced = dark
        ? selector === ':host'
            ? wrapWithSelector(`${selector}([data-ui-color-scheme="dark"])`, dark)
            : wrapWithSelector(`${selector}[data-ui-color-scheme="dark"]`, dark)
        : ''

    const lightForced = light
        ? selector === ':host'
            ? wrapWithSelector(`${selector}([data-ui-color-scheme="light"])`, light)
            : wrapWithSelector(`${selector}[data-ui-color-scheme="light"]`, light)
        : ''

    return `${shared}\n\n${darkForced}\n\n${lightForced}`
}
