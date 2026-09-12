import { Box, useUITheme } from '@xiaoye-react/ui'
import {
    Bar,
    BarChart as RBarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts'
import { useChartTheme, resolveChartColor } from '../chart-theme'
import { ChartLegend } from '../ChartLegend/ChartLegend'
import { ChartTooltip } from '../ChartTooltip/ChartTooltip'
import type { CartesianChartProps } from '../types'

const CHART_MARGIN = { top: 8, right: 8, bottom: 0, left: 0 }

export interface UIBarChartProps extends CartesianChartProps {
    /** 是否堆叠，默认 false（分组） */
    stacked?: boolean
    /** 柱子圆角，默认 3（堆叠时不生效） */
    radius?: number
}

export function BarChart({
    h = 280,
    data,
    dataKey,
    series,
    stacked = false,
    radius = 3,
    withLegend = false,
    withXAxis = true,
    withYAxis = true,
    unit,
    formatter,
    ...others
}: UIBarChartProps) {
    const theme = useUITheme()
    const t = useChartTheme()
    const resolved = series.map((s) => resolveChartColor(s.color, theme, t.colorScheme))
    const barRadius = stacked ? 0 : radius

    return (
        <Box h={h} w="100%" {...others} style={{ display: 'flex', flexDirection: 'column', ...others.style }}>
            <div style={{ flex: 1, minHeight: 0 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <RBarChart data={data} margin={CHART_MARGIN}>
                        <CartesianGrid stroke={t.grid} strokeDasharray="4 4" vertical={false} />
                        <XAxis
                            dataKey={dataKey}
                            tick={{ fill: t.tick, fontSize: 12 }}
                            axisLine={{ stroke: t.grid }}
                            tickLine={false}
                            hide={!withXAxis}
                        />
                        <YAxis
                            tick={{ fill: t.tick, fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                            hide={!withYAxis}
                        />
                        <Tooltip
                            cursor={{ fill: t.cursor, fillOpacity: 0.06 }}
                            content={<ChartTooltip unit={unit} formatter={formatter} colors={t} />}
                        />
                        {series.map((s, i) => (
                            <Bar
                                key={s.name}
                                dataKey={s.name}
                                name={s.name}
                                fill={resolved[i]}
                                stackId={stacked ? 'stacked' : undefined}
                                radius={[barRadius, barRadius, 0, 0]}
                                maxBarSize={48}
                            />
                        ))}
                    </RBarChart>
                </ResponsiveContainer>
            </div>
            {withLegend && <ChartLegend series={series} resolvedColors={resolved} />}
        </Box>
    )
}

BarChart.displayName = '@xiaoye-react/charts/BarChart'
