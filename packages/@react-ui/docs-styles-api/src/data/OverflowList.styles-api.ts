import type { OverflowListFactory } from '@react-ui/ui';
import type { StylesApiData } from '../types';

export const OverflowListStylesApi: StylesApiData<OverflowListFactory> = {
  selectors: {
    root: '根元素',
  },

  vars: {
    root: {
      '--ol-gap': '控制项之间的间距',
    },
  },

  modifiers: [],
};
