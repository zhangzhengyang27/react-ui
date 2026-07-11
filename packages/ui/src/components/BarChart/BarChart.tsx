import React from 'react'
import {
    BarChart as RechartsBarChart,
    Bar,
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
import classes from './BarChart.module.css'

export type BarChartStylesNames = 'root'

export type BarChartCssVariables = {
    root: '--bar-chart-height'
}

export interface BarChartSeries {
    /** Data key for this series */
    name: string

    /** Fill color, theme color key or CSS value */
    color?: string
}

export interface BarChartProps extends BoxProps, StylesApiProps<BarChartFactory> {
    /** Data array for the chart */
    data: any[]

    /** Key used for the X axis values */
    dataKey: string

    /** Series configuration */
    series: BarChartSeries[]

    /** Orientation of the bars @default 'vertical' */
    orientation?: 'vertical' | 'horizontal'

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

export type BarChartFactory = Factory<{
    props: BarChartProps
    ref: HTMLDivElement
    stylesNames: BarChartStylesNames
    vars: BarChartCssVariables
}>

const defaultProps = {
    orientation: 'vertical',
    withGrid: true,
    withXAxis: true,
    withYAxis: true,
    withTooltip: true,
    withLegend: false,
    height: 300
} satisfies Partial<BarChartProps>

const varsResolver = createVarsResolver<BarChartFactory>((_, { height }) => ({
    root: {
        '--bar-chart-height': rem(height)
    }
}))

export const BarChart = factory<BarChartFactory>((_props, ref) => {
    const props = useProps('BarChart', defaultProps, _props)
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
        orientation,
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

    const getStyles = useStyles<BarChartFactory>({
        name: 'BarChart',
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

    const layout = orientation === 'horizontal' ? 'vertical' : 'horizontal'
    const xAxisType = orientation === 'horizontal' ? 'number' : 'category'
    const yAxisType = orientation === 'horizontal' ? 'category' : 'number'

    return (
        <Box ref={ref} {...getStyles('root')} mod={mod} {...others}>
            <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart
                    data={data}
                    layout={layout}
                    margin={{ top: 8, right: 8, bottom: 8, left: 0 }}
                >
                    {withGrid && (
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="var(--ui-color-default-border)"
                        />
                    )}
                    {withXAxis && (
                        <XAxis
                            dataKey={orientation === 'vertical' ? dataKey : undefined}
                            type={xAxisType}
                            stroke="var(--ui-color-dimmed)"
                        />
                    )}
                    {withYAxis && (
                        <YAxis
                            dataKey={orientation === 'horizontal' ? dataKey : undefined}
                            type={yAxisType}
                            stroke="var(--ui-color-dimmed)"
                        />
                    )}
                    {withTooltip && (
                        <Tooltip
                            contentStyle={{
                                background: 'var(--ui-color-body)',
                                border: '1px solid var(--ui-color-default-border)',
                                borderRadius: 'var(--ui-radius-default)'
                            }}
                            itemStyle={{ color: 'var(--ui-color-text)' }}
                            labelStyle={{ color: 'var(--ui-color-text)' }}
                            cursor={{ fill: 'var(--ui-color-default-hover)' }}
                        />
                    )}
                    {withLegend && <Legend wrapperStyle={{ color: 'var(--ui-color-text)' }} />}
                    {series.map((item, index) => (
                        <Bar
                            key={item.name}
                            dataKey={item.name}
                            fill={resolveChartColor(item.color, index)}
                            radius={[4, 4, 0, 0]}
                        />
                    ))}
                    {children}
                </RechartsBarChart>
            </ResponsiveContainer>
        </Box>
    )
})

BarChart.classes = classes
;(BarChart as any).varsResolver = varsResolver
BarChart.displayName = '@react-ui/ui/BarChart'

export namespace BarChart {
    export type Props = BarChartProps
    export type Factory = BarChartFactory
    export type StylesNames = BarChartStylesNames
    export type CssVariables = BarChartCssVariables
}
