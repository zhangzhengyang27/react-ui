import { Box, useUITheme, type BoxProps } from '@xiaoye-react/ui'
import { Cell, Pie, PieChart as RPieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { useChartTheme, resolveChartColor } from '../chart-theme'
import { ChartLegend } from '../ChartLegend/ChartLegend'
import { ChartTooltip } from '../ChartTooltip/ChartTooltip'
import type { ChartSeries } from '../ChartLegend/ChartLegend'

export interface DonutChartProps extends BoxProps {
    /** 数据源：名称 + 数值 + 颜色 token */
    data: (ChartSeries & { value: number })[]
    /** 图表高度，默认 280 */
    h?: BoxProps['h']
    /** 内圈半径（百分比，相对外圈），默认 60 */
    innerRadius?: number
    /** 扇区间隔角度，默认 0 */
    paddingAngle?: number
    /** 是否显示图例，默认 false */
    withLegend?: boolean
    /** 数值后缀（tooltip 展示） */
    unit?: string
    /** 数值格式化（tooltip 展示） */
    formatter?: (value: number | string) => string
}

export function DonutChart({
    h = 280,
    data,
    innerRadius = 60,
    paddingAngle = 0,
    withLegend = false,
    unit,
    formatter,
    ...others
}: DonutChartProps) {
    const theme = useUITheme()
    const t = useChartTheme()
    const resolved = data.map((d) => resolveChartColor(d.color, theme, t.colorScheme))

    return (
        <Box h={h} w="100%" {...others} style={{ display: 'flex', flexDirection: 'column', ...others.style }}>
            <div style={{ flex: 1, minHeight: 0 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <RPieChart margin={{ top: 8, right: 8, bottom: 0, left: 8 }}>
                        <Tooltip
                            content={<ChartTooltip unit={unit} formatter={formatter} colors={t} />}
                        />
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            innerRadius={`${innerRadius}%`}
                            outerRadius="90%"
                            paddingAngle={paddingAngle}
                            isAnimationActive={false}
                        >
                            {data.map((d, i) => (
                                <Cell key={d.name} fill={resolved[i]} stroke="none" />
                            ))}
                        </Pie>
                    </RPieChart>
                </ResponsiveContainer>
            </div>
            {withLegend && (
                <ChartLegend
                    series={data.map(({ name, color }) => ({ name, color }))}
                    resolvedColors={resolved}
                />
            )}
        </Box>
    )
}

DonutChart.displayName = '@xiaoye-react/charts/DonutChart'
