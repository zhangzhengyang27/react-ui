import React from 'react'
import {
    RadarChart as RechartsRadarChart,
    Radar,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts'
import {
    Box,
    BoxProps,
    createVarsResolver,
    factory,
    Factory,
    rem,
    StylesApiProps,
    useProps,
    useStyles
} from '../../core'
import { resolveChartColor } from '../Charts/chart-utils'
import classes from './RadarChart.module.css'

export type RadarChartStylesNames = 'root'

export type RadarChartCssVariables = {
    root: '--radar-chart-height'
}

export interface RadarChartSeries {
    /** Data key for this series */
    name: string

    /** Stroke/fill color, theme color key or CSS value */
    color?: string

    /** Fill opacity @default 0.3 */
    fillOpacity?: number
}

export interface RadarChartProps extends BoxProps, StylesApiProps<RadarChartFactory> {
    /** Data array for the chart */
    data: any[]

    /** Key used for the angle axis values */
    dataKey: string

    /** Series configuration */
    series: RadarChartSeries[]

    /** If true, PolarGrid is displayed @default true */
    withGrid?: boolean

    /** If true, PolarAngleAxis is displayed @default true */
    withAngleAxis?: boolean

    /** If true, PolarRadiusAxis is displayed @default true */
    withRadiusAxis?: boolean

    /** If true, Tooltip is displayed @default true */
    withTooltip?: boolean

    /** If true, Legend is displayed @default false */
    withLegend?: boolean

    /** Fixed chart height @default 300 */
    height?: number

    /** Custom tooltip value formatter */
    tooltipFormatter?: (value: any, name: any, props: any) => any

    /** Custom angle axis tick formatter */
    angleAxisFormatter?: (value: string) => string

    /** Additional Recharts children */
    children?: React.ReactNode
}

export type RadarChartFactory = Factory<{
    props: RadarChartProps
    ref: HTMLDivElement
    stylesNames: RadarChartStylesNames
    vars: RadarChartCssVariables
}>

const defaultProps = {
    withGrid: true,
    withAngleAxis: true,
    withRadiusAxis: true,
    withTooltip: true,
    withLegend: false,
    height: 300
} satisfies Partial<RadarChartProps>

const varsResolver = createVarsResolver<RadarChartFactory>((_, { height }) => ({
    root: {
        '--radar-chart-height': rem(height)
    }
}))

export const RadarChart = factory<RadarChartFactory>((_props, ref) => {
    const props = useProps('RadarChart', defaultProps, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        data,
        dataKey,
        series,
        withGrid,
        withAngleAxis,
        withRadiusAxis,
        withTooltip,
        withLegend,
        height,
        tooltipFormatter,
        angleAxisFormatter,
        children,
        mod,
        ...others
    } = props

    const getStyles = useStyles<RadarChartFactory>({
        name: 'RadarChart',
        props,
        classes,
        className,
        style,
        classNames,
        styles,
        unstyled,
        vars,
        varsResolver
    })

    return (
        <Box ref={ref} {...getStyles('root')} mod={mod} {...others}>
            <ResponsiveContainer width="100%" height="100%">
                <RechartsRadarChart data={data} margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
                    {withGrid && <PolarGrid stroke="var(--ui-color-default-border)" />}
                    {withAngleAxis && (
                        <PolarAngleAxis
                            dataKey={dataKey}
                            tick={{ fill: 'var(--ui-color-text)', fontSize: 12 }}
                            tickFormatter={angleAxisFormatter}
                        />
                    )}
                    {withRadiusAxis && (
                        <PolarRadiusAxis
                            tick={{ fill: 'var(--ui-color-dimmed)', fontSize: 10 }}
                            stroke="var(--ui-color-default-border)"
                        />
                    )}
                    {withTooltip && (
                        <Tooltip
                            formatter={tooltipFormatter}
                            contentStyle={{
                                background: 'var(--ui-color-body)',
                                border: '1px solid var(--ui-color-default-border)',
                                borderRadius: 'var(--ui-radius-default)'
                            }}
                            itemStyle={{ color: 'var(--ui-color-text)' }}
                            labelStyle={{ color: 'var(--ui-color-text)' }}
                        />
                    )}
                    {withLegend && <Legend wrapperStyle={{ color: 'var(--ui-color-text)' }} />}
                    {series.map((item, index) => {
                        const color = resolveChartColor(item.color, index)
                        return (
                            <Radar
                                key={item.name}
                                name={item.name}
                                dataKey={item.name}
                                stroke={color}
                                fill={color}
                                fillOpacity={item.fillOpacity ?? 0.3}
                            />
                        )
                    })}
                    {children}
                </RechartsRadarChart>
            </ResponsiveContainer>
        </Box>
    )
})

RadarChart.classes = classes
;(RadarChart as any).varsResolver = varsResolver
RadarChart.displayName = '@xiaoye-react/ui/RadarChart'

export namespace RadarChart {
    export type Props = RadarChartProps
    export type Factory = RadarChartFactory
    export type StylesNames = RadarChartStylesNames
    export type CssVariables = RadarChartCssVariables
}
