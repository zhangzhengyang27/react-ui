import type { BarChartFactory } from '@react-ui/charts';
import type { StylesApiData } from '../types';

export const BarChartStylesApi: StylesApiData<BarChartFactory> = {
  selectors: {
    root: '根元素',
    bar: '图表柱状',
    axis: '图表的 X 轴和 Y 轴',
    container: 'Recharts ResponsiveContainer 组件',
    grid: 'Recharts CartesianGrid 组件',
    legend: 'Legend root 元素',
    legendItem: '图例项，表示数据系列',
    legendItemColor: '图例项颜色',
    legendItemName: '图例项名称',
    tooltip: 'Tooltip root 元素',
    tooltipBody: '包裹所有提示项的容器',
    tooltipItem: '提示项，表示数据系列',
    tooltipItemBody: '提示项颜色与名称的包装器',
    tooltipItemColor: '提示项颜色',
    tooltipItemName: '提示项名称',
    tooltipItemData: '提示项数据',
    tooltipLabel: '提示框标签',
    referenceLine: '参考线',
    axisLabel: 'X 轴和 Y 轴标签',
  },

  vars: {
    root: {
      '--chart-grid-color': '控制 the grid and cursor lines 的 color',
      '--chart-text-color': '控制 the axis labels 的 color',
      '--chart-cursor-fill': '控制 the cursor line 的 fill color',
      '--chart-bar-label-color': '控制 the bar labels 的 color',
    },
  },

  modifiers: [],
};
