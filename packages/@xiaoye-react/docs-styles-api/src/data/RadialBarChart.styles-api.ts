import type { RadialBarChartFactory } from '@xiaoye-react/charts';
import type { StylesApiData } from '../types';

export const RadialBarChartStylesApi: StylesApiData<RadialBarChartFactory> = {
  selectors: {
    root: '根元素',
    tooltip: 'Tooltip root 元素',
    legend: 'Legend root 元素',
    legendItem: '图例项，表示数据系列',
    legendItemColor: '图例项颜色',
    legendItemName: '图例项名称',
  },

  vars: {
    root: {
      '--chart-empty-background': '图表中空白区域的背景颜色',
    },
  },

  modifiers: [],
};
