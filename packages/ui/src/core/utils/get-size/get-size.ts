import { isNumberLike } from '../is-number-like/is-number-like'
import { rem } from '../units-converters'

/**
 * 根据输入的 size 值生成对应的 CSS 值
 * @param size - 可以是数字、字符串或 undefined
 * @param prefix - CSS 变量前缀，默认为 'size'
 * @param convertToRem - 是否将数字转换为 rem 单位，默认为 true
 * @returns 返回生成的 CSS 值或 undefined
 */
export function getSize(size: unknown, prefix: string = 'size', convertToRem: boolean = true): string | undefined {
    if (size === undefined) {
        return undefined
    }

    if (isNumberLike(size)) {
        return convertToRem ? rem(size) : String(size)
    }

    return `var(--${prefix}-${size})`
}

/**
 * 根据指定大小获取对应的间距值
 * @param {unknown} size - 间距大小参数，可以是数字或字符串等类型
 * @returns {string} 计算后的间距值，基于'ui-spacing'主题变量
 */
export function getSpacing(size: unknown) {
    return getSize(size, 'ui-spacing')
}

/**
 * 根据给定的大小获取对应的圆角半径值
 * @param {unknown} size - 圆角大小，未定义时将使用默认值
 * @returns {string} 对应的CSS变量或计算后的圆角值
 */
export function getRadius(size: unknown) {
    if (size === undefined) {
        return 'var(--ui-radius-default)'
    }

    return getSize(size, 'ui-radius')
}

/**
 * 根据输入的大小值获取对应的字体大小
 * @param {unknown} size - 字体大小值（可以是数字、字符串或其他类型）
 * @returns {string} 计算后的字体大小值，基于'ui-font-size'样式系统
 */
export function getFontSize(size: unknown) {
    return getSize(size, 'ui-font-size')
}

/**
 * 根据给定尺寸获取对应的行高值
 * @param {unknown} size - 输入的尺寸值
 * @returns {unknown} 计算得到的行高值
 */
export function getLineHeight(size: unknown) {
    return getSize(size, 'ui-line-height', false)
}

/**
 * 根据给定的尺寸获取对应的阴影样式
 * @param {unknown} size - 阴影尺寸参数
 * @returns {string|undefined} 返回对应的阴影样式字符串，如果size无效则返回undefined
 */
export function getShadow(size: unknown) {
    if (!size) {
        return undefined
    }

    return getSize(size, 'ui-shadow', false)
}
