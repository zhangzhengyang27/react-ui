import type { BarsListFactory } from '@xiaoye-react/charts';
import type { StylesApiData } from '../types';

export const BarsListStylesApi: StylesApiData<BarsListFactory> = {
  selectors: {
    root: '根元素',
    labelsRow: '标签行的容器',
    bar: 'Bar container 元素',
    barLabel: '内部带名称的柱状标签元素',
    barValue: 'Bar value 元素',
  },

  vars: {
    root: {
      '--bars-list-gap': '控制柱状之间的间距',
      '--bars-list-min-bar-size': '控制最小柱状宽度',
      '--bars-list-bar-height': '控制柱状高度',
    },
  },
  modifiers: [],
};
