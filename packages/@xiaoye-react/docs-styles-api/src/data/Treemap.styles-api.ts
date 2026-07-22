import type { TreemapFactory } from '@xiaoye-react/charts';
import type { StylesApiData } from '../types';

export const TreemapStylesApi: StylesApiData<TreemapFactory> = {
  selectors: {
    root: '根元素',
    tooltip: 'Tooltip root 元素',
    tooltipBody: '包裹所有提示项的容器',
    tooltipItem: '提示项，表示数据系列',
    tooltipItemBody: '提示项颜色与名称的包装器',
    tooltipItemColor: '提示项颜色',
    tooltipItemName: '提示项名称',
    tooltipItemData: '提示项数据',
    tooltipLabel: '提示框标签',
  },

  vars: {
    root: {
      '--chart-stroke-color': '控制 the chart stroke 的 color',
      '--chart-height': '控制 the chart 的 height',
    },
  },

  modifiers: [],
};
