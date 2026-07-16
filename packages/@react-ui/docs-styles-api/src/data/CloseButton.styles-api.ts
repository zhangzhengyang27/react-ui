import type { CloseButtonFactory } from '@react-ui/ui';
import type { StylesApiData } from '../types';

export const CloseButtonStylesApi: StylesApiData<CloseButtonFactory> = {
  selectors: {
    root: '根元素',
  },

  vars: {
    root: {
      '--cb-icon-size': 'Controls `width` of the `X` icon',
      '--cb-radius': 'Controls `border-radius` of the button',
      '--cb-size': 'Controls `width` and `height` of the button',
    },
  },
};
