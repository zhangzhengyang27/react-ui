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
import classes from './PieChart.module.css'

export type PieChartStylesNames = 'root'

export type PieChartCssVariables = {
    root: '--pie-chart-height'
}

export interface PieChartProps extends BoxProps, StylesApiProps<PieChartFactory> {
    /** Data array for the chart */
    data: any[]

    /** Key used for slice names */
    nameKey: string

    /** Key used for slice values */
    valueKey: string

    /** Custom colors for slices. Defaults to theme palette */
    colors?: string[]

    /** Inner radius for donut chart @default 0 */
    innerRadius?: number | string

    /** Outer radius @default '80%' */
    outerRadius?: number | string

    /** Padding angle between slices @default 0 */
    paddingAngle?: number

    /** If true, Tooltip is displayed @default true */
    withTooltip?: boolean

    /** If true, Legend is displayed @default false */
    withLegend?: boolean

    /** Fixed chart height @default 300 */
    height?: number

    /** Additional Recharts children */
    children?: React.ReactNode
}

export type PieChartFactory = Factory<{
    props: PieChartProps
    ref: HTMLDivElement
    stylesNames: PieChartStylesNames
    vars: PieChartCssVariables
}>

const defaultProps = {
    innerRadius: 0,
    outerRadius: '80%',
    paddingAngle: 0,
    withTooltip: true,
    withLegend: false,
    height: 300
} satisfies Partial<PieChartProps>

const varsResolver = createVarsResolver<PieChartFactory>((_, { height }) => ({
    root: {
        '--pie-chart-height': rem(height)
    }
}))

export const PieChart = factory<PieChartFactory>((_props, ref) => {
    const props = useProps('PieChart', defaultProps, _props)
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
        children,
        mod,
        ...others
    } = props

    const getStyles = useStyles<PieChartFactory>({
        name: 'PieChart',
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
                        label
                    >
                        {data.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={resolveChartColor(sliceColors[index], index)} />
                        ))}
                    </Pie>
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
                    {children}
                </RechartsPieChart>
            </ResponsiveContainer>
        </Box>
    )
})

PieChart.classes = classes
;(PieChart as any).varsResolver = varsResolver
PieChart.displayName = '@xiaoye-react/ui/PieChart'

export namespace PieChart {
    export type Props = PieChartProps
    export type Factory = PieChartFactory
    export type StylesNames = PieChartStylesNames
    export type CssVariables = PieChartCssVariables
}
