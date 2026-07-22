import React from 'react'
import {
    AreaChart as RechartsAreaChart,
    Area,
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
import classes from './AreaChart.module.css'

export type AreaChartStylesNames = 'root'

export type AreaChartCssVariables = {
    root: '--area-chart-height'
}

export interface AreaChartSeries {
    /** Data key for this series */
    name: string

    /** Stroke/fill color, theme color key or CSS value */
    color?: string

    /** Fill opacity @default 0.3 */
    fillOpacity?: number
}

export interface AreaChartProps extends BoxProps, StylesApiProps<AreaChartFactory> {
    /** Data array for the chart */
    data: any[]

    /** Key used for the X axis values */
    dataKey: string

    /** Series configuration */
    series: AreaChartSeries[]

    /** Curve type for the areas @default 'monotone' */
    curveType?: 'monotone' | 'linear' | 'step' | 'natural'

    /** If true, gradients are applied @default true */
    withGradient?: boolean

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

export type AreaChartFactory = Factory<{
    props: AreaChartProps
    ref: HTMLDivElement
    stylesNames: AreaChartStylesNames
    vars: AreaChartCssVariables
}>

const defaultProps = {
    curveType: 'monotone',
    withGradient: true,
    withGrid: true,
    withXAxis: true,
    withYAxis: true,
    withTooltip: true,
    withLegend: false,
    height: 300
} satisfies Partial<AreaChartProps>

const varsResolver = createVarsResolver<AreaChartFactory>((_, { height }) => ({
    root: {
        '--area-chart-height': rem(height)
    }
}))

export const AreaChart = factory<AreaChartFactory>((_props, ref) => {
    const props = useProps('AreaChart', defaultProps, _props)
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
        withGradient,
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

    const getStyles = useStyles<AreaChartFactory>({
        name: 'AreaChart',
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
                <RechartsAreaChart data={data} margin={{ top: 8, right: 8, bottom: 8, left: 0 }}>
                    <defs>
                        {series.map((item, index) => {
                            const color = resolveChartColor(item.color, index)
                            return (
                                <linearGradient key={item.name} id={`area-gradient-${item.name}`} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={color} stopOpacity={withGradient ? 0.8 : 1} />
                                    <stop offset="95%" stopColor={color} stopOpacity={withGradient ? 0 : 1} />
                                </linearGradient>
                            )
                        })}
                    </defs>
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
                    {series.map((item, index) => {
                        const color = resolveChartColor(item.color, index)
                        return (
                            <Area
                                key={item.name}
                                type={curveType}
                                dataKey={item.name}
                                stroke={color}
                                strokeWidth={2}
                                fill={withGradient ? `url(#area-gradient-${item.name})` : color}
                                fillOpacity={item.fillOpacity ?? (withGradient ? 1 : 0.3)}
                            />
                        )
                    })}
                    {children}
                </RechartsAreaChart>
            </ResponsiveContainer>
        </Box>
    )
})

AreaChart.classes = classes
;(AreaChart as any).varsResolver = varsResolver
AreaChart.displayName = '@xiaoye-react/ui/AreaChart'

export namespace AreaChart {
    export type Props = AreaChartProps
    export type Factory = AreaChartFactory
    export type StylesNames = AreaChartStylesNames
    export type CssVariables = AreaChartCssVariables
}
