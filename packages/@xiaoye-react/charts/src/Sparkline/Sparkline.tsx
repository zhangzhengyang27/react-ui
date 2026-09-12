import { Box, useUITheme, type BoxProps } from '@xiaoye-react/ui'
import { useChartTheme, resolveChartColor } from '../chart-theme'
import { buildSparklinePath, type SparklineCurveType } from './sparkline-path'

export interface SparklineProps extends BoxProps {
    /** 数值序列 */
    data: number[]
    /** 颜色 token 或 CSS 颜色，默认主题主色 */
    color?: string
    /** 描边宽度（px，非缩放），默认 2 */
    strokeWidth?: number
    /** 是否填充面积，默认 false */
    withAreaFill?: boolean
    /** 面积填充透明度，默认 0.12 */
    fillOpacity?: number
    /** 曲线类型，默认 'monotone'（平滑） */
    curveType?: SparklineCurveType
}

/**
 * 迷你走势图：无轴、无提示，用于卡片瓦片等小空间。
 * 手写 SVG 实现（区别于 recharts 系组件），无外部尺寸依赖，尺寸变化由 viewBox 缩放。
 */
export function Sparkline({
    data,
    color,
    strokeWidth = 2,
    withAreaFill = false,
    fillOpacity = 0.12,
    curveType = 'monotone',
    ...others
}: SparklineProps) {
    const theme = useUITheme()
    const t = useChartTheme()
    const resolved = resolveChartColor(color ?? theme.primaryColor, theme, t.colorScheme)
    const { line, area } = buildSparklinePath(data, curveType)

    if (!line) {
        return null
    }

    return (
        <Box w="100%" h="100%" {...others}>
            <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                width="100%"
                height="100%"
                role="img"
                aria-hidden="true"
            >
                {withAreaFill && <path d={area} fill={resolved} fillOpacity={fillOpacity} stroke="none" />}
                <path
                    d={line}
                    fill="none"
                    stroke={resolved}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                />
            </svg>
        </Box>
    )
}

Sparkline.displayName = '@xiaoye-react/charts/Sparkline'
