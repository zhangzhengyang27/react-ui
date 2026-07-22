import type { HeatmapFactory } from '@xiaoye-react/charts';
import type { StylesApiData } from '../types';

export const HeatmapStylesApi: StylesApiData<HeatmapFactory> = {
  selectors: {
    root: '根元素',
    weekdayLabel: 'Weekday text 元素',
    monthLabel: 'Month text 元素',
    rect: '表示日期的矩形',
    legend: 'Legend group 元素',
    legendLabel: 'Legend text label (Less/More)',
    legendRect: '图例颜色矩形',
  },

  vars: {},
  modifiers: [],
};
