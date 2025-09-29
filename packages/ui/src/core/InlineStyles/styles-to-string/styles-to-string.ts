import { cssObjectToString } from '../css-object-to-string/css-object-to-string'

export interface InlineStylesMediaQuery {
    query: string
    styles: React.CSSProperties
}

export interface InlineStylesInput {
    selector: string
    styles?: React.CSSProperties
    media?: InlineStylesMediaQuery[]
    container?: InlineStylesMediaQuery[]
}

/**
 * 将内联样式对象转换为CSS字符串
 * @param {InlineStylesInput} params - 包含样式信息的输入对象
 * @param {string} params.selector - CSS选择器
 * @param {Object} [params.styles] - 基础样式对象
 * @param {Array} [params.media] - 媒体查询配置数组
 * @param {Array} [params.container] - 容器查询配置数组
 * @returns {string} 生成的CSS字符串
 */
export function stylesToString({ selector, styles, media, container }: InlineStylesInput) {
    const baseStyles = styles ? cssObjectToString(styles) : ''
    const mediaQueryStyles = !Array.isArray(media)
        ? []
        : media.map(item => `@media${item.query}{${selector}{${cssObjectToString(item.styles)}}}`)

    const containerStyles = !Array.isArray(container)
        ? []
        : container.map(item => `@container ${item.query}{${selector}{${cssObjectToString(item.styles)}}}`)

    return `${baseStyles ? `${selector}{${baseStyles}}` : ''}${mediaQueryStyles.join('')}${containerStyles.join('')}`.trim()
}
