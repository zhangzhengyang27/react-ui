import { toRgba } from '../to-rgba/to-rgba'

/**
 * 将给定颜色变亮指定透明度
 * @param {string} color - 原始颜色值，支持CSS变量格式(如var(--color))或常规颜色格式
 * @param {number} alpha - 透明度值(0-1之间)，值越大颜色越亮
 * @returns {string} 变亮后的颜色值，格式为rgba()或color-mix() CSS函数
 */
export function lighten(color: string, alpha: number) {
    if (color.startsWith('var(')) {
        return `color-mix(in srgb, ${color}, white ${alpha * 100}%)`
    }

    const { r, g, b, a } = toRgba(color)

    const light = (input: number) => Math.round(input + (255 - input) * alpha)

    return `rgba(${light(r)}, ${light(g)}, ${light(b)}, ${a})`
}
