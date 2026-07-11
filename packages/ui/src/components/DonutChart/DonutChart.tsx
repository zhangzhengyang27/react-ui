import React from 'react'
import { PieChart as RechartsPieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
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
import classes from './DonutChart.module.css'

export type DonutChartStylesNames = 'root'

export type DonutChartCssVariables = {
    root: '--donut-chart-height'
}

export interface DonutChartProps extends BoxProps, StylesApiProps<DonutChartFactory> {
    /** Data array for the chart */
    data: any[]

    /** Key used for slice names */
    nameKey: string

    /** Key used for slice values */
    valueKey: string

    /** Custom colors for slices. Defaults to theme palette */
    colors?: string[]

    /** Inner radius for the donut hole @default '60%' */
    innerRadius?: number | string

    /** Outer radius @default '80%' */
    outerRadius?: number | string

    /** Padding angle between slices @default 2 */
    paddingAngle?: number

    /** If true, Tooltip is displayed @default true */
    withTooltip?: boolean

    /** If true, Legend is displayed @default false */
    withLegend?: boolean

    /** Fixed chart height @default 300 */
    height?: number

    /** Custom tooltip value formatter */
    tooltipFormatter?: (value: any, name: any, props: any) => any

    /** Custom slice label formatter */
    labelFormatter?: (entry: any) => any

    /** Additional Recharts children */
    children?: React.ReactNode
}

export type DonutChartFactory = Factory<{
    props: DonutChartProps
    ref: HTMLDivElement
    stylesNames: DonutChartStylesNames
    vars: DonutChartCssVariables
}>

const defaultProps = {
    innerRadius: '60%',
    outerRadius: '80%',
    paddingAngle: 2,
    withTooltip: true,
    withLegend: false,
    height: 300
} satisfies Partial<DonutChartProps>

const varsResolver = createVarsResolver<DonutChartFactory>((_, { height }) => ({
    root: {
        '--donut-chart-height': rem(height)
    }
}))

export const DonutChart = factory<DonutChartFactory>((_props, ref) => {
    const props = useProps('DonutChart', defaultProps, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        data,
        nameKey,
        valueKey,
        colors,
        innerRadius,
        outerRadius,
        paddingAngle,
        withTooltip,
        withLegend,
        height,
        tooltipFormatter,
        labelFormatter,
        children,
        mod,
        ...others
    } = props

    const getStyles = useStyles<DonutChartFactory>({
        name: 'DonutChart',
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

    const sliceColors = colors ?? []

    return (
        <Box ref={ref} {...getStyles('root')} mod={mod} {...others}>
            <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                    <Pie
                        data={data}
                        dataKey={valueKey}
                        nameKey={nameKey}
                        innerRadius={innerRadius}
                        outerRadius={outerRadius}
                        paddingAngle={paddingAngle}
                        label={labelFormatter ? labelFormatter : true}
                    >
                        {data.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={resolveChartColor(sliceColors[index], index)} />
                        ))}
                    </Pie>
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
                    {children}
                </RechartsPieChart>
            </ResponsiveContainer>
        </Box>
    )
})

DonutChart.classes = classes
;(DonutChart as any).varsResolver = varsResolver
DonutChart.displayName = '@react-ui/ui/DonutChart'

export namespace DonutChart {
    export type Props = DonutChartProps
    export type Factory = DonutChartFactory
    export type StylesNames = DonutChartStylesNames
    export type CssVariables = DonutChartCssVariables
}
