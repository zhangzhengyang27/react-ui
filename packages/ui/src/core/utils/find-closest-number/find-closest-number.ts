/**
 * 找到给定数组中最接近所提供值的数字。
 * 如果数组为空，返回该值本身。
 *
 * @example
 * findClosestNumber(3, [1, 5, 10]); // 1
 * findClosestNumber(7, [1, 5, 10]); // 5
 */
export function findClosestNumber(value: number, numbers: number[]): number {
    if (numbers.length === 0) {
        return value
    }

    return numbers.reduce((closest, current) =>
        Math.abs(current - value) < Math.abs(closest - value) ? current : closest
    )
}
