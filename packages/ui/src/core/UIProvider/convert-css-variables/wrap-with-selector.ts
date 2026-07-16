/**
 * 将给定的CSS代码包裹在指定的选择器中
 * @param {string|string[]} selectors - CSS选择器，可以是单个字符串或字符串数组
 * @param {string} code - 需要被包裹的CSS代码
 * @returns {string} 被选择器包裹后的CSS代码
 */
export function wrapWithSelector(selectors: string | string[], code: string) {
    const _selectors = Array.isArray(selectors) ? selectors : [selectors]
    return _selectors.reduce((acc, selector) => `${selector}{${acc}}`, code)
}
