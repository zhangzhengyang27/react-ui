import type { MarkFactory } from '@react-ui/ui';
import type { StylesApiData } from '../types';

export const MarkStylesApi: StylesApiData<MarkFactory> = {
  selectors: {
    root: '根元素',
  },

  vars: {
    root: {
      '--mark-bg-dark': '控制深色模式下的 `background-color`',
      '--mark-bg-light': 'Controls `background-color` for light color scheme',
    },
  },
};
