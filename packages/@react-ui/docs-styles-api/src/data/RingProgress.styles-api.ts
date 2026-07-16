import type { RingProgressFactory } from '@react-ui/ui';
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
      '--rp-label-offset': 'Controls horizontal spacing between label and ring edges',
      '--rp-size': '控制 the entire 组件 的 width and height',
      '--rp-transition-duration': 'Controls animation duration for value and color changes',
    },
    svg: {
      '--rp-start-angle': '控制 the progress ring in degrees 的 the starting angle',
    },
  },
};
