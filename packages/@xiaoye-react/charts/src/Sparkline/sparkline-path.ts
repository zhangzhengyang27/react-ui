/**
 * Sparkline 路径生成（纯函数，便于单测）
 *
 * 坐标系：0..100 的 viewBox，y 向上为值增大方向（内部换算为 SVG 的向下 y 轴）
 * 生成后通过 preserveAspectRatio="none" + vector-effect="non-scaling-stroke"
 * 在任意容器尺寸下保持形状与描边粗细。
 */

export type SparklineCurveType = 'linear' | 'monotone'

const round = (n: number) => Number(n.toFixed(2))

/** 归一化：值序列 → viewBox 内的点序列（x 均匀分布，y 反转） */
export function toPoints(values: number[]): [number, number][] {
    const n = values.length
    if (n === 0) {
        return []
    }
    const min = Math.min(...values)
    const max = Math.max(...values)
    const span = max - min
    const step = n > 1 ? 100 / (n - 1) : 0

    return values.map((v, i) => [
        round(i * step),
        round(span === 0 ? 50 : 100 - ((v - min) / span) * 100)
    ])
}

/** Fritsch–Carlson 单调三次插值（用于平滑折线，不会过冲） */
function monotonePath(points: [number, number][]): string {
    const n = points.length
    if (n < 2) {
        return ''
    }
    const dx: number[] = []
    const m: number[] = []
    for (let i = 0; i < n - 1; i++) {
        dx[i] = points[i + 1][0] - points[i][0]
        m[i] = (points[i + 1][1] - points[i][1]) / (dx[i] || 1)
    }

    const t: number[] = [m[0]]
    for (let i = 1; i < n - 1; i++) {
        if (m[i - 1] * m[i] <= 0) {
            t[i] = 0
        } else {
            const w1 = 2 * dx[i] + dx[i - 1]
            const w2 = dx[i] + 2 * dx[i - 1]
            t[i] = (w1 + w2) / (w1 / m[i - 1] + w2 / m[i])
        }
    }
    t[n - 1] = m[n - 2]

    let d = `M ${points[0][0]} ${points[0][1]}`
    for (let i = 0; i < n - 1; i++) {
        const [x0, y0] = points[i]
        const [x1, y1] = points[i + 1]
        const h = dx[i] / 3
        d += ` C ${round(x0 + h)} ${round(y0 + t[i] * h)}, ${round(x1 - h)} ${round(y1 - t[i + 1] * h)}, ${x1} ${y1}`
    }
    return d
}

function linearPath(points: [number, number][]): string {
    return points.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x} ${y}`).join(' ')
}

export function buildSparklinePath(
    values: number[],
    curveType: SparklineCurveType
): { line: string; area: string } {
    const points = toPoints(values)
    if (points.length === 0) {
        return { line: '', area: '' }
    }
    const line = curveType === 'monotone' ? monotonePath(points) : linearPath(points)
    const [first] = points
    const last = points[points.length - 1]
    const area = `${line} L ${last[0]} 100 L ${first[0]} 100 Z`
    return { line, area }
}
