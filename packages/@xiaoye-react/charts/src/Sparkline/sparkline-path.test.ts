import { buildSparklinePath, toPoints } from './sparkline-path'

describe('toPoints', () => {
    it('空数据返回空数组', () => {
        expect(toPoints([])).toEqual([])
    })

    it('x 均匀分布在 0..100', () => {
        const pts = toPoints([1, 2, 3, 4])
        expect(pts.map(([x]) => x)).toEqual([0, 33.33, 66.67, 100])
    })

    it('y 反转（值越大 y 越小）且归一化到 0..100', () => {
        const pts = toPoints([0, 100])
        expect(pts[0][1]).toBe(100)
        expect(pts[1][1]).toBe(0)
    })

    it('全部相等时铺在中线', () => {
        const pts = toPoints([5, 5, 5])
        expect(pts.every(([, y]) => y === 50)).toBe(true)
    })
})

describe('buildSparklinePath', () => {
    it('空数据返回空路径', () => {
        expect(buildSparklinePath([], 'linear').line).toBe('')
    })

    it('linear 生成 M/L 折线路径', () => {
        const { line } = buildSparklinePath([0, 10], 'linear')
        expect(line).toMatch(/^M 0 100 L 100 0$/)
    })

    it('monotone 生成三次贝塞尔路径', () => {
        const { line } = buildSparklinePath([0, 10, 5], 'monotone')
        expect(line).toMatch(/^M 0 100 C /)
        expect(line).not.toContain('L ')
    })

    it('monotone 对常数序列生成平滑直线（不过冲）', () => {
        const { line } = buildSparklinePath([3, 3, 3, 3], 'monotone')
        expect(line).toContain('C')
        // 提取全部坐标，y 值（奇数位）应全部为 50
        const nums = line.match(/-?\d+(?:\.\d+)?/g)!.map(Number)
        const ys = nums.filter((_, i) => i % 2 === 1)
        expect(ys.every((y) => y === 50)).toBe(true)
    })

    it('area 路径闭合到底边', () => {
        const { line, area } = buildSparklinePath([1, 2, 3], 'linear')
        expect(area).toBe(`${line} L 100 100 L 0 100 Z`)
    })
})
