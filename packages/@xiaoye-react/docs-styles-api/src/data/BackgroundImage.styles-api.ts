import type { BackgroundImageFactory } from '@xiaoye-react/ui';
import type { StylesApiData } from '../types';

export const BackgroundImageStylesApi: StylesApiData<BackgroundImageFactory> = {
  selectors: {
    root: '根元素',
  },

  vars: {
    root: {
      '--background-image-radius': '控制 `border-radius`',
    },
  },
};
