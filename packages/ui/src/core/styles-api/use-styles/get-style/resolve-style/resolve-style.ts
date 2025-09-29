import { CSSProperties } from 'react'
import { MantineStyleProp } from '../../../../Box'
import { MantineTheme } from '../../../../MantineProvider'

interface ResolveStyleInput {
    style: MantineStyleProp | undefined
    theme: MantineTheme
}

/**
 * 解析并合并样式对象或样式函数
 * @param {ResolveStyleInput} param0 - 包含样式和主题的输入对象
 * @param {CSSProperties | Array<CSSProperties> | ((theme: any) => CSSProperties)} param0.style - 需要解析的样式，可以是对象、数组或函数
 * @param {any} param0.theme - 主题对象，用于样式函数计算
 * @returns {CSSProperties} 解析后的样式对象
 */
export function resolveStyle({ style, theme }: ResolveStyleInput): CSSProperties {
    if (Array.isArray(style)) {
        return [...style].reduce<Record<string, any>>(
            (acc, item) => ({ ...acc, ...resolveStyle({ style: item, theme }) }),
            {}
        )
    }

    if (typeof style === 'function') {
        return style(theme)
    }

    if (style == null) {
        return {}
    }

    return style
}
