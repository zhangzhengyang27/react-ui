import { toRgba } from '../to-rgba/to-rgba'

/**
 * 将颜色字符串转换为带有指定透明度的RGBA格式
 * @param {string} color - 输入颜色字符串，支持CSS变量(var)、oklch格式或常规颜色格式
 * @param {number} alpha - 透明度值，范围0到1之间
 * @returns {string} 转换后的RGBA颜色字符串，当输入无效时返回'rgba(0, 0, 0, 1)'
 */
export function rgba(color: string, alpha: number) {
    if (typeof color !== 'string' || alpha > 1 || alpha < 0) {
        return 'rgba(0, 0, 0, 1)'
    }

    if (color.startsWith('var(')) {
        const mixPercentage = (1 - alpha) * 100
        return `color-mix(in srgb, ${color}, transparent ${mixPercentage}%)`
    }

    if (color.startsWith('oklch')) {
        if (color.includes('/')) {
            return color.replace(/\/\s*[\d.]+%?\s*\)/, `/ ${alpha})`)
        }

        return color.replace(')', ` / ${alpha})`)
    }

    const { r, g, b } = toRgba(color)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export const alpha = rgba
