import type { BackgroundImageFactory } from '@react-ui/ui';
import type { StylesApiData } from '../types';

export const BackgroundImageStylesApi: StylesApiData<BackgroundImageFactory> = {
  selectors: {
    root: '根元素',
  },

  vars: {
    root: {
      '--bi-radius': '控制 `border-radius`',
    },
  },
};
