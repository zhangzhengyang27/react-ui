import type { SkeletonFactory } from '@react-ui/ui';
import type { StylesApiData } from '../types';

export const SkeletonStylesApi: StylesApiData<SkeletonFactory> = {
  selectors: {
    root: '根元素',
  },

  vars: {
    root: {
      '--skeleton-height': '控制 skeleton `height`',
      '--skeleton-width': '控制 skeleton `width`',
      '--skeleton-radius': '控制 skeleton `border-radius`',
    },
  },

  modifiers: [
    { modifier: 'data-visible', selector: 'root', condition: '设置了 `visible` 属性' },
    { modifier: 'data-animate', selector: 'root', condition: '设置了 `animate` 属性' },
  ],
};
