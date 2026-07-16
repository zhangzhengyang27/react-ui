import type { ImageFactory } from '@react-ui/ui';
import type { StylesApiData } from '../types';

export const ImageStylesApi: StylesApiData<ImageFactory> = {
  selectors: {
    root: '根元素',
  },

  vars: {
    root: {
      '--image-object-fit': 'Controls `object-fit` property',
      '--image-radius': 'Controls `border-radius` property',
    },
  },

  modifiers: [{ modifier: 'data-fallback', selector: 'root', condition: 'Image failed to load' }],
};
