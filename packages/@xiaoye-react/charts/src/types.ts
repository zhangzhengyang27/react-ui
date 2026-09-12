import type { BoxProps } from '@xiaoye-react/ui'
import type { ChartSeries } from './ChartLegend/ChartLegend'

export type { ChartSeries }

export type ChartCurveType = 'monotone' | 'linear' | 'natural' | 'step' | 'stepAfter' | 'stepBefore'

/** Area/Line/Bar 共享的直角坐标系图表属性 */
export interface CartesianChartProps extends BoxProps {
    /** 数据源，对象数组；`dataKey` 指定 x 轴字段，`series[].name` 指定 y 轴字段 */
    data: Record<string, any>[]
    /** x 轴（分类）字段名 */
    dataKey: string
    /** 渲染的系列（y 轴字段 + 颜色） */
    series: ChartSeries[]
    /** 图表高度，默认 280 */
    h?: BoxProps['h']
    /** 线条/面积曲线类型，默认 'monotone'（平滑） */
    curveType?: ChartCurveType
    /** 是否在线段端点绘制圆点，默认 false */
    withDots?: boolean
    /** 是否显示图例，默认 false */
    withLegend?: boolean
    /** 是否显示 x 轴，默认 true */
    withXAxis?: boolean
    /** 是否显示 y 轴，默认 true */
    withYAxis?: boolean
    /** 数值后缀（tooltip 展示），如 '%'、'次' */
    unit?: string
    /** 数值格式化（tooltip 展示） */
    formatter?: (value: number | string) => string
}
