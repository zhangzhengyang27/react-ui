import { toRgba } from '../to-rgba/to-rgba'

/**
 * 对输入的颜色值进行伽马校正
 * @param {number} c - 输入的颜色值，范围应在0到1之间
 * @returns {number} 经过伽马校正后的颜色值
 */
function gammaCorrect(c: number) {
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
}

/**
 * 从OKLCH颜色字符串中提取亮度值
 * @param {string} oklchColor - OKLCH格式的颜色字符串，例如"oklch(75% 0.2 180)"
 * @returns {number|null} 提取到的亮度百分比值(0-100)，如果格式不匹配则返回null
 */
function getLightnessFromOklch(oklchColor: string) {
    const match = oklchColor.match(/oklch\((.*?)%\s/)
    return match ? parseFloat(match[1]) : null
}

/**
 * 计算给定颜色的亮度值（luminance）
 * @param {string} color - 颜色值，支持常规颜色格式或oklch格式
 * @returns {number} 颜色的亮度值，范围在0到1之间
 * @throws 当颜色格式无法解析时可能抛出错误
 */
export function luminance(color: string): number {
    if (color.startsWith('oklch(')) {
        return (getLightnessFromOklch(color) || 0) / 100
    }

    const { r, g, b } = toRgba(color)

    const sR = r / 255
    const sG = g / 255
    const sB = b / 255

    const rLinear = gammaCorrect(sR)
    const gLinear = gammaCorrect(sG)
    const bLinear = gammaCorrect(sB)

    return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear
}

/**
 * 判断给定的颜色是否为浅色
 * @param {string} color - 要检查的颜色值，可以是CSS颜色字符串或CSS变量
 * @param {number} [luminanceThreshold=0.3] - 亮度阈值，高于此值则认为是浅色（与主题默认 luminanceThreshold 一致）
 * @returns {boolean} 如果颜色亮度高于阈值则返回true，否则返回false
 * @note 对于CSS变量(以'var('开头的颜色)，总是返回false
 */
export function isLightColor(color: string, luminanceThreshold = 0.3) {
    if (color.startsWith('var(')) {
        return false
    }

    return luminance(color) > luminanceThreshold
}
