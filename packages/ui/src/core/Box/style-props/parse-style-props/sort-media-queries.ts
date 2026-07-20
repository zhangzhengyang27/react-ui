import type { InlineStylesMediaQuery } from '../../../../core/InlineStyles'
import type { ParseStylePropsResult } from './parse-style-props'

export interface SortMediaQueriesResult extends Omit<ParseStylePropsResult, 'media'> {
    media: InlineStylesMediaQuery[]
}

/**
 * 从媒体查询字符串中提取断点数值，并统一换算为 px
 * 支持 px/em/rem 及无单位数值（em/rem 按 16px 基准换算），
 * 避免不同单位的断点混用时 Number() 得到 NaN 导致排序失效
 * @param {string} query - 媒体查询字符串，如 '(min-width: 48em)'
 * @returns {number} 断点对应的 px 数值，无法解析时返回 0
 */
function getBreakpointValue(query: string): number {
    const match = query.match(/min-width:\s*([\d.]+)\s*(px|em|rem)?/i)

    if (!match) {
        return 0
    }

    const value = parseFloat(match[1])
    return match[2] === 'em' || match[2] === 'rem' ? value * 16 : value
}

/**
 * 根据媒体查询的断点值对媒体查询对象进行排序
 * @param {ParseStylePropsResult} props - 包含媒体查询和样式的对象
 * @param {Object} props.media - 媒体查询对象，键为查询条件，值为对应样式
 * @returns {SortMediaQueriesResult} 排序后的结果对象，包含原props和排序后的媒体查询数组
 */
export function sortMediaQueries({ media, ...props }: ParseStylePropsResult): SortMediaQueriesResult {
    const breakpoints = Object.keys(media)
    const sortedMedia = breakpoints
        .sort((a, b) => getBreakpointValue(a) - getBreakpointValue(b))
        .map(query => ({ query, styles: media[query] }))

    return { ...props, media: sortedMedia }
}
