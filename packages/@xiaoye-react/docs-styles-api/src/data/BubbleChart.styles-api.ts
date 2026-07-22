import type { BubbleChartFactory } from '@xiaoye-react/charts';
import type { StylesApiData } from '../types';

export const BubbleChartStylesApi: StylesApiData<BubbleChartFactory> = {
  selectors: {
    root: '根元素',
    axis: '图表的 X 轴和 Y 轴',
    tooltip: 'Tooltip root 元素',
  },

  vars: {
    root: {
      '--chart-grid-color': '控制 the grid and cursor lines 的 color',
      '--chart-text-color': '控制 the axis labels 的 color',
    },
  },

  modifiers: [],
};
