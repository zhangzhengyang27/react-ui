import type { UITheme } from '../../../../../core/UIProvider'
import { rem } from '../../../../../core/utils'
import { colorResolver } from '../color-resolver/color-resolver'

/**
 * 解析边框样式值，将其转换为有效的CSS边框字符串
 * @param {unknown} value - 边框值，可以是数字或字符串格式
 * @param {UITheme} theme - UI主题对象，用于颜色解析
 * @returns {string|unknown} 解析后的CSS边框字符串，或原始值(如果无法解析)
 * @throws {Error} 当输入值格式不符合预期时可能抛出错误
 */
export function borderResolver(value: unknown, theme: UITheme) {
    if (typeof value === 'number') {
        return rem(value)
    }

    if (typeof value === 'string') {
        const [size, style, ...colorTuple] = value.split(' ').filter(val => val.trim() !== '')

        let result = `${rem(size)}`
        style && (result += ` ${style}`)
        colorTuple.length > 0 && (result += ` ${// join(' ') 还原拆分时被过滤掉的空格，多词颜色函数（如 color-mix(in srgb, ...)）才能生成合法 CSS
            colorResolver(colorTuple.join(' '), theme)}`)

        return result.trim()
    }

    return value
}
