const values = {
    text: 'var(--ui-font-family)',
    mono: 'var(--ui-font-family-monospace)',
    monospace: 'var(--ui-font-family-monospace)',
    heading: 'var(--ui-font-family-headings)',
    headings: 'var(--ui-font-family-headings)'
}

/**
 * 解析字体家族名称，如果传入的是预定义的值则返回对应的实际值
 * @param {unknown} fontFamily - 字体家族名称，可以是字符串或预定义的值
 * @returns {unknown} 解析后的字体家族值，如果传入的是预定义值则返回对应的实际值，否则原样返回
 */
export function fontFamilyResolver(fontFamily: unknown) {
    if (typeof fontFamily === 'string' && Object.hasOwn(values, fontFamily)) {
        return values[fontFamily as keyof typeof values]
    }

    return fontFamily
}
