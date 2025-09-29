import type { InlineStylesMediaQuery } from '../../../../core/InlineStyles'
import type { ParseStylePropsResult } from './parse-style-props'

export interface SortMediaQueriesResult extends Omit<ParseStylePropsResult, 'media'> {
    media: InlineStylesMediaQuery[]
}

/**
 * 替换媒体查询字符串中的特定部分
 * @param {string} query - 需要处理的媒体查询字符串
 * @returns {string} 处理后的字符串，移除了'(min-width: '和'em)'部分
 */
function replaceMediaQuery(query: string) {
    return query.replace('(min-width: ', '').replace('em)', '')
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
        .sort((a, b) => Number(replaceMediaQuery(a)) - Number(replaceMediaQuery(b)))
        .map(query => ({ query, styles: media[query] }))

    return { ...props, media: sortedMedia }
}
