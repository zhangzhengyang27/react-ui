import { Box, useUITheme } from '@xiaoye-react/ui'
import {
    CartesianGrid,
    Line,
    LineChart as RLineChart,
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

export function LineChart({
    h = 280,
    data,
    dataKey,
    series,
    curveType = 'monotone',
    withDots = false,
    withLegend = false,
    withXAxis = true,
    withYAxis = true,
    unit,
    formatter,
    ...others
}: CartesianChartProps) {
    const theme = useUITheme()
    const t = useChartTheme()
    const resolved = series.map((s) => resolveChartColor(s.color, theme, t.colorScheme))

    return (
        <Box h={h} w="100%" {...others} style={{ display: 'flex', flexDirection: 'column', ...others.style }}>
            <div style={{ flex: 1, minHeight: 0 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <RLineChart data={data} margin={CHART_MARGIN}>
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
                            cursor={{ stroke: t.cursor, strokeWidth: 1 }}
                            content={<ChartTooltip unit={unit} formatter={formatter} colors={t} />}
                        />
                        {series.map((s, i) => (
                            <Line
                                key={s.name}
                                dataKey={s.name}
                                name={s.name}
                                type={curveType}
                                stroke={resolved[i]}
                                strokeWidth={2}
                                dot={
                                    withDots
                                        ? { r: 3, strokeWidth: 1, stroke: resolved[i], fill: resolved[i] }
                                        : false
                                }
                                activeDot={{ r: 4 }}
                            />
                        ))}
                    </RLineChart>
                </ResponsiveContainer>
            </div>
            {withLegend && <ChartLegend series={series} resolvedColors={resolved} />}
        </Box>
    )
}

LineChart.displayName = '@xiaoye-react/charts/LineChart'
