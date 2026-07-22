import type { RadarChartFactory } from '@xiaoye-react/charts';
import type { StylesApiData } from '../types';

export const RadarChartStylesApi: StylesApiData<RadarChartFactory> = {
  selectors: {
    root: '根元素',
    container: 'Recharts ResponsiveContainer 组件',
    tooltip: 'Tooltip root 元素',
    tooltipBody: '包裹所有提示项的容器',
    tooltipItem: '提示项，表示数据系列',
    tooltipItemBody: '提示项颜色与名称的包装器',
    tooltipItemColor: '提示项颜色',
    tooltipItemName: '提示项名称',
    tooltipItemData: '提示项数据',
    tooltipLabel: '提示框标签',
    legend: 'Legend root 元素',
    legendItem: '图例项，表示数据系列',
    legendItemColor: '图例项颜色',
    legendItemName: '图例项名称',
  },

  vars: {
    root: {
      '--chart-grid-color': '控制 the chart grid 的 color',
      '--chart-text-color': '控制 all text elements in the chart 的 color',
    },
  },

  modifiers: [],
};
