import type { RingProgressFactory } from '@xiaoye-react/ui';
import type { StylesApiData } from '../types';

export const RingProgressStylesApi: StylesApiData<RingProgressFactory> = {
  selectors: {
    root: 'Root container 元素',
    svg: 'SVG element containing all ring sections',
    curve: 'Individual ring section (circle element)',
    label: 'Label displayed in the center of the ring',
  },

  vars: {
    root: {
      '--rp-size': '控制 the entire 组件 的 width and height',
    },
  },
};
