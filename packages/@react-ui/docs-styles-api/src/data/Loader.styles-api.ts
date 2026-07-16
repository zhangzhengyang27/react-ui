import type { LoaderFactory } from '@react-ui/ui';
import type { StylesApiData } from '../types';

export const LoaderStylesApi: StylesApiData<LoaderFactory> = {
  selectors: {
    root: '根元素',
  },

  vars: {
    root: {
      '--loader-size':
        'Controls loader size (usually `width` and `height`, in some cases only `width`)',
      '--loader-color': '控制加载器颜色',
    },
  },
};
