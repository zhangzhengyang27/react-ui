import type { UITheme } from '../../../../core/UIProvider'
import { keys } from '../../../../core/utils'
import { resolvers } from '../resolvers'
import type { SystemPropData } from '../style-props-data'
import type { StyleProp } from '../style-props.types'
import { sortMediaQueries, type SortMediaQueriesResult } from './sort-media-queries'

/**
 * 检查样式属性是否包含响应式样式（即包含多个断点样式）
 * @param {StyleProp<unknown>} styleProp - 需要检查的样式属性
 * @returns {boolean} 如果样式属性包含多个断点样式则返回true，否则返回false
 */
function hasResponsiveStyles(styleProp: StyleProp<unknown>) {
    if (typeof styleProp !== 'object' || styleProp === null) {
        return false
    }

    const breakpoints = Object.keys(styleProp)

    if (breakpoints.length === 1 && breakpoints[0] === 'base') {
        return false
    }

    return true
}

/**
 * 从样式属性值中获取基础值
 * @param {StyleProp<unknown>} value - 样式属性值，可以是基础值或包含base属性的对象
 * @returns {unknown|undefined} 返回基础值，如果是对象且包含base属性则返回base值，否则返回undefined或原始值
 */
function getBaseValue(value: StyleProp<unknown>) {
    if (typeof value === 'object' && value !== null) {
        if ('base' in value) {
            return value.base
        }

        return undefined
    }

    return value
}

/**
 * 从样式属性对象中获取断点键名（排除'base'键）
 * @param {StyleProp<unknown>} value - 样式属性值，可以是对象或基本类型
 * @returns {string[]} 返回所有断点键名的数组，如果输入不是对象则返回空数组
 */
function getBreakpointKeys(value: StyleProp<unknown>) {
    if (typeof value === 'object' && value !== null) {
        return keys(value).filter(key => key !== 'base')
    }

    return []
}

/**
 * 根据断点获取对应的样式值
 * @param {StyleProp<unknown>} value - 样式值，可以是普通值或包含断点键值的对象
 * @param {string} breakpoint - 断点名称
 * @returns {unknown} 返回对应断点的样式值，如果没有断点则返回原值
 */
function getBreakpointValue(value: StyleProp<unknown>, breakpoint: string) {
    if (typeof value === 'object' && value !== null && breakpoint in value) {
        return value[breakpoint as keyof typeof value]
    }

    return value
}

interface ParseStylePropsOptions {
    styleProps: Record<string, StyleProp<any>>
    theme: UITheme
    data: Record<string, SystemPropData>
}

export interface ParseStylePropsResult {
    hasResponsiveStyles: boolean
    inlineStyles: React.CSSProperties
    styles: React.CSSProperties
    media: Record<string, React.CSSProperties>
}

/**
 * 解析样式属性并将其分类为响应式和非响应式样式
 * @param {ParseStylePropsOptions} options - 解析选项
 * @param {object} options.styleProps - 需要解析的样式属性对象
 * @param {object} options.data - 样式属性元数据
 * @param {object} options.theme - 主题对象，包含断点等信息
 * @returns {SortMediaQueriesResult} 包含分类后的样式对象，包括内联样式、基础样式和媒体查询样式
 */
export function parseStyleProps({ styleProps, data, theme }: ParseStylePropsOptions): SortMediaQueriesResult {
    return sortMediaQueries(
        keys(styleProps).reduce<{
            hasResponsiveStyles: boolean
            inlineStyles: Record<string, unknown>
            styles: Record<string, unknown>
            media: Record<string, Record<string, unknown>>
        }>(
            (acc, styleProp) => {
                if (
                    (styleProp as string) === 'hiddenFrom' ||
                    (styleProp as string) === 'visibleFrom' ||
                    (styleProp as string) === 'lightHidden' ||
                    (styleProp as string) === 'darkHidden' ||
                    (styleProp as string) === 'sx'
                ) {
                    return acc
                }

                const propertyData = data[styleProp]

                if (!propertyData) {
                    return acc
                }

                const properties = Array.isArray(propertyData.property)
                    ? propertyData.property
                    : [propertyData.property]
                const baseValue = getBaseValue(styleProps[styleProp])

                if (!hasResponsiveStyles(styleProps[styleProp])) {
                    properties.forEach(property => {
                        acc.inlineStyles[property] = resolvers[propertyData.type](baseValue, theme)
                    })

                    return acc
                }

                acc.hasResponsiveStyles = true

                const breakpoints = getBreakpointKeys(styleProps[styleProp])

                properties.forEach(property => {
                    if (baseValue != null) {
                        acc.styles[property] = resolvers[propertyData.type](baseValue, theme)
                    }

                    breakpoints.forEach(breakpoint => {
                        const bp = `(min-width: ${theme.breakpoints[breakpoint]})`
                        acc.media[bp] = {
                            ...acc.media[bp],
                            [property]: resolvers[propertyData.type](
                                getBreakpointValue(styleProps[styleProp], breakpoint),
                                theme
                            )
                        }
                    })
                })

                return acc
            },
            {
                hasResponsiveStyles: false,
                styles: {},
                inlineStyles: {},
                media: {}
            }
        )
    )
}
