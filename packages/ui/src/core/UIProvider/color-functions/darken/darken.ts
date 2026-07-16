import { toRgba } from '../to-rgba/to-rgba'

/**
 * 将给定颜色变暗指定比例
 * @param {string} color - 颜色值，支持CSS变量格式(如var(--color))或常规颜色格式(如rgba/rgb/hex)
 * @param {number} alpha - 变暗比例，取值范围0-1（1表示完全变黑）
 * @returns {string} 变暗后的颜色值，格式与输入保持一致（CSS变量或rgba格式）
 */
export function darken(color: string, alpha: number) {
    if (color.startsWith('var(')) {
        return `color-mix(in srgb, ${color}, black ${alpha * 100}%)`
    }

    const { r, g, b, a } = toRgba(color)
    const f = 1 - alpha

    const dark = (input: number) => Math.round(input * f)

    return `rgba(${dark(r)}, ${dark(g)}, ${dark(b)}, ${a})`
}
