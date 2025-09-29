import type { CssVariable } from '../../../components/Box'

export type CSSVariables = Record<CssVariable, string>

/**
 * 将CSS变量对象转换为字符串形式
 * @param {CSSVariables} variables - 包含CSS变量名和值的对象
 * @returns {string} 格式化后的CSS变量字符串，格式为"name: value;"
 */
export function cssVariablesObjectToString(variables: CSSVariables) {
    return Object.entries(variables)
        .map(([name, value]) => `${name}: ${value};`)
        .join('')
}
