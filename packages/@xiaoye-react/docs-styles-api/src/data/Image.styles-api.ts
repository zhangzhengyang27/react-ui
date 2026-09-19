import type { ImageFactory } from '@xiaoye-react/ui';
import type { StylesApiData } from '../types';

export const ImageStylesApi: StylesApiData<ImageFactory> = {
  selectors: {
    root: '根元素',
    image: '`img` 元素',
    fallback: '图片加载失败时显示的占位元素',
  },

  vars: {
    root: {
      '--image-radius': 'Controls `border-radius` property',
      '--image-width': 'Controls `width` property',
      '--image-height': 'Controls `height` property',
      '--image-fit': 'Controls `object-fit` property',
    },
  },

  modifiers: [{ modifier: 'data-fit', selector: 'root', value: '`fit` 属性的值' }],
};
