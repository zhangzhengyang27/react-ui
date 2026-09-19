import type { MarkFactory } from '@xiaoye-react/ui';
import type { StylesApiData } from '../types';

export const MarkStylesApi: StylesApiData<MarkFactory> = {
  selectors: {
    root: '根元素',
  },

  vars: {
    root: {
      '--mark-bg': '控制 `background-color`',
      '--mark-color': '控制 `color`',
    },
  },
};
