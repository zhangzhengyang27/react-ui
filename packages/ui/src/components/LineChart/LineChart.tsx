import React from 'react'
import {
    LineChart as RechartsLineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
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
import classes from './LineChart.module.css'

export type LineChartStylesNames = 'root'

export type LineChartCssVariables = {
    root: '--line-chart-height'
}

export interface LineChartSeries {
    /** Data key for this series */
    name: string

    /** Stroke color, theme color key or CSS value */
    color?: string
}

export interface LineChartProps extends BoxProps, StylesApiProps<LineChartFactory> {
    /** Data array for the chart */
    data: any[]

    /** Key used for the X axis values */
    dataKey: string

    /** Series configuration */
    series: LineChartSeries[]

    /** Curve type for the lines @default 'monotone' */
    curveType?: 'monotone' | 'linear' | 'step' | 'natural'

    /** If true, CartesianGrid is displayed @default true */
    withGrid?: boolean

    /** If true, XAxis is displayed @default true */
    withXAxis?: boolean

    /** If true, YAxis is displayed @default true */
    withYAxis?: boolean

    /** If true, Tooltip is displayed @default true */
    withTooltip?: boolean

    /** If true, Legend is displayed @default false */
    withLegend?: boolean

    /** Fixed chart height @default 300 */
    height?: number

    /** Additional Recharts children */
    children?: React.ReactNode
}

export type LineChartFactory = Factory<{
    props: LineChartProps
    ref: HTMLDivElement
    stylesNames: LineChartStylesNames
    vars: LineChartCssVariables
}>

const defaultProps = {
    curveType: 'monotone',
    withGrid: true,
    withXAxis: true,
    withYAxis: true,
    withTooltip: true,
    withLegend: false,
    height: 300
} satisfies Partial<LineChartProps>

const varsResolver = createVarsResolver<LineChartFactory>((_, { height }) => ({
    root: {
        '--line-chart-height': rem(height)
    }
}))

export const LineChart = factory<LineChartFactory>((_props, ref) => {
    const props = useProps('LineChart', defaultProps, _props)
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
        curveType,
        withGrid,
        withXAxis,
        withYAxis,
        withTooltip,
        withLegend,
        height,
        children,
        mod,
        ...others
    } = props

    const getStyles = useStyles<LineChartFactory>({
        name: 'LineChart',
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
                <RechartsLineChart data={data} margin={{ top: 8, right: 8, bottom: 8, left: 0 }}>
                    {withGrid && (
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="var(--ui-color-default-border)"
                        />
                    )}
                    {withXAxis && <XAxis dataKey={dataKey} stroke="var(--ui-color-dimmed)" />}
                    {withYAxis && <YAxis stroke="var(--ui-color-dimmed)" />}
                    {withTooltip && (
                        <Tooltip
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
                    {series.map((item, index) => (
                        <Line
                            key={item.name}
                            type={curveType}
                            dataKey={item.name}
                            stroke={resolveChartColor(item.color, index)}
                            strokeWidth={2}
                            dot={{ r: 3, strokeWidth: 2, fill: 'var(--ui-color-body)' }}
                            activeDot={{ r: 5 }}
                        />
                    ))}
                    {children}
                </RechartsLineChart>
            </ResponsiveContainer>
        </Box>
    )
})

LineChart.classes = classes
;(LineChart as any).varsResolver = varsResolver
LineChart.displayName = '@xiaoye-react/ui/LineChart'

export namespace LineChart {
    export type Props = LineChartProps
    export type Factory = LineChartFactory
    export type StylesNames = LineChartStylesNames
    export type CssVariables = LineChartCssVariables
}
