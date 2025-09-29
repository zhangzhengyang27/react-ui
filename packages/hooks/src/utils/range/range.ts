/**
 * 生成一个数字范围数组
 * @param {number} start - 范围的起始值
 * @param {number} end - 范围的结束值
 * @returns {number[]} 从start到end的数字数组，如果start大于end则返回降序数组
 */
export function range(start: number, end: number) {
    const length = Math.abs(end - start) + 1
    const reversed = start > end

    if (!reversed) {
        return Array.from({ length }, (_, index) => index + start)
    }

    return Array.from({ length }, (_, index) => start - index)
}
