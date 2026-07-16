import type { AspectRatioFactory } from '@react-ui/ui';
import type { StylesApiData } from '../types';

export const AspectRatioStylesApi: StylesApiData<AspectRatioFactory> = {
  selectors: {
    root: '根元素',
  },

  vars: {
    root: {
      '--ar-ratio': '纵横比',
    },
  },
};
