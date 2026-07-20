/**
 * 检查值是否为数字或类似数字的字符串
 * @param {unknown} value - 待检查的值
 * @returns {boolean} 如果值是数字或符合CSS单位格式的字符串则返回true，否则返回false
 * @description 支持检查以下情况：
 * - 纯数字类型
 * - 以'calc('或'var('开头的字符串
 * - 符合CSS单位格式的字符串（如'10px', '50%'等），包括空格分隔的多值简写（如'10px 20px'）
 */
export function isNumberLike(value: unknown) {
    if (typeof value === 'number') {
        return true
    }

    if (typeof value === 'string') {
        if (value.startsWith('calc(') || value.startsWith('var(')) {
            return true
        }

        const cssUnitsRegex =
            /^[+-]?[0-9]+(\.[0-9]+)?(px|em|rem|ex|ch|lh|rlh|vw|vh|vmin|vmax|vb|vi|svw|svh|lvw|lvh|dvw|dvh|cm|mm|in|pt|pc|q|cqw|cqh|cqi|cqb|cqmin|cqmax|%)?$/
        const values = value.trim().split(/\s+/)
        return values.length > 0 && values.every(val => cssUnitsRegex.test(val))
    }

    return false
}
