/**
 * 将数值限制在指定范围内
 * @param value - 需要限制的原始数值
 * @param min - 可选的最小边界值
 * @param max - 可选的最大边界值
 * @returns 限制后的数值（当min/max未定义时返回原值）
 */
export function clamp(value: number, min: number | undefined, max: number | undefined) {
    if (min === undefined && max === undefined) {
        return value
    }

    if (min !== undefined && max === undefined) {
        return Math.max(value, min)
    }

    if (min === undefined && max !== undefined) {
        return Math.min(value, max)
    }

    return Math.min(Math.max(value, min!), max!)
}
