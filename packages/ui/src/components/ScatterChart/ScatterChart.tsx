import React from 'react'
import {
    ScatterChart as RechartsScatterChart,
    Scatter,
    XAxis,
    YAxis,
    ZAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
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
import classes from './ScatterChart.module.css'

export type ScatterChartStylesNames = 'root'

export type ScatterChartCssVariables = {
    root: '--scatter-chart-height'
}

export interface ScatterChartProps extends BoxProps, StylesApiProps<ScatterChartFactory> {
    /** Data array for the chart */
    data: any[]

    /** Key used for X axis values */
    xAxisKey: string

    /** Key used for Y axis values */
    yAxisKey: string

    /** Key used for Z axis (bubble size) values */
    zAxisKey?: string

    /** Fill color for scatter points, theme color key or CSS value @default 'blue' */
    color?: string

    /** If true, CartesianGrid is displayed @default true */
    withGrid?: boolean

    /** If true, XAxis is displayed @default true */
    withXAxis?: boolean

    /** If true, YAxis is displayed @default true */
    withYAxis?: boolean

    /** If true, Tooltip is displayed @default true */
    withTooltip?: boolean

    /** Fixed chart height @default 300 */
    height?: number

    /** Custom tooltip value formatter */
    tooltipFormatter?: (value: any, name: any, props: any) => any

    /** Additional Recharts children */
    children?: React.ReactNode
}

export type ScatterChartFactory = Factory<{
    props: ScatterChartProps
    ref: HTMLDivElement
    stylesNames: ScatterChartStylesNames
    vars: ScatterChartCssVariables
}>

const defaultProps = {
    color: 'blue',
    withGrid: true,
    withXAxis: true,
    withYAxis: true,
    withTooltip: true,
    height: 300
} satisfies Partial<ScatterChartProps>

const varsResolver = createVarsResolver<ScatterChartFactory>((_, { height }) => ({
    root: {
        '--scatter-chart-height': rem(height)
    }
}))

export const ScatterChart = factory<ScatterChartFactory>((_props, ref) => {
    const props = useProps('ScatterChart', defaultProps, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        data,
        xAxisKey,
        yAxisKey,
        zAxisKey,
        color,
        withGrid,
        withXAxis,
        withYAxis,
        withTooltip,
        height,
        tooltipFormatter,
        children,
        mod,
        ...others
    } = props

    const getStyles = useStyles<ScatterChartFactory>({
        name: 'ScatterChart',
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

    const mappedData = data.map((item, index) => ({
        x: item[xAxisKey],
        y: item[yAxisKey],
        z: zAxisKey ? item[zAxisKey] : 1,
        payload: item,
        index
    }))

    return (
        <Box ref={ref} {...getStyles('root')} mod={mod} {...others}>
            <ResponsiveContainer width="100%" height="100%">
                <RechartsScatterChart margin={{ top: 8, right: 8, bottom: 8, left: 0 }}>
                    {withGrid && (
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="var(--ui-color-default-border)"
                        />
                    )}
                    {withXAxis && <XAxis type="number" dataKey="x" stroke="var(--ui-color-dimmed)" />}
                    {withYAxis && <YAxis type="number" dataKey="y" stroke="var(--ui-color-dimmed)" />}
                    {zAxisKey && <ZAxis type="number" dataKey="z" range={[50, 400]} />}
                    {withTooltip && (
                        <Tooltip
                            cursor={{ strokeDasharray: '3 3' }}
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
                    <Scatter data={mappedData} fill={resolveChartColor(color, 0)}>
                        {mappedData.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={resolveChartColor(color, index)} />
                        ))}
                    </Scatter>
                    {children}
                </RechartsScatterChart>
            </ResponsiveContainer>
        </Box>
    )
})

ScatterChart.classes = classes
;(ScatterChart as any).varsResolver = varsResolver
ScatterChart.displayName = '@xiaoye-react/ui/ScatterChart'

export namespace ScatterChart {
    export type Props = ScatterChartProps
    export type Factory = ScatterChartFactory
    export type StylesNames = ScatterChartStylesNames
    export type CssVariables = ScatterChartCssVariables
}
