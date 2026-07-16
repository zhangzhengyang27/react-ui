import type { SparklineFactory } from '@react-ui/charts';
import type { StylesApiData } from '../types';

export const SparklineStylesApi: StylesApiData<SparklineFactory> = {
  selectors: {
    root: '根元素',
  },

  vars: {
    root: {
      '--chart-color': '控制描边和填充颜色',
    },
  },

  modifiers: [],
};
