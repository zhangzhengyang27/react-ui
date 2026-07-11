import type { BackgroundImageFactory } from '@react-ui/ui';
import type { StylesApiData } from '../types';

export const BackgroundImageStylesApi: StylesApiData<BackgroundImageFactory> = {
  selectors: {
    root: 'Root element',
  },

  vars: {
    root: {
      '--bi-radius': 'Controls `border-radius`',
    },
  },
};
