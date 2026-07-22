import type { LoadingOverlayFactory } from '@xiaoye-react/ui';
import type { StylesApiData } from '../types';

export const LoadingOverlayStylesApi: StylesApiData<LoadingOverlayFactory> = {
  selectors: {
    root: '根元素',
    overlay: '`Overlay` 组件',
    loader: '`Loader` 组件',
  },

  vars: {
    root: {
      '--lo-z-index': 'Controls `z-index` of the overlay and loader',
    },
  },
};
